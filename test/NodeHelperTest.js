import { findParent, findClosestInDepth } from "../src/utils/NodeHelper.js";

describe("NodeHelper - ", () => {
	it("findParent returns the nearest matching ancestor", () => {
		const root = create(`<section><div class="a"><span id="np-target"></span></div></section>`).first();
		document.body.append(root);
		const target = root.find("#np-target").first();

		const found = findParent(target, (node) => node.nodeName === "SECTION");

		expect(found).toBe(root);
		root.remove();
	});

	it("findParent can match the start node itself", () => {
		const root = create(`<div id="np-self"></div>`).first();
		document.body.append(root);

		expect(findParent(root, (node) => node.id === "np-self")).toBe(root);
		root.remove();
	});

	it("findParent returns null when nothing matches", () => {
		const root = create(`<div><span id="np-target-2"></span></div>`).first();
		document.body.append(root);
		const target = root.find("#np-target-2").first();

		expect(findParent(target, () => false)).toBe(null);
		root.remove();
	});

	it("findClosestInDepth returns the shallowest match", () => {
		const root = create(`<div><p></p><label class="deep"><label class="deeper"></label></label></div>`).first();

		const found = findClosestInDepth(root, (node) => node.nodeName === "LABEL");

		expect(found).toBe(root.find("label.deep").first());
	});

	it("findClosestInDepth returns the first of equally shallow matches", () => {
		const root = create(`<div><label class="a"></label><label class="b"></label></div>`).first();

		expect(findClosestInDepth(root, (node) => node.nodeName === "LABEL")).toBe(root.find("label.a").first());
	});

	it("findClosestInDepth returns null when nothing matches", () => {
		const root = create(`<div><p></p></div>`).first();
		expect(findClosestInDepth(root, () => false)).toBe(null);
	});
});
