import { componentPrefix } from "../Constants";
export default (name, clazz, options) => {
	const componentName = componentPrefix + name;
	if (!customElements.get(componentName)) {
		customElements.define(componentName, clazz, options);
	}
};
