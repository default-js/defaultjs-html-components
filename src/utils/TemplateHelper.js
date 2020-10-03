import {Template} from "@default-js/defaultjs-template-language";
export const ATTR_TEMPLATE = "template";

const getTemplate = (node) => {
	let template = node.find(":scope > template").first();
	if (!!template) return template;
	const value = node.attr(ATTR_TEMPLATE);
	if (!value) return null;
	try {
		template = find(value).first();
		if (!!template) return template;
	} catch (e) {}
	return new URL(value, location.href);
};

export const loadTemplate = async (node, defaultTemplate, cache, alias) => {
	const template = getTemplate(node);
	if(template)
		return Template.load(template, cache, alias);

	return defaultTemplate;
};