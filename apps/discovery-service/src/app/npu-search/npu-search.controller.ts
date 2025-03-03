import {Body, Controller, Get, Query} from "@nestjs/common";
import {NpuSearchService} from "./npu-search.service";
import {SearchNpusQueryParams} from "@npu/discovery-service-openapi";

@Controller("npu-search")
export class NpuSearchController {
  constructor(private readonly npuSearchService: NpuSearchService) {
  }

  @Get()
  async searchNpus(@Query() query: SearchNpusQueryParams) {
    // TODO: Validate the query params
    // TODO: call auth-service to get userId from JWT token and to authorize the request
    const userId = "d66d4b2e-5264-49bd-9304-8795e7fcc4ea";

    return this.npuSearchService.searchNpus(query);
  }

}
