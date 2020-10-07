import Ready from "../src/Ready";

describe("ready tests - ", () => {
	it("case 1", async () => {
        const ready = Ready();
		expect(ready.resolved).toBe(false);
		expect(ready.error).toBe(false);
		ready.resolve();
		expect(ready.resolved).toBe(true);
		expect(ready.error).toBe(false);
	});
});