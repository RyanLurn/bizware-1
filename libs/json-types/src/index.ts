export type JsonPrimitive = string | number | boolean | null;
export type JsonObject = { [K in string]: JsonValue };
export type JsonArray = JsonValue[] | readonly JsonValue[];
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export type JsonifiableObject =
  | { [K in string]?: JsonifiableValue }
  | { toJSON: () => JsonifiableValue };
export type JsonifiableArray = readonly JsonifiableValue[];
export type JsonifiableValue =
  | JsonPrimitive
  | JsonifiableObject
  | JsonifiableArray;

export type TanStackRouterJsonifiableObject = {
  [K in string]: TanStackRouterJsonifiableValue;
};
export type TanStackRouterJsonifiableArray = TanStackRouterJsonifiableValue[];
export type TanStackRouterJsonifiableValue =
  | JsonPrimitive
  | undefined
  | Date
  | Error
  | FormData
  | TanStackRouterJsonifiableObject
  | TanStackRouterJsonifiableArray;
