const path = require("path");

const entries = {};
entries["browser-bundle"] = "./browser-bundle.js";
entries["module-bundle"] = "./module-bundle.js";

module.exports = {
	entry: entries,
	target: "web",
};
