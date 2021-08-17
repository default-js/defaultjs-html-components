import {attributeChangeEventPrefix} from "../Constants";

export const componentEventname = (eventType, node ) => {	
	let nodename = "unsupported";
	if(typeof node === "string")
		nodename = node;
	else if(node instanceof HTMLElement)
		nodename = node.nodeName;
	else if(typeof node.NODENAME === "string")
		nodename = node.NODENAME;
	else throw new Error(typeof node + " is not supported as pram node!");
	
   return `${nodename.toLowerCase()}:${eventType}`;//use @ as separtor and not
};


export const attributeChangeEventname = (attribute, node ) => {
    return componentEventname(attributeChangeEventPrefix + "-" + attribute, node);
};

export default {componentEventname, attributeChangeEventname}