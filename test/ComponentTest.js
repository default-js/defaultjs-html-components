import Component from "../src/Component";
import {define} from "../src/utils/DefineComponentHelper.js";

class TestElement extends Component{
	static get NODENAME(){
		return "x-test-component";
	}

	constructor(){
		super();
	}
}

define(TestElement);


describe("Component tests - ", () => {
	it("case 1", async () => {
		const component = create(`<x-test-component></x-test-component>`).first();

		document.body.append(component);
		await component.ready;
		expect(true).toBe(true);
		component.remove();
	});
});
