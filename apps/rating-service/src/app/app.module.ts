import {Module} from '@nestjs/common';
import {RatingsModule} from './ratings/ratings.module';
import {NpuDbModule} from "@npu/npu-db";
import {ScheduleModule} from "@nestjs/schedule";

@Module({
  imports: [RatingsModule, NpuDbModule, ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
