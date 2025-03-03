import { Module } from '@nestjs/common';
import { NpuService } from './npu.service';
import { NpuController } from './npu.controller';

@Module({
  providers: [NpuService],
  controllers: [NpuController],
})
export class NpuModule {}
