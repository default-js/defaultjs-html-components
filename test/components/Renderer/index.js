import Renderer from "../../../src/components/Renderer";

describe("Renderer test", () => {
	it("create element", async () => {
        const element = document.createElement("d-renderer");
        document.body.append(element);
        await element.ready;
		expect(element.ready.resolved).toBe(true);
        element.remove();
	});

    it(".render({template, data})", async () => {
        const template = `<div>\${test}</div>`;
        const data = {test: "value"};
        const element = document.createElement("d-renderer");
        document.body.append(element);
        await element.render({template, data});
        
        expect(element.children.length).toBe(1);
        expect(element.children[0].nodeName).toBe("DIV");
        expect(element.children[0].children.length).toBe(0);
        expect(element.children[0].childNodes.length).toBe(1);


        element.remove();
	});

    it("predefined attributes ", async () => {
        const template = `<div>\${test}</div>`;
        const element = create(`<d-renderer template="/templates/components/Renderer/case-1.tpl.html" data="/data/components/Renderer/case-1.json"></d-renderer>`).first();
        document.body.append(element);
        await element.ready;
        
        expect(element.children.length).toBe(1);
        expect(element.children[0].nodeName).toBe("DIV");
        expect(element.children[0].children.length).toBe(0);
        expect(element.children[0].childNodes.length).toBe(1);


        element.remove();
	});
});