export type Response = {
  code: number;
  description: string;
};

export class ResponseManager {
  constructor(public responses: Response[] = []) {}

  findIndexByCode(code: number) {
    return this.responses.findIndex((p) => p.code === code);
  }

  exists(code: number) {
    return this.findIndexByCode(code) !== -1;
  }

  findByCode(code: number) {
    return this.responses.find((p) => p.code === code);
  }

  add(code: number, description: string) {
    const doesExists = this.exists(code);
    if (doesExists) {
      // Maybe throw an Exception
      return;
    }

    this.responses.push({
      code,
      description,
    });
  }

  update(code: number, data: Partial<Response>) {
    const doesExists = this.exists(code);
    if (!doesExists) {
      // Maybe throw an Exception
      return;
    }

    const foundIndex = this.findIndexByCode(code);
    if (foundIndex === -1) {
      // Maybe throw an Exception
      return;
    }

    const responseData = this.responses[foundIndex];
    this.responses[foundIndex] = { ...responseData, ...data };
  }

  removeByCode(code: number) {
    this.responses = this.responses.filter((p) => p.code !== code);
  }
}
