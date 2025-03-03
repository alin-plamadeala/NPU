import { Module } from '@nestjs/common';
import { NpuSearchService } from './npu-search.service';
import { NpuSearchController } from './npu-search.controller';

@Module({
  providers: [NpuSearchService],
  controllers: [NpuSearchController],
})
export class NpuSearchModule {}
