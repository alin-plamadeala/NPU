import {Inject, Injectable} from "@nestjs/common";
import {NPU_DB, NpuDb} from "@npu/npu-db";
import {npuCreations, npuToProducts, products} from "@npu/db-schema";
import {SearchNpusQueryParams, ListNpusResponse} from "@npu/discovery-service-openapi";
import {and, asc, desc, gte, isNotNull, isNull, sql} from "drizzle-orm";

@Injectable()
export class NpuSearchService {
  constructor(@Inject(NPU_DB) private readonly db: NpuDb) {
  }

  DEFAULT_LIMIT = 10;

  async searchNpus(query: SearchNpusQueryParams): Promise<ListNpusResponse> {
    let conditions = [isNull(npuCreations.deletedAt)];

    const searchQuery = query?.q ?
      sql`plainto_tsquery('english', ${query.q})` : null;

    if (searchQuery) {
      conditions.push(
        sql`to_tsvector('english', ${npuCreations.title} || ' ' || ${npuCreations.description}) @@ ${searchQuery}`
      );
    }

    if (query?.productId) {
      conditions.push(sql`EXISTS (
        SELECT 1 FROM ${npuToProducts} ntp
        WHERE ntp.npu_id = ${npuCreations.id}
        AND ntp.product_id = ${query.productId}
      )`);
    }

    if (query?.productName) {
      const productSearchQuery = sql`plainto_tsquery('english', ${query.productName})`;
      conditions.push(sql`EXISTS (
        SELECT 1 FROM ${npuToProducts} ntp
        JOIN ${products} p ON p.product_id = ntp.product_id
        WHERE ntp.npu_id = ${npuCreations.id}
        AND to_tsvector('english', p.name) @@ ${productSearchQuery}
      )`);
    }

    if (query?.ratingGte) {
      conditions.push(gte(npuCreations.avgRating, query.ratingGte.toString()));
    }

    if (query?.sort === 'highest-rated' || query?.sort === 'lowest-rated') {
      conditions.push(isNotNull(npuCreations.avgRating));
    }

    const whereClause = and(...conditions);

    let orderBy;
    switch (query?.sort) {
      case 'newest':
        orderBy = [desc(npuCreations.createdAt)];
        break;
      case 'oldest':
        orderBy = [asc(npuCreations.createdAt)];
        break;
      case 'highest-rated':
        orderBy = [desc(npuCreations.avgRating)];
        break;
      case 'lowest-rated':
        orderBy = [asc(npuCreations.avgRating)];
        break;
      case 'query-relevance':
        orderBy = searchQuery ? [
          desc(sql`ts_rank_cd(to_tsvector('english', ${npuCreations.title} || ' ' || ${npuCreations.description}), ${searchQuery})`)
        ] : [desc(npuCreations.createdAt)];
        break;
      default:
        orderBy = [desc(npuCreations.createdAt)];
    }

    const limit = query?.limit || this.DEFAULT_LIMIT;
    const offset = query?.offset || 0;

    const countResult = await this.db
      .select({count: sql<number>`count(*)`})
      .from(npuCreations)
      .where(whereClause)
      .execute();

    const totalItems = countResult[0]?.count || 0;

    const npuResults = await this.db.query.npuCreations.findMany({
      where: whereClause,
      orderBy,
      limit,
      offset,
      with: {
        npuImages: true,
        npuProducts: {
          with: {
            product: true
          }
        }
      }
    });

    return {
      data: npuResults.map(npu => ({
        id: npu.id,
        title: npu.title,
        description: npu.description,
        images: npu.npuImages.map((image) => ({
          url: image.imageUrl,
          isMain: image.isMain,
        })),
        products: npu.npuProducts.map((npuToProduct) => npuToProduct.product.productId),
        userId: npu.userId,
        createdAt: npu.createdAt.toISOString(),
        updatedAt: npu.updatedAt.toISOString(),
      })),
      pagination: {
        total: Number(totalItems),
        limit,
        offset,
      }
    };
  }
}
