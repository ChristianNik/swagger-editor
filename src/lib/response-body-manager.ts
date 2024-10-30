export type RequestBodyContent = { type: string };

export type RequestBody = {
  description: string;
  required: boolean;
  content: RequestBodyContent[];
};

export class RequestBodyManager {
  constructor(
    public requestBody: RequestBody = {
      description: "",
      required: false,
      content: [],
    }
  ) {}

  findContentIndexByType(type: string) {
    return this.requestBody.content.findIndex((p) => p.type === type);
  }

  exists(type: string) {
    return this.findContentIndexByType(type) !== -1;
  }

  findByType(type: string) {
    return this.requestBody.content.find((p) => p.type === type);
  }

  addContent(type: string) {
    this.requestBody.content.push({
      type,
    });
  }

  updateContent(name: string, data: Partial<RequestBodyContent>) {
    const doesExists = this.exists(name);
    if (!doesExists) {
      // Maybe throw an Exception
      return;
    }

    const foundIndex = this.findContentIndexByType(name);
    if (foundIndex === -1) {
      // Maybe throw an Exception
      return;
    }

    const previousData = this.requestBody.content[foundIndex];
    this.requestBody.content[foundIndex] = { ...previousData, ...data };
  }

  removeContentByType(type: string) {
    this.requestBody.content = this.requestBody.content.filter(
      (p) => p.type !== type
    );
  }
}
