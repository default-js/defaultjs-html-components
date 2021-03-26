import Global from "@default-js/defaultjs-common-utils/src/Global"

export const copyStyles = (source, target, append = true) => {
	const styles = source.find(`style[type="text/css"], link[rel="stylesheet"]`);

	if (append)
		target.append(styles.cloneNode(true));
	else
		target.prepend(styles.cloneNode(true));
}

export const CSS_BASE_PATH_VAR = "CSS_BASE_PATH";
export const loadComponentStyle = (target) => {
	const path = `${Global[CSS_BASE_PATH_VAR] || "css"}/${target.nodeName.toLowerCase()}.css`;
	target.append(`<link rel="stylesheet" href="${path}"/>`);
}

export default { CSS_BASE_PATH_VAR, copyStyles, loadComponentStyle };