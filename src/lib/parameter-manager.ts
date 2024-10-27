import type { Parameter } from "@/components/ParametersTable.vue";

export class ParameterManager {
  parameters: Parameter[] = [];

  findIndexByName(name: string) {
    return this.parameters.findIndex((p) => p.name === name);
  }

  exists(name: string) {
    return this.findIndexByName(name) !== -1;
  }

  add(name: string, type: "path" | "query", description?: string) {
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
