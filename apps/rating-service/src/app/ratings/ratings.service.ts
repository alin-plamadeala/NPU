import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {NPU_DB, NpuDb} from "@npu/npu-db";
import {ratings} from "@npu/db-schema";

import {
  CreateRatingRequestBody,
  UpdateRatingRequestBody,
  RatingResponse,
  ListRatingsResponse, ListRatingsQueryParams
} from '@npu/rating-service-openapi';
import {and, eq, gte, isNull, lte} from "drizzle-orm";

@Injectable()
export class RatingsService {
  constructor(@Inject(NPU_DB) private readonly db: NpuDb) {
  }

  DEFAULT_LIMIT = 10;

  async createRating(dto: CreateRatingRequestBody, userId: string): Promise<RatingResponse> {
    const res = await this.db.transaction(async (trx) => {
      const rating = await trx.insert(ratings).values({
        npuId: dto.npuId,
        userId: userId,
        score: dto.score,
        comment: dto.comment,
      }).returning({
        id: ratings.id,
      });

      const ratingId = rating[0].id;

      return {ratingId};
    });

    return (await this.getRatingById(res.ratingId))!;
  }

  async updateRating(id: number, dto: UpdateRatingRequestBody): Promise<RatingResponse | null> {
    await this.db.transaction(async (trx) => {
      await trx.update(ratings).set({
        score: dto.score,
        comment: dto.comment,
        updatedAt: new Date(),
      }).where(and(eq(ratings.id, id), isNull(ratings.deletedAt)));
    });

    return this.getRatingById(id);
  }

  async getRatingById(id: number): Promise<RatingResponse | null> {
    const rating = await this.db.query.ratings.findFirst({
      where: and(eq(ratings.id, id), isNull(ratings.deletedAt)),
    });

    if (!rating) {
      throw new NotFoundException('Rating not found');
    }

    return {
      id: rating.id,
      npuId: rating.npuId,
      score: rating.score,
      comment: rating.comment ?? undefined,
      userId: rating.userId,
      createdAt: rating.createdAt.toISOString(),
      updatedAt: rating.updatedAt.toISOString(),
    };
  }

  async listRatings(query: ListRatingsQueryParams): Promise<ListRatingsResponse> {
    const limit = query?.limit ?? this.DEFAULT_LIMIT;
    const offset = query?.offset ?? 0;
    const filters = [isNull(ratings.deletedAt)]
    if (query?.npuId) {
      filters.push(eq(ratings.npuId, query.npuId));
    }
    if (query?.userId) {
      filters.push(eq(ratings.userId, query.userId));
    }

    if (query?.scoreGte) {
      filters.push(gte(ratings.score, query.scoreGte));
    }

    if (query?.scoreLte) {
      filters.push(lte(ratings.score, query.scoreLte));
    }

    if (query?.createdAtGte) {
      filters.push(gte(ratings.createdAt, new Date(query.createdAtGte)));
    }

    if (query?.createdAtLte) {
      filters.push(gte(ratings.createdAt, new Date(query.createdAtLte)));
    }


    const res = await this.db.query.ratings.findMany({
      where: and(...filters),
      limit,
      offset,
    });

    return {
      pagination: {
        limit,
        offset,
        total: res.length,
      },
      data: res.map(rating => ({
        id: rating.id,
        npuId: rating.npuId,
        score: rating.score,
        comment: rating.comment ?? undefined,
        userId: rating.userId,
        createdAt: rating.createdAt.toISOString(),
        updatedAt: rating.updatedAt.toISOString(),
      }))
    }
  }

  async deleteRating(id: number) {
    await this.db.update(ratings).set({
      deletedAt: new Date(),
    }).where(and(eq(ratings.id, id)))

    return {message: "Rating deleted successfully"};
  }
}
