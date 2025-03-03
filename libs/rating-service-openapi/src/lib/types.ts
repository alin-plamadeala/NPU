import {components, operations} from "./generated";

export type CreateRatingRequestBody = components['schemas']['CreateRatingRequest'];
export type UpdateRatingRequestBody = components['schemas']['UpdateRatingRequest'];


export type RatingResponse = components['schemas']['RatingResponse'];

export type ListRatingsQueryParams = operations['listRatings']['parameters']['query'];
export type ListRatingsResponse = components['schemas']['ListRatingsResponse'];
