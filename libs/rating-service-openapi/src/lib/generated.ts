/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/ratings": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Submit a rating for an NPU */
        post: operations["createRating"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/ratings/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a rating by ID */
        get: operations["getRatingById"];
        put?: never;
        post?: never;
        /** Delete a rating by ID */
        delete: operations["deleteRating"];
        options?: never;
        head?: never;
        /** Update an existing rating */
        patch: operations["updateRating"];
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        CreateRatingRequest: {
            /**
             * Format: uuid
             * @description ID of the NPU being rated
             */
            npuId: string;
            /** @description Score given to the NPU (1-10 scale) */
            score: number;
            /** @description Free-text feedback from the user */
            comment: string;
        };
        UpdateRatingRequest: {
            /** @description Updated score (1-10 scale) */
            score?: number;
            /** @description Updated free-text feedback */
            comment?: string;
        };
        RatingResponse: {
            /**
             * Format: uuid
             * @description Unique identifier of the rating
             */
            id: string;
            /**
             * Format: uuid
             * @description ID of the NPU being rated
             */
            npuId: string;
            /**
             * Format: uuid
             * @description ID of the user who submitted the rating
             */
            userId: string;
            /** @description Score given to the NPU */
            score: number;
            /** @description Free-text feedback */
            comment: string;
            /**
             * Format: date-time
             * @description Timestamp of when the rating was submitted
             */
            createdAt: string;
            /**
             * Format: date-time
             * @description Timestamp of when the rating was last updated
             */
            updatedAt: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    createRating: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateRatingRequest"];
            };
        };
        responses: {
            /** @description Successfully created a rating */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RatingResponse"];
                };
            };
        };
    };
    getRatingById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Returns the rating details */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RatingResponse"];
                };
            };
            /** @description Rating not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    deleteRating: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Rating deleted successfully */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Rating not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    updateRating: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateRatingRequest"];
            };
        };
        responses: {
            /** @description Successfully updated the rating */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RatingResponse"];
                };
            };
            /** @description Rating not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
