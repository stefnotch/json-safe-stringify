export function jsonStringifyReplacer(key: string, value: any) {
  // see: https://stackoverflow.com/a/73155667/3492994
  if (typeof value === "object" && value !== null) {
    if (value instanceof Map) {
      return {
        _meta: { type: "map" },
        value: Array.from(value.entries()),
      };
    } else if (value instanceof Set) {
      return {
        _meta: { type: "set" },
        value: Array.from(value.values()),
      };
    } else if ("_meta" in value) {
      // escape "_meta" properties
      return {
        ...value,
        _meta: {
          type: "escaped-meta",
          value: value["_meta"],
        },
      };
    }
  }
  return value;
}

export function jsonParseReviver(
  key: string,
  value: any,
  errorCallback?: (error: Error) => void
) {
  if (typeof value === "object" && value !== null) {
    if ("_meta" in value) {
      if (value._meta.type === "map") {
        return new Map(value.value);
      } else if (value._meta.type === "set") {
        return new Set(value.value);
      } else if (value._meta.type === "escaped-meta") {
        return {
          ...value,
          _meta: value._meta.value,
        };
      } else {
        errorCallback?.(
          new Error("Unexpected meta type: " + value._meta, {
            cause: value._meta,
          })
        );
      }
    }
  }
  return value;
}

export class JsonSerializer {
  stringifyReplacer = jsonStringifyReplacer;
  parseReviver = jsonParseReviver;
  constructor() {}

  stringify<T = any>(value: T): string {
    return JSON.stringify(value, (key, value) =>
      this.stringifyReplacer(key, value)
    );
  }

  parse<T = any>(text: string, errorCallback?: (error: Error) => void): T {
    return JSON.parse(text, (key, value) =>
      this.parseReviver(key, value, errorCallback)
    );
  }
}
