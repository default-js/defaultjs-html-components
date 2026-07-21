import { createUUID } from "../src/Component.js";

describe("createUUID - ", () => {
	it("applies prefix and suffix", () => {
		const id = createUUID("pre-", "-suf");
		expect(id.startsWith("pre-")).toBe(true);
		expect(id.endsWith("-suf")).toBe(true);
	});

	it("works without prefix or suffix", () => {
		const id = createUUID();
		expect(typeof id).toBe("string");
		expect(id.length).toBeGreaterThan(0);
	});

	it("returns document-unique values", () => {
		const a = createUUID();
		const b = createUUID();
		expect(a).not.toBe(b);
		expect(document.getElementById(a)).toBe(null);
	});

	it("gives up after 100 collisions and logs an error", () => {
		const error = spyOn(console, "error");
		const lookup = spyOn(document, "getElementById").and.returnValue(document.body); // always "taken"

		const id = createUUID("x-");

		expect(lookup).toHaveBeenCalledTimes(100);
		expect(error).toHaveBeenCalled();
		expect(id.startsWith("x-")).toBe(true);
	});
});
