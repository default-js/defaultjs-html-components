const path = require("path");

const entries = {};
entries["browser-bundle"] = "./browser-bundle.js";
entries["module-bundle"] = "./module-bundle.js";

module.exports = {
	entry: entries,
	resolve: {
		alias: {
			"@src": path.resolve(__dirname + "/src"),
			"@test": path.resolve(__dirname + "/test"),
			"@modules": path.resolve(__dirname + "/node_modules"),
		},
	},
	target: "web",
};
