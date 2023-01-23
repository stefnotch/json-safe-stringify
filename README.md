# json-safe-stringify

Fixes the issues with https://stackoverflow.com/a/56150320/3492994 and other answers on that page.

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
