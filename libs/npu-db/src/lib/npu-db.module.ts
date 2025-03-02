import {Module, Global} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {drizzle} from "drizzle-orm/node-postgres";
import {Pool} from "pg";
import * as schema from "@npu/db-schema";

const createDrizzleInstance = async (configService: ConfigService) => {
  const pool = new Pool({
    connectionString: configService.get<string>("DATABASE_URL"),
  });

  return drizzle(pool, {schema});
};

export type NpuDb = Awaited<ReturnType<typeof createDrizzleInstance>>;

export const NPU_DB = "NPU_DRIZZLE_DB";

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: NPU_DB,
      useFactory: async (configService: ConfigService) => await createDrizzleInstance(configService),
      inject: [ConfigService],
    },
  ],
  exports: [NPU_DB],
})
export class NpuDbModule {
}
