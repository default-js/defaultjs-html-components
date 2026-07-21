# @default-js/defaultjs-html-components

> A small toolbox to build **asynchronous web components**.

Every component exposes a `ready` promise that resolves once its asynchronous
initialization has finished, so you can reliably wait for a component to be set
up before interacting with it. The library is built on top of
[`@default-js/defaultjs-extdom`](https://www.npmjs.com/package/@default-js/defaultjs-extdom),
which adds jQuery-like helpers (`attr`, `find`, `trigger`, `parent`, …) to DOM
nodes.

- ⚡ async lifecycle with a `ready` promise
- 🧩 works with autonomous custom elements **and** customized built-in elements
- 🎛️ optional Shadow DOM, auto-generated ids and post-construct hooks
- 📣 automatic attribute-change / change events
- 🧰 small utility belt (event names, DOM traversal, styles, per-node data)
- 📘 `.d.ts` TypeScript definitions included

---

## Installation

```bash
npm install @default-js/defaultjs-html-components
```

The package depends on `@default-js/defaultjs-extdom`,
`@default-js/defaultjs-common-utils` and
`@default-js/defaultjs-expression-language`; they are installed automatically.
Importing the package also imports `defaultjs-extdom` as a side effect, so the
extended node helpers are available everywhere.

---

## Quick start

Create a component by extending `Component`, expose a static `NODENAME` (the tag
name) and register it with `define`:

```js
import { Component, define } from "@default-js/defaultjs-html-components";

class HelloWorld extends Component {
  static get NODENAME() { return "d-hello"; }

  constructor() {
    super({
      shadowRoot: true,
      content: () => `<p>Hello, <slot></slot>!</p>`,
    });
  }
}

define(HelloWorld);
```

```html
<d-hello>World</d-hello>
```

> `NODENAME` **must** be defined on every concrete component — the base class
> throws a descriptive error if you forget it.

You can also register through the static helper on the class itself:

```js
HelloWorld.define(HelloWorld);
```

---

## The `ready` lifecycle

When a component is connected to the document its `init()` method runs. Once
`init()` completes, the `ready` promise resolves:

```js
const el = document.querySelector("d-hello");

await el.ready;          // resolves after init() has finished
el.ready.resolved;       // true once settled
```

Override `init()` to run asynchronous setup. It runs after the element is
connected, and `this.root` already points at the render root:

```js
class UserCard extends Component {
  static get NODENAME() { return "d-user-card"; }

  constructor() {
    super({ shadowRoot: true });
  }

  async init() {
    const id = this.attr("user-id");
    const user = await fetch(`/api/users/${id}`).then((r) => r.json());
    this.root.append(`<h2>${user.name}</h2>`);
  }
}

define(UserCard);
```

```js
const card = document.querySelector("d-user-card");
await card.ready;   // guaranteed the user data has been rendered
```

> **Note on errors:** if `init()` throws (or rejects with) an `Error`, the
> `ready` promise is **rejected** with it, and `ready.error` becomes `true`.
> Any other thrown value resolves `ready` with that value instead.
>
> ```js
> try {
>   await el.ready;
> } catch (error) {
>   // init() threw an Error
> }
> ```

When the element is removed from the DOM, `destroy()` runs and resets `ready`,
so re-inserting the element initializes it again.

---

## Constructor options

Pass an options object to `super(...)`:

| Option           | Type                                              | Default | Description                                                             |
| ---------------- | ------------------------------------------------- | ------- | ----------------------------------------------------------------------- |
| `shadowRoot`     | `boolean`                                         | `false` | Attach an open shadow root. `this.root` then points at the shadow root. |
| `content`        | `Node \| string \| (component) => Node \| string` | `null`  | Content appended to the root. Strings are parsed as HTML.               |
| `createUID`      | `boolean`                                         | `false` | Assign a unique `id` attribute during initialization.                   |
| `uidPrefix`      | `string`                                          | `"id-"` | Prefix for the generated id.                                            |
| `uidSuffix`      | `string`                                          | `""`    | Suffix for the generated id.                                            |
| `postConstructs` | `Array<(component) => void \| Promise>`           | `null`  | Extra functions run during `init()` (see below).                        |
| `postConstucts`  | `Array<(component) => void \| Promise>`           | `null`  | **Deprecated** misspelled alias of `postConstructs`.                    |

> ⚠️ `postConstucts` (missing the second `r`) is kept only for backwards
> compatibility and logs a deprecation warning. Use `postConstructs` in new
> code. If both are given, `postConstructs` wins.

### Content

```js
// string (parsed as HTML)
super({ content: `<button type="button">click</button>` });

// factory function receiving the component instance
super({ content: (self) => `<label for="${self.id}">${self.attr("label")}</label>` });

// or a real node
super({ content: document.createElement("hr") });
```

### Auto-generated ids

```js
class Field extends Component {
  static get NODENAME() { return "d-field"; }
  constructor() {
    super({ createUID: true, uidPrefix: "field-" });
  }
}
define(Field);
// -> <d-field id="field-…unique…">
```

### Post-construct hooks

`postConstructs` are executed in order as part of `init()` — a convenient way to
compose setup steps without overriding `init()`:

```js
super({
  postConstructs: [
    async (self) => { self.root.append(`<slot></slot>`); },
    async (self) => { await self.loadData(); },
  ],
});
```

The full list is available via the read-only `postConstructs` getter.

---

## Reacting to attribute changes

Declare the attributes you care about via `observedAttributes`. When one of them
changes, the component dispatches two events on itself:

- `<nodename>--attribute--<attribute>` — a specific attribute changed
- `<nodename>--change` — something on the component changed

```js
class Toggle extends Component {
  static get NODENAME() { return "d-toggle"; }
  static get observedAttributes() { return ["checked"]; }
}
define(Toggle);
```

```js
const toggle = document.querySelector("d-toggle");

toggle.addEventListener("d-toggle--attribute--checked", () => {
  console.log("checked changed to", toggle.attr("checked"));
});

toggle.addEventListener("d-toggle--change", () => {
  console.log("toggle changed");
});
```

Instead of hard-coding the event names, build them with the `EventHelper`:

```js
import { utils } from "@default-js/defaultjs-html-components";
const { componentEventname, attributeChangeEventname } = utils.EventHelper;

toggle.addEventListener(attributeChangeEventname("checked", toggle), handler);
toggle.addEventListener(componentEventname("change", toggle), handler);
```

> The separator (`--` by default) is configurable — see [Settings](#settings).

---

## Extending built-in elements

Use `componentBaseOf` to build a component on top of a specific HTML element
type (a *customized built-in element*):

```js
import { componentBaseOf, define } from "@default-js/defaultjs-html-components";

class FancyInput extends componentBaseOf(HTMLInputElement) {
  static get NODENAME() { return "d-fancy-input"; }

  async init() {
    this.classList.add("fancy");
  }
}

// customized built-in elements are registered with an `extends` option
define(FancyInput, { extends: "input" });
```

```html
<input is="d-fancy-input" type="text" />
```

The resulting class keeps all members of the base element (`value`, `checked`,
…) **and** adds the component members (`ready`, `init`, `root`, …).
Classes are cached per base type, so `componentBaseOf(HTMLInputElement)` always
returns the same class. The default `Component` export is simply
`componentBaseOf(HTMLElement)`.

---

## Utilities

All helpers are grouped under the `utils` export.

```js
import { utils } from "@default-js/defaultjs-html-components";
```

### `utils.EventHelper`

Build the event names used by the library.

```js
utils.EventHelper.componentEventname("change", "d-foo");
// -> "d-foo--change"

utils.EventHelper.attributeChangeEventname("disabled", "d-foo");
// -> "d-foo--attribute--disabled"
```

`node` may be a tag-name string, an `HTMLElement`, or any object with a string
`NODENAME`. An optional third `separator` argument overrides the default.

### `utils.NodeHelper`

Traverse the DOM relative to a node.

```js
// nearest ancestor matching a predicate
const form = utils.NodeHelper.findParent(input, (n) => n.nodeName === "FORM");

// shallowest matching descendant
const label = utils.NodeHelper.findClosestInDepth(root, (n) => n.nodeName === "LABEL");
```

### `utils.StyleHelper`

Copy styles between nodes or load a component stylesheet by convention.

```js
// clone <style> / <link rel="stylesheet"> from the light DOM into the shadow root
utils.StyleHelper.copyStyles(this, this.root);

// append <link href="{CSS_BASE_PATH}/{tagname}.css">
utils.StyleHelper.loadComponentStyle(this);
```

The base path defaults to `"css"` and can be set through the global variable
named by `utils.StyleHelper.CSS_BASE_PATH_VAR`.

### `utils.WeakData`

A per-reference data store backed by a `WeakMap`; data is garbage-collected once
the reference goes away — ideal for attaching state to DOM nodes.

```js
const store = new utils.WeakData();

store.value(node, "count", 1);   // set
store.value(node, "count");      // get -> 1
store.value(node, "count", undefined); // delete
store.destroy(node);             // drop everything for `node`
```

### `utils.DefineComponentHelper`

The `define` function is also reachable here, together with `toNodeName`:

```js
utils.DefineComponentHelper(MyComponent);         // = define(MyComponent)
```

---

## Settings

`SETTING` holds mutable runtime settings. Change them **before** components are
created:

```js
import { SETTING } from "@default-js/defaultjs-html-components";

SETTING.eventSeparator = ":";    // events become "d-foo:change", …
```

---

## Helpers

### `createUUID(prefix?, suffix?)`

Generate a document-unique id (retries until unused):

```js
import { createUUID } from "@default-js/defaultjs-html-components";

const id = createUUID("id-");    // -> "id-…unique…"
```

### `Ready()`

Factory for a *lazy* promise whose resolution you control and that exposes a
`resolved` flag — the same primitive that backs a component's `ready`:

```js
import { Ready } from "@default-js/defaultjs-html-components";

const gate = Ready();
someEvent.then(() => gate.resolve());
await gate;
```

---

## Usage in the browser (global build)

The bundled browser build registers everything under a global namespace:

```html
<script src="dist/defaultjs-html-components.js"></script>
<script>
  const { Component, define, componentBaseOf, utils, SETTING } =
    window.defaultjs.html.components;
</script>
```

---

## TypeScript

Type definitions ship with the package (`index.d.ts`), so imports are typed out
of the box:

```ts
import { Component, componentBaseOf, ComponentOptions } from "@default-js/defaultjs-html-components";

class MyButton extends Component {
  static get NODENAME() { return "d-my-button"; }
  constructor() { super({ shadowRoot: true } satisfies ComponentOptions); }
}
```

> The DOM-extension methods added by `defaultjs-extdom` (`attr`, `find`,
> `trigger`, …) are provided by that package's own typings, not by this one.

---

## API overview

| Export            | Kind       | Description                                                        |
| ----------------- | ---------- | ----------------------------------------------------------------- |
| `Component`       | class      | Base class for `HTMLElement`-based components.                    |
| `componentBaseOf` | function   | Build a component base class for any HTML element type.           |
| `define`          | function   | Register a component as a custom element (uses its `NODENAME`).   |
| `createUUID`      | function   | Create a document-unique id.                                      |
| `Ready`           | function   | Create a controllable, lazy promise.                              |
| `SETTING`         | object     | Runtime settings (`eventSeparator`).                              |
| `utils`           | object     | `EventHelper`, `NodeHelper`, `StyleHelper`, `WeakData`, `DefineComponentHelper`. |

---

## License

[MIT](LICENSE) © Frank Schüler
