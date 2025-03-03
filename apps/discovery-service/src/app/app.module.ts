import {Module} from '@nestjs/common';
import {NpuSearchModule} from "./npu-search/npu-search.module";
import {NpuDbModule} from "@npu/npu-db";

@Module({
  imports: [NpuSearchModule, NpuDbModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
