import WeakData from "../src/utils/WeakData.js";

describe("WeakData - ", () => {
	it("data() returns a stable object per reference", () => {
		const wd = new WeakData();
		const ref = {};
		const data = wd.data(ref);

		expect(typeof data).toBe("object");
		data.x = 1;
		expect(wd.data(ref).x).toBe(1);   // same object on re-access
		expect(wd.data({})).not.toBe(data); // different reference -> different object
	});

	it("value() reads, writes and deletes", () => {
		const wd = new WeakData();
		const ref = {};

		expect(wd.value(ref, "k")).toBeUndefined();

		wd.value(ref, "k", 42);
		expect(wd.value(ref, "k")).toBe(42);

		wd.value(ref, "k", undefined); // delete
		expect(wd.value(ref, "k")).toBeUndefined();
		expect("k" in wd.data(ref)).toBe(false);
	});

	it("value() throws with fewer than two arguments", () => {
		const wd = new WeakData();
		expect(() => wd.value({})).toThrowError(/reference and key required/);
	});

	it("destroy() drops all data of a reference", () => {
		const wd = new WeakData();
		const ref = {};
		wd.value(ref, "k", 1);

		wd.destroy(ref);

		expect(wd.value(ref, "k")).toBeUndefined();
	});

	it("keeps data isolated per reference", () => {
		const wd = new WeakData();
		const a = {};
		const b = {};
		wd.value(a, "k", "A");
		wd.value(b, "k", "B");

		expect(wd.value(a, "k")).toBe("A");
		expect(wd.value(b, "k")).toBe("B");

		wd.destroy(a);
		expect(wd.value(a, "k")).toBeUndefined();
		expect(wd.value(b, "k")).toBe("B"); // unaffected by destroying `a`
	});
});
