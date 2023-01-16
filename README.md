# json-safe-stringify

Example

```ts
const serializer = new JsonSerializer();
const text = serializer.stringify({ map: new Map([["a", 1]]) });
console.log(text);
const obj = serializer.parse(text, (error) => console.error(error));
```

Or use it directly

```ts
const text = JSON.stringify(
  { map: new Map([["a", 1]]) },
  jsonStringifyReplacer
);
console.log(text);
const obj = JSON.parse(text, (key, value) =>
  jsonParseReviver(key, value, (error) => console.error(error))
);
```
