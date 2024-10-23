import type { HttpMethod } from "@/types/http-method";
import type {
  SwaggerContent,
  SwaggerPath,
  SwaggerRequestBody,
  SwaggerResponse,
  SwaggerParameters,
} from "@/types/swagger";
import type { ResponseFormData } from "@/components/AddResponseDialog.vue";

class SwaggerDocument {
  paths: SwaggerPath[] = [];

  constructor(public document: any) {
    this.paths = this.getPaths();
  }

  /**
   * Parse the swagger paths into a [SwaggerPath] array.
   *
   * @returns A list of [SwaggerPath].
   */
  private getPaths() {
    if (!this.document) {
      return [];
    }

    const items: SwaggerPath[] = [];
    Object.entries<any>(this.document.paths).forEach(([path, methods]) => {
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

        const parameters: SwaggerParameters[] =
          pathData.parameters?.map((parameter: any): SwaggerParameters => {
            return {
              name: parameter.name,
              in: parameter.in,
              description: parameter.description,
              required: parameter.required,
              schema: parameter["$ref"] ? parameter["$ref"] : parameter.schema,
            };
          }) || [];

        const responses: SwaggerResponse[] = pathData.responses
          ? Object.entries<any>(pathData.responses).map(
              ([code, responseData]) => {
                const content: SwaggerContent[] = [];
                if (responseData["$ref"]) {
                  content.push({
                    contentType: undefined,
                    schema: responseData,
                  });
                } else if (responseData.content) {
                  Object.entries<any>(responseData.content).forEach(
                    ([contentType, value]) => {
                      content.push({
                        contentType,
                        schema: value.schema,
                      });
                    }
                  );
                }

                return {
                  code,
                  description: responseData.description,
                  content,
                };
              }
            )
          : [];

        items.push({
          path,
          method: method as HttpMethod,
          summary: pathData.summary,
          description: pathData.description,
          operationId: pathData.operationId,
          tags: pathData.tags,
          requestBody,
          parameters,
          responses,
        });
      });
    });
    return items;
  }

  getTags() {
    const tags = [{ name: "", description: "" }];
    if (!this.document?.tags) {
      return tags;
    }

    this.document.tags.forEach((tag: any) => {
      tags.push({
        name: tag.name,
        description: tag.description,
      });
    });

    return tags;
  }

  getMethodForPath(path: string, method: HttpMethod) {
    return this.paths.find((p) => p.path === path && p.method === method);
  }

  addResponse(path: string, method: HttpMethod, data: ResponseFormData) {
    const foundPath = Object.keys(this.document.paths).findIndex(
      (p) => p === path
    );

    if (foundPath === -1) {
      alert("Not found");
      return;
    }

    this.document.paths[path][method].responses[data.code] = {
      code: data.code,
      description: data.description,
      content: {
        [data.contentType]: data.schema,
      },
    };
  }
}

export default SwaggerDocument;
