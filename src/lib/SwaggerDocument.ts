import exampleSwagger from "../assets/example-swagger.json";

const addObjectKeyToObject = (array: object) =>
  Object.entries(array).map(([method, data]) => ({
    method,
    ...data,
  }));

class SwaggerDocument {
  document = exampleSwagger;

  getTags() {
    return this.document.tags;
  }

  getPaths() {
    return Object.entries(this.document.paths).map(
      ([path, availableMethods]) => {
        return {
          path,
          methods: addObjectKeyToObject(availableMethods),
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
}

export default SwaggerDocument;
