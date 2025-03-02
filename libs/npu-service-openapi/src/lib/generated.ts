/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/npus": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Create a new NPU */
        post: operations["createNpu"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/npus/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get an NPU by ID */
        get: operations["getNpuById"];
        /** Update an existing NPU */
        put: operations["updateNpu"];
        post?: never;
        /** Delete an NPU by ID */
        delete: operations["deleteNpu"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        CreateNpuRequest: {
            /** @description Title of the NPU */
            title: string;
            /** @description Detailed description of the NPU */
            description: string;
            /** @description List of product IDs associated with the NPU */
            products: string[];
            /** @description List of images for the NPU (one can be main) */
            images: components["schemas"]["NpuImage"][];
        };
        UpdateNpuRequest: {
            /** @description Updated title of the NPU */
            title?: string;
            /** @description Updated description of the NPU */
            description?: string;
            /** @description List of product IDs associated with the NPU */
            products?: string[];
            /** @description Updated list of images */
            images?: components["schemas"]["NpuImage"][];
        };
        NpuResponse: {
            /**
             * Format: uuid
             * @description Unique identifier of the NPU
             */
            id: string;
            /**
             * Format: uuid
             * @description ID of the user who created the NPU
             */
            userId: string;
            /** @description Title of the NPU */
            title: string;
            /** @description Detailed description of the NPU */
            description: string;
            /** @description List of product IDs associated with the NPU */
            products: string[];
            images: components["schemas"]["NpuImage"][];
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        NpuImage: {
            /** Format: uri */
            url: string;
            isMain: boolean;
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
    createNpu: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateNpuRequest"];
            };
        };
        responses: {
            /** @description Successfully created an NPU */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["NpuResponse"];
                };
            };
        };
    };
    getNpuById: {
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
            /** @description Returns the NPU details */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["NpuResponse"];
                };
            };
            /** @description NPU not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    updateNpu: {
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
                "application/json": components["schemas"]["UpdateNpuRequest"];
            };
        };
        responses: {
            /** @description Successfully updated NPU */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["NpuResponse"];
                };
            };
            /** @description NPU not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    deleteNpu: {
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
            /** @description NPU deleted successfully */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description NPU not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
