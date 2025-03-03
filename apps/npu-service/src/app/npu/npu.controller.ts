import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from "@nestjs/common";
import {NpuService} from "./npu.service";
import {CreateNpuRequestBody, UpdateNpuRequestBody} from "@npu/npu-service-openapi";

@Controller("npus")
export class NpuController {
  constructor(private readonly npuService: NpuService) {
  }

  @Post()
  async createNpu(@Body() dto: CreateNpuRequestBody) {
    // TODO: Validate the request body
    // TODO: call auth-service to get userId from JWT token and to authorize the request
    const userId = "d66d4b2e-5264-49bd-9304-8795e7fcc4ea";

    return this.npuService.createNpu(dto, userId);
  }

  @Put(":id")
  async updateNpu(@Body() dto: UpdateNpuRequestBody, @Param("id") id: string) {
    // TODO: Validate the request body
    // TODO: call auth-service to get userId from JWT token and to authorize the request
    const userId = "d66d4b2e-5264-49bd-9304-8795e7fcc4ea";

    const npu = await this.npuService.updateNpu(id, dto);

    if (npu === null) {
      throw new NotFoundException("NPU not found");
    }

    return npu;
  }

  @Get(":id")
  async getNpuById(@Param("id") id: string) {
    const npu = await this.npuService.getNpuById(id);

    if (npu === null) {
      throw new NotFoundException("NPU not found");
    }

    return npu;
  }

  @Delete(":id")
  async deleteNpu(@Param("id") id: string) {
    // TODO: call auth-service to get userId from JWT token and to authorize the request
    const userId = "d66d4b2e-5264-49bd-9304-8795e7fcc4ea";

    return this.npuService.deleteNpu(id);
  }
}
