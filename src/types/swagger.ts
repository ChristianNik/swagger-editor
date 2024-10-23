import type { HttpMethod } from "./http-method";

export type SwaggerSchema =
  | {
      $ref: string;
    }
  | {
      type: "string" | "number";
      description: string;
      format?: string
    };

export type SwaggerContent = {
  contentType?: string;
  schema: SwaggerSchema;
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

export type SwaggerParameters = {
  name: string;
  in: "path" | "query";
  description: string;
  required: boolean;
  schema: SwaggerSchema;
};

export type SwaggerPath = {
  path: string;
  method: HttpMethod;
  summary: string;
  description: string;
  operationId: string;
  tags: string[];
  requestBody?: SwaggerRequestBody;
  parameters: SwaggerParameters[];
  responses: SwaggerResponse[];
};
