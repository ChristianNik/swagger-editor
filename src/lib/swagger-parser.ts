import type { OpenAPIV3_1 as OpenAPI } from "openapi-types";

import yaml from "js-yaml";
import type { HttpMethod } from "@/types/http-method";
import type { Parameter } from "./parameter-manager";

export class SwaggerParser {
  swagger: Partial<OpenAPI.Document> = {
    paths: {}
  };

  addPath(
    path: string,
    method: HttpMethod | string,
    description: string,
    parameters: Parameter[],
    responses: {
        [code: number | string]: any;
    }
  ) {
    const swaggerPath = {
      [path]: {
        [method]: {
          parameters: parameters,
          description: description,
          responses,
        },
      },
    };

    this.swagger.paths = {
        ...this.swagger.paths,
        ...swaggerPath
    }
  }

  /** 
   * Convert responses array to object with code as the key
   * 
   * @param object 
   * 
   * @returns An object in the swagger response structure.
   */
  responsesFromArray(
    object: { code: number | string; [key: string]: any }[]
  ) {
    const responses = object.reduce<{
      [code: number | string]: any;
    }>((acc, response) => {
      acc[response.code] = {
        description: response.description,
      };

      return acc;
    }, {});

    return responses
  }

  toYaml() {
    const parsed = yaml.dump(this.swagger);
    return parsed;
  }
}
