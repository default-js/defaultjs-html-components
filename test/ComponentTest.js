import Component, { componentBaseOf, createUUID } from "../src/Component.js";
import { define } from "../src/utils/DefineComponentHelper.js";

/** Resolves on the next occurrence of `type` on `node`, rejects on timeout. */
const onceEvent = (node, type, timeout = 2000) =>
	new Promise((resolve, reject) => {
		const timer = setTimeout(() => reject(new Error(`timeout waiting for "${type}"`)), timeout);
		node.addEventListener(type, (event) => { clearTimeout(timer); resolve(event); }, { once: true });
	});

/** Appends a node to the document and waits for it to become ready. */
const connect = async (node) => {
	document.body.append(node);
	await node.ready;
	return node;
};

class Basic extends Component {
	static get NODENAME() { return "x-basic"; }
}
define(Basic);

class WithShadowContent extends Component {
	static get NODENAME() { return "x-shadow"; }
	constructor() { super({ shadowRoot: true, content: `<p class="c">hi</p>` }); }
}
define(WithShadowContent);

class WithUID extends Component {
	static get NODENAME() { return "x-uid"; }
	constructor() { super({ createUID: true, uidPrefix: "u-" }); }
}
define(WithUID);

class InitReturns extends Component {
	static get NODENAME() { return "x-init-returns"; }
	async init() { return "done"; }
}
define(InitReturns);

class InitThrows extends Component {
	static get NODENAME() { return "x-init-throws"; }
	async init() { throw new Error("boom"); }
}
define(InitThrows);

class Observing extends Component {
	static get NODENAME() { return "x-observing"; }
	static get observedAttributes() { return ["value"]; }
}
define(Observing);

describe("Component - lifecycle - ", () => {
	it("throws when NODENAME is not overridden", () => {
		expect(() => Component.NODENAME).toThrowError(/NODENAME must be defined/);
	});

	it("resolves ready once connected", async () => {
		const el = create(`<x-basic></x-basic>`).first();
		expect(el.ready.resolved).toBe(false);

		await connect(el);

		expect(el.ready.resolved).toBe(true);
		el.remove();
	});

	it("resolves ready with the return value of init()", async () => {
		const el = create(`<x-init-returns></x-init-returns>`).first();
		document.body.append(el);

		const value = await el.ready;

		expect(value).toBe("done");
		el.remove();
	});

	it("rejects ready when init() throws an Error", async () => {
		const el = create(`<x-init-throws></x-init-throws>`).first();
		document.body.append(el);

		await expectAsync(el.ready).toBeRejectedWithError("boom");
		expect(el.ready.error).toBe(true);
		el.remove();
	});

	it("resets ready on disconnect and re-initializes on reconnect", async () => {
		const el = await connect(create(`<x-basic></x-basic>`).first());
		expect(el.ready.resolved).toBe(true);

		el.remove();
		expect(el.ready.resolved).toBe(false);

		await connect(el);
		expect(el.ready.resolved).toBe(true);
		el.remove();
	});
});

describe("Component - constructor options - ", () => {
	it("attaches a shadow root and appends content", async () => {
		const el = await connect(create(`<x-shadow></x-shadow>`).first());

		expect(el.shadowRoot).toBeTruthy();
		expect(el.root).toBe(el.shadowRoot);
		expect(el.shadowRoot.querySelector("p.c")).toBeTruthy();
		el.remove();
	});

	it("assigns a unique id when createUID is set", async () => {
		const el = await connect(create(`<x-uid></x-uid>`).first());

		expect(el.id.startsWith("u-")).toBe(true);
		el.remove();
	});

	it("runs postConstructs in order during init", async () => {
		const order = [];
		class PostConstructs extends Component {
			static get NODENAME() { return "x-postconstructs"; }
			constructor() {
				super({ postConstructs: [async () => order.push(1), async () => order.push(2)] });
			}
		}
		define(PostConstructs);

		await connect(new PostConstructs());

		expect(order).toEqual([1, 2]);
	});

	it("exposes the postConstructs via the getter", () => {
		const fn = async () => {};
		class Exposed extends Component {
			static get NODENAME() { return "x-exposed-pc"; }
			constructor() { super({ postConstructs: [fn] }); }
		}
		define(Exposed);

		expect(new Exposed().postConstructs).toContain(fn);
	});

	it("honors the deprecated postConstucts alias and warns", async () => {
		const warn = spyOn(console, "warn");
		const ran = [];
		class Deprecated extends Component {
			static get NODENAME() { return "x-deprecated-pc"; }
			constructor() { super({ postConstucts: [async () => ran.push("old")] }); }
		}
		define(Deprecated);

		await connect(new Deprecated());

		expect(ran).toEqual(["old"]);
		expect(warn).toHaveBeenCalled();
	});

	it("prefers postConstructs over the deprecated alias", async () => {
		const ran = [];
		class Both extends Component {
			static get NODENAME() { return "x-both-pc"; }
			constructor() {
				super({
					postConstructs: [async () => ran.push("new")],
					postConstucts: [async () => ran.push("old")],
				});
			}
		}
		define(Both);

		await connect(new Both());

		expect(ran).toEqual(["new"]);
	});
});

describe("Component - attribute events - ", () => {
	it("dispatches attribute-change and change events for observed attributes", async () => {
		const el = await connect(create(`<x-observing></x-observing>`).first());
		const attrEvent = onceEvent(el, "x-observing--attribute--value");
		const changeEvent = onceEvent(el, "x-observing--change");

		el.setAttribute("value", "1");

		await Promise.all([attrEvent, changeEvent]);
		el.remove();
	});

	it("does not dispatch for non-observed attributes", async () => {
		const el = await connect(create(`<x-observing></x-observing>`).first());
		let fired = false;
		el.addEventListener("x-observing--change", () => { fired = true; });

		el.setAttribute("data-other", "1");
		await new Promise((r) => setTimeout(r, 100));

		expect(fired).toBe(false);
		el.remove();
	});
});

describe("Component - componentBaseOf - ", () => {
	it("caches the generated class per base type", () => {
		expect(componentBaseOf(HTMLElement)).toBe(componentBaseOf(HTMLElement));
		expect(componentBaseOf(HTMLElement)).toBe(Component); // default export
	});

	it("can extend a built-in element type", async () => {
		class FancyInput extends componentBaseOf(HTMLInputElement) {
			static get NODENAME() { return "x-fancy-input"; }
		}
		define(FancyInput, { extends: "input" });

		const el = document.createElement("input", { is: "x-fancy-input" });
		await connect(el);

		expect(el instanceof HTMLInputElement).toBe(true); // base members
		expect(el.ready.resolved).toBe(true);              // component members
		el.remove();
	});
});
