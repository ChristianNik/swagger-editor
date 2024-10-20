import type { HttpMethod } from "./http-method";

export type SwaggerContent =
  | {
      contentType?: string;
      schema: {
        $ref: "#/components/schemas/Pet";
      };
    }
  | {
      contentType?: string;
      schema: {
        description: string;
      };
    };

export type SwaggerRequestBody = {
  description: string;
  required: boolean;
  content: SwaggerContent[];
};

export type SwaggerResponse = {
  code: string;
  description: string;
  content: SwaggerContent[];
};

export type SwaggerPath = {
  path: string;
  method: HttpMethod;
  summary: string;
  description: string;
  operationId: string;
  tags: string[];
  requestBody?: SwaggerRequestBody;
  responses: SwaggerResponse[];
};
