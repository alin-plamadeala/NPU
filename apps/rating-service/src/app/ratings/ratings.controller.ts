import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {RatingsService} from "./ratings.service";
import {CreateRatingRequestBody, ListRatingsQueryParams, UpdateRatingRequestBody} from "@npu/rating-service-openapi";

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingService: RatingsService) {
  }

  @Post()
  async createRating(@Body() dto: CreateRatingRequestBody) {
    // TODO: Validate the request body
    // TODO: call auth-service to get userId from JWT token and to authorize the request
    const userId = "d66d4b2e-5264-49bd-9304-8795e7fcc4ea";

    return this.ratingService.createRating(dto, userId);
  }

  @Get(":id")
  async getRatingById(@Param("id") id: number) {
    return this.ratingService.getRatingById(id);
  }

  @Get()
  async listRatings(@Query() query: ListRatingsQueryParams) {
    return this.ratingService.listRatings(query);
  }

  @Put(":id")
  async updateRating(@Param("id") id: number, @Body() dto: UpdateRatingRequestBody) {
    // TODO: Validate the request body
    // TODO: call auth-service to get userId from JWT token and to authorize the request
    const userId = "d66d4b2e-5264-49bd-9304-8795e7fcc4ea";

    return this.ratingService.updateRating(id, dto);
  }

  @Delete(":id")
  async deleteRating(@Param("id") id: number) {
    // TODO: call auth-service to get userId from JWT token and to authorize the request
    const userId = "d66d4b2e-5264-49bd-9304-8795e7fcc4ea";

    return await this.ratingService.deleteRating(id);
  }
}
