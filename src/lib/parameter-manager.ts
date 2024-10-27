import type { ParameterType } from "@/lib/available-parameters";

export type Parameter = {
  name: string;
  in: ParameterType;
  description?: string;
};

export class ParameterManager {
  constructor(public parameters: Parameter[] = []) {}

  findIndexByName(name: string) {
    return this.parameters.findIndex((p) => p.name === name);
  }

  exists(name: string) {
    return this.findIndexByName(name) !== -1;
  }

  findByName(name: string) {
    return this.parameters.find((p) => p.name === name);
  }

  add(name: string, type: ParameterType, description?: string) {
    const doesExists = this.exists(name);
    if (doesExists) {
      // Maybe throw an Exception
      return;
    }

    this.parameters.push({
      name,
      in: type,
      description,
    });
  }

  update(name: string, data: Partial<Parameter>) {
    const doesExists = this.exists(name);
    if (!doesExists) {
      // Maybe throw an Exception
      return;
    }

    const foundIndex = this.findIndexByName(name);
    if (foundIndex === -1) {
      // Maybe throw an Exception
      return;
    }

    const parameterData = this.parameters[foundIndex];
    this.parameters[foundIndex] = { ...parameterData, ...data };
  }

  removeByName(name: string) {
    this.parameters = this.parameters.filter((p) => p.name !== name);
  }
}
