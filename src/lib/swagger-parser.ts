import type { OpenAPIV3_1 as OpenAPI } from "openapi-types";

import yaml from "js-yaml";
import type { HttpMethod } from "@/types/http-method";
import type { Parameter } from "./parameter-manager";

export class SwaggerParser {
  swagger: Partial<OpenAPI.Document> = {
    paths: {},
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
      ...swaggerPath,
    };
  }

  /**
   * Convert an array to an object.
   *
   * @param object
   *
   * @returns An object in the swagger response structure.
   */
  arrayToObject<T>(object: T[], key: keyof T, fn: (data: T) => object) {
    const contents = object.reduce<{ [key: string]: any }>((acc, item) => {
      acc[item[key] as any] = fn(item);
      return acc;
    }, {});

    return contents;
  }

  toYaml() {
    const parsed = yaml.dump(this.swagger);
    return parsed;
  }
}
