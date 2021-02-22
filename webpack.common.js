const glob = require("glob");
const path = require("path");

const entryBasePath = "./src/components/";
const entries = glob.sync(entryBasePath + "*/*index.js").reduce((entries, path) => {
	const temp = path.replace(entryBasePath, "").split("/");
	console.log(temp);
	const name = temp[0];
	const type = temp[1].replace(/\.?index\.js/, "");
	const entry = name + "/" + (type.length > 0 ? type + "-" + name : name);
	entries[entry.toLowerCase()] = path;

	return entries;
}, {});
entries["browser-bundle"] = "./index.js";
entries["browser-framework-bundle"] = "./browser-framework-bundle.js";
entries["browser-full-bundle"] = "./browser-full-bundle.js";


console.log("entries", entries);

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
