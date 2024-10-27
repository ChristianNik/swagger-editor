export const availableMethods = <const>["get", "post", "put", "delete"];

export type MethodType = (typeof availableMethods)[number];

export const getMethodTailwindClass = (method: MethodType) => {
  switch (method.toLowerCase()) {
    case "get":
      return "text-blue-500";

    case "post":
      return "text-green-500";

    case "put":
      return "text-yellow-500";

    case "delete":
      return "text-red-500";

    default:
      return "text-black";
  }
};
