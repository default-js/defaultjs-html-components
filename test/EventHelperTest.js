import { componentEventname, attributeChangeEventname } from "../src/utils/EventHelper.js";
import { SETTING } from "../src/Constants.js";

describe("EventHelper - ", () => {
	it("componentEventname builds a name from a string node", () => {
		expect(componentEventname("change", "d-foo")).toBe("d-foo--change");
	});

	it("componentEventname lower-cases the node name", () => {
		expect(componentEventname("change", "D-FOO")).toBe("d-foo--change");
	});

	it("componentEventname accepts an HTMLElement", () => {
		const el = create(`<d-foo-el></d-foo-el>`).first();
		expect(componentEventname("change", el)).toBe("d-foo-el--change");
	});

	it("componentEventname accepts an object with NODENAME", () => {
		expect(componentEventname("change", { NODENAME: "d-bar" })).toBe("d-bar--change");
	});

	it("componentEventname honors a custom separator", () => {
		expect(componentEventname("change", "d-foo", ":")).toBe("d-foo:change");
	});

	it("componentEventname throws for an unsupported node", () => {
		expect(() => componentEventname("change", 42)).toThrowError(/not supported/);
	});

	it("attributeChangeEventname composes prefix and attribute", () => {
		expect(attributeChangeEventname("disabled", "d-foo")).toBe("d-foo--attribute--disabled");
	});

	it("attributeChangeEventname honors a custom separator", () => {
		expect(attributeChangeEventname("value", "d-foo", ":")).toBe("d-foo:attribute:value");
	});

	it("defaults to SETTING.eventSeparator", () => {
		const previous = SETTING.eventSeparator;
		SETTING.eventSeparator = ":";
		try {
			expect(componentEventname("change", "d-foo")).toBe("d-foo:change");
			expect(attributeChangeEventname("value", "d-foo")).toBe("d-foo:attribute:value");
		} finally {
			SETTING.eventSeparator = previous;
		}
	});
});
