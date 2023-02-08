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

## FAQ

- Typescript cannot find the library?
  That's because this uses the [`"export"` field in the `package.json`](https://www.typescriptlang.org/docs/handbook/esm-node.html#packagejson-exports-imports-and-self-referencing). Go to your `tsconfig.json`, or create one if there is none, and set
```json
{
    "compilerOptions": {
        /* This tells Typescript that we're working with the new importing mechanisms */
        "module": "nodenext", 
    }
}
```
Make sure to read [the documentation](https://www.typescriptlang.org/docs/handbook/esm-node.html) for what that means, among other things all the imports in your code might need a file extension.
