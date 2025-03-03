import {Module} from '@nestjs/common';
import {NpuModule} from "./npu/npu.module";
import {NpuDbModule} from "@npu/npu-db";

@Module({
  imports: [NpuModule, NpuDbModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
