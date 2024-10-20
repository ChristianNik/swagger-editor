import type { HttpMethod } from "@/types/http-method";
import exampleSwagger from "../assets/example-swagger.json";
import type {
  SwaggerPath,
  SwaggerRequestBody,
  SwaggerResponse,
} from "@/types/swagger";

class SwaggerDocument {
  document = exampleSwagger;

  paths = this.getPaths();

  /**
   * Parse the swagger paths into a [SwaggerPath] array.
   * 
   * @returns A list of [SwaggerPath].
   */
  private getPaths() {
    const items: SwaggerPath[] = [];
    Object.entries(this.document.paths).forEach(([path, methods]) => {
      Object.entries<any>(methods).forEach(([method, pathData]) => {
        const requestBody: SwaggerRequestBody | undefined = pathData.requestBody
          ? {
              description: pathData.requestBody.description,
              required: pathData.requestBody.required,
              content: Object.entries<any>(pathData.requestBody.content).map(
                ([contentType, { schema }]) => {
                  return {
                    contentType,
                    schema,
                  };
                }
              ),
            }
          : undefined;

        const responses: SwaggerResponse[] = Object.entries<any>(
          pathData.responses
        ).map(([code, responseData]) => {
          return {
            code,
            description: responseData.description,
            content: responseData.content
              ? Object.entries<any>(responseData.content).map(
                  ([contentType, { schema }]) => {
                    return {
                      contentType,
                      schema,
                    };
                  }
                )
              : undefined,
          };
        });

        items.push({
          path,
          method: method as HttpMethod,
          summary: pathData.summary,
          description: pathData.description,
          operationId: pathData.operationId,
          tags: pathData.tags,
          requestBody,
          responses,
        });
      });
    });
    return items;
  }

  getTags() {
    return this.document.tags.map((tag) => {
      return {
        name: tag.name,
        description: tag.description,
      };
    });
  }

  getMethodForPath(path: string, method: HttpMethod) {
    return this.paths.find((p) => p.path === path && p.method === method);
  }
}

export default SwaggerDocument;
