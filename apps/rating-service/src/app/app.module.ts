import {Module} from '@nestjs/common';
import {RatingsModule} from './ratings/ratings.module';
import {RatingsService} from './ratings/ratings.service';
import {RatingsController} from './ratings/ratings.controller';
import {NpuDbModule} from "@npu/npu-db";

@Module({
  imports: [RatingsModule, NpuDbModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
