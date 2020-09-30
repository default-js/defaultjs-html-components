import { componentPrefix } from "../Constants";

export const toNodeName = (name, prefix) => {
	if(typeof prefix === "string")
		return prefix + name;
		
	return componentPrefix + name;
};

export const define = function(clazz, options) {
	const nodename = clazz.NODENAME;
	if (!customElements.get(nodename)) {
		customElements.define(nodename, clazz, options);
	}
};


export default define; 
