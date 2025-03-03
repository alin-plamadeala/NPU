import {Inject, Injectable} from "@nestjs/common";
import {npuCreations, npuImages, npuToProducts} from "@npu/db-schema";
import {and, eq, isNull} from "drizzle-orm";
import {NPU_DB, NpuDb} from "@npu/npu-db";
import {CreateNpuRequestBody, NpuResponse, UpdateNpuRequestBody} from "@npu/npu-service-openapi";

@Injectable()
export class NpuService {
    constructor(@Inject(NPU_DB) private readonly db: NpuDb) {
    }

    async createNpu(dto: CreateNpuRequestBody, userId: string): Promise<NpuResponse> {
        const res = await this.db.transaction(async (trx) => {
            const npu = await trx.insert(npuCreations).values({
                userId: userId,
                title: dto.title,
                description: dto.description,
            }).returning({
                id: npuCreations.id,
            });

            const npuId = npu[0].id;

            if (dto.images && dto.images.length > 0) {
                await trx.insert(npuImages).values(
                    dto.images.map((image) => ({
                        npuId: npuId,
                        imageUrl: image.url,
                        isMain: image.isMain,
                    })),
                );
            }

            if (dto.products && dto.products.length > 0) {
                await trx.insert(npuToProducts).values(
                    dto.products.map((productId) => ({
                        npuId: npuId,
                        productId: productId,
                    })),
                );
            }


            return {npuId}
        });


        return (await this.getNpuById(res.npuId))!;
    }

    async updateNpu(id: string, dto: UpdateNpuRequestBody): Promise<NpuResponse | null> {
        await this.db.transaction(async (trx) => {
            await trx.update(npuCreations).set({
                title: dto.title,
                description: dto.description,
                updatedAt: new Date(),
            }).where(and(eq(npuCreations.id, id), isNull(npuCreations.deletedAt)));

            if (dto.images) {
                await trx.delete(npuImages).where(eq(npuImages.npuId, id));

                if (dto.images.length > 0) {
                    await trx.insert(npuImages).values(
                        dto.images.map((image) => ({
                            npuId: id,
                            imageUrl: image.url,
                            isMain: image.isMain,
                        })),
                    );
                }
            }

            if (dto.products) {
                await trx.delete(npuToProducts).where(eq(npuToProducts.npuId, id));

                if (dto.products.length > 0) {
                    await trx.insert(npuToProducts).values(
                        dto.products.map((productId) => ({
                            npuId: id,
                            productId: productId,
                        })),
                    );
                }
            }
        });


        return this.getNpuById(id);
    }

    async getNpuById(id: string): Promise<NpuResponse | null> {
        const npu = await this.db.query.npuCreations.findFirst({
            where: and(eq(npuCreations.id, id), isNull(npuCreations.deletedAt)),
            with: {
                npuImages: true,
                npuProducts: {
                    with: {
                        product: true
                    }
                }
            }
        });

        if (!npu) {
            return null;
        }

        return {
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
        }
    }

    async deleteNpu(id: string) {
        await this.db.update(npuCreations).set({
            deletedAt: new Date(),
        }).where(and(eq(npuCreations.id, id), isNull(npuCreations.deletedAt)));

        return {message: "NPU deleted successfully"};
    }
}
