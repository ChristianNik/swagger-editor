export const availableParameterTypes = <const>["path", "query"];

export type ParameterType = typeof availableParameterTypes[number]
