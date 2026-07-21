import { copyStyles, loadComponentStyle, CSS_BASE_PATH_VAR } from "../src/utils/StyleHelper.js";
import Global from "@default-js/defaultjs-common-utils/src/Global.js";

describe("StyleHelper - ", () => {
	it("loadComponentStyle appends a link based on the tag name", () => {
		const el = create(`<d-styled></d-styled>`).first();

		loadComponentStyle(el);

		const link = el.find(`link[rel="stylesheet"]`).first();
		expect(link).toBeTruthy();
		expect(link.getAttribute("href")).toBe("css/d-styled.css");
	});

	it("loadComponentStyle honors the configured base path", () => {
		const el = create(`<d-styled-2></d-styled-2>`).first();
		Global[CSS_BASE_PATH_VAR] = "assets/styles";
		try {
			loadComponentStyle(el);
			expect(el.find(`link`).first().getAttribute("href")).toBe("assets/styles/d-styled-2.css");
		} finally {
			delete Global[CSS_BASE_PATH_VAR];
		}
	});

	it("copyStyles clones style and link nodes into the target", () => {
		const source = create(`<div><style type="text/css">.a{}</style><link rel="stylesheet" href="x.css"><p>ignored</p></div>`).first();
		const target = create(`<div></div>`).first();

		copyStyles(source, target);

		expect(target.find(`style[type="text/css"]`).first()).toBeTruthy();
		expect(target.find(`link[rel="stylesheet"]`).first()).toBeTruthy();
		expect(target.find(`p`).first()).toBeFalsy(); // only styles are copied
	});
});
