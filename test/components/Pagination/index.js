import Pagination from "../../../src/components/Pagination";

describe("pagination test", () => {
	it("init tests", async () => {
        const element = document.createElement("d-pagination");
        document.body.append(element);
        await element.ready.done;
		expect(true).toBe(true);
	});
});