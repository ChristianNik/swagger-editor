import type { HttpMethod } from "@/types/http-method";
import exampleSwagger from "../assets/example-swagger.json";

class SwaggerDocument {
  document = exampleSwagger;

  getTags() {
    return this.document.tags;
  }

  getPaths() {
    return Object.entries(this.document.paths).map(
      ([path, availableMethods]) => {
        path = path.trim()

        const methods = Object.entries(availableMethods).map(([method, data]) => ({
          path,
          method,
          ...data,
        }));

        return {
          path,
          methods
        };
      }
    );
  }

  getPathsForTag(tag: string) {
    const paths = this.getPaths();
    return paths.map((path) => ({
      ...path,
      methods: path.methods.filter((item) => item.tags.includes(tag)),
    }));
  }

  getMethodForPath(path: string, method: HttpMethod) {
    const foundItem = this.getPaths().find((p) => p.path === path);
    return foundItem?.methods.find((i) => i.method === method);
  }
}

export default SwaggerDocument;
