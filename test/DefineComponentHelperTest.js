import define, { toNodeName } from "../src/utils/DefineComponentHelper.js";
import Component from "../src/Component.js";
import { componentPrefix } from "../src/Constants.js";

describe("DefineComponentHelper - ", () => {
	it("toNodeName uses the default component prefix", () => {
		expect(toNodeName("button")).toBe(`${componentPrefix}button`);
	});

	it("toNodeName uses a custom prefix", () => {
		expect(toNodeName("button", "x-")).toBe("x-button");
	});

	it("define registers a custom element and is idempotent", () => {
		class Defined extends Component {
			static get NODENAME() { return "x-define-me"; }
		}

		define(Defined);
		expect(customElements.get("x-define-me")).toBe(Defined);

		expect(() => define(Defined)).not.toThrow(); // second call is a no-op
		expect(customElements.get("x-define-me")).toBe(Defined);
	});
});
