import Pagination from "../../../src/components/JsonData";

describe("json-data test", () => {
	it("init tests", async () => {
        const element = document.createElement("d-json-data");
        document.body.append(element);
        await element.ready;
		expect(element.ready.resolved).toBeTrue();
        element.remove();
	});

    it("get json", async () => {
        const element = create(`<d-json-data>
            {
                "test": true
            }
        </d-json-data>`).first();
        document.body.append(element);
        const json = await element.json;

        expect(json.test).toBeTrue();
        element.remove();
	});

});