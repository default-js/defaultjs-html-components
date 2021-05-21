import Renderer from "../../../src/components/Renderer";
import { createUID } from "../../../src/Component";

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
		const data = { test: "value" };
		const element = document.createElement("d-renderer");
		document.body.append(element);
		await element.render({ template, data });

		expect(element.children.length).toBe(1);
		expect(element.children[0].nodeName).toBe("DIV");
		expect(element.children[0].children.length).toBe(0);
		expect(element.children[0].childNodes.length).toBe(1);

		element.remove();
	});

	it("with attributes template and data ", async () => {
		const element = create(`<d-renderer template="/templates/components/Renderer/case-1.tpl.html" data="/data/components/Renderer/case-1.json"></d-renderer>`).first();
		document.body.append(element);
		await element.ready;

		expect(element.children.length).toBe(1);
		expect(element.children[0].nodeName).toBe("DIV");
		expect(element.children[0].children.length).toBe(0);
		expect(element.children[0].childNodes.length).toBe(1);

		element.remove();
	});

	it("render-mode - self-replace", async () => {
		const element = create(`<div></div>`).first();
		document.body.append(element);
		const renderer = create(`<d-renderer template="/templates/components/Renderer/case-1.tpl.html" data="/data/components/Renderer/case-1.json" render-mode="self-replace"></d-renderer>`).first();
		element.append(renderer);
		await renderer.ready;

		expect(element.children.length).toBe(1);
		expect(element.children[0].nodeName).toBe("DIV");
		expect(element.children[0].children.length).toBe(0);
		expect(element.children[0].childNodes.length).toBe(1);

		element.remove();
	});

	it("condition = true", async () => {
		window.test1 = true;
		const element = create(
			`<d-renderer 
                template="/templates/components/Renderer/case-1.tpl.html" 
                data="/data/components/Renderer/case-1.json" 
                condition="\${test1}"></d-renderer>
            `,
		).first();
		document.body.append(element);
		await element.ready;

		expect(element.children.length).toBe(1);
		expect(element.children[0].nodeName).toBe("DIV");
		expect(element.children[0].children.length).toBe(0);
		expect(element.children[0].childNodes.length).toBe(1);

		element.remove();
	});

	it("condition = false", async () => {
		window.test2 = false;
		const element = create(
			`<d-renderer 
                template="/templates/components/Renderer/case-1.tpl.html" 
                data="/data/components/Renderer/case-1.json" 
                condition="\${test2}"></d-renderer>
            `,
		).first();
		document.body.append(element);
		await element.ready;

		expect(element.children.length).toBe(0);

		element.remove();
	});

	it("initial-run=false", async () => {
		const element = create(
			`<d-renderer 
                template="/templates/components/Renderer/case-1.tpl.html" 
                data="/data/components/Renderer/case-1.json" 
                initial-run="false"></d-renderer>
            `,
		).first();
		document.body.append(element);
		await element.ready;

		expect(element.children.length).toBe(0);

		element.remove();
	});

	it("initial-run=true", async () => {
		const element = create(
			`<d-renderer 
                template="/templates/components/Renderer/case-1.tpl.html" 
                data="/data/components/Renderer/case-1.json" 
                initial-run="true"></d-renderer>
            `,
		).first();
		document.body.append(element);
		await element.ready;

		expect(element.children.length).toBe(1);
		expect(element.children[0].nodeName).toBe("DIV");
		expect(element.children[0].children.length).toBe(0);
		expect(element.children[0].childNodes.length).toBe(1);

		element.remove();
	});

	it("render on listen-event", async () => {
		const element = create(
			`<d-renderer 
                template="/templates/components/Renderer/case-1.tpl.html" 
                data="/data/components/Renderer/case-1.json" 
                initial-run="false"
                listen-event="test:render"></d-renderer>
            `,
		).first();
		document.body.append(element);
		await element.ready;

		expect(element.children.length).toBe(0);

		const result = new Promise((resolve) => {
			element.on("d-renderer:rendered", () => {
				expect(element.children.length).toBe(1);
				expect(element.children[0].nodeName).toBe("DIV");
				expect(element.children[0].children.length).toBe(0);
				expect(element.children[0].childNodes.length).toBe(1);
				element.remove();

				resolve();
			});
		});
		document.body.trigger("test:render");

		return result;
	});

	it("render on listen-element", async () => {        
		let wrong = true;
        const trigger = create(`<div id="${createUID()}"></div>`).first();
		document.body.append(trigger);

        trigger.on("test:render", () => {
            wrong = false;
        });

		const element = create(
			`<d-renderer 
                template="/templates/components/Renderer/case-1.tpl.html" 
                data="/data/components/Renderer/case-1.json" 
                initial-run="false"
                listen-event="test:render"
                listen-element="#${trigger.id}"></d-renderer>
            `,
		).first();
		document.body.append(element);
		await element.ready;

		expect(element.children.length).toBe(0);

		const result = new Promise((resolve, reject) => {
			element.on("d-renderer:rendered", () => {
				element.remove();
				if (wrong) reject();
				else resolve();
			});
		});

		document.body.trigger("test:render");
		trigger.trigger("test:render");

		return result;
	});
});
