import type { HttpMethod } from "@/types/http-method";
import { reactive } from "vue";

export const store = reactive<{
  importedSwaggerDocument: any;
  selectedPath?: string;
  selectedMethod?: HttpMethod;
}>({
  importedSwaggerDocument: undefined,
  selectedPath: undefined,
  selectedMethod: undefined,
});
