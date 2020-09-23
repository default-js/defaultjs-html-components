import {attributeChangeEventPrefix} from "../Constants";

export const componentEventname = (eventType, node ) => {
   return node.nodeName.toLowerCase() + "-" + eventType;
};


export const attributeChangeEventname = (attribute, node ) => {
    return componentEventname(attributeChangeEventname + "-" + attribute, node);
};