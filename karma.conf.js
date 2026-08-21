const path = require("path");
const webpackFactory = require("./webpack.config.js");
const puppeteer = require("puppeteer");
process.env.CHROME_BIN = puppeteer.executablePath();

// Base webpack config used for the test bundle, extended with istanbul
// instrumentation of the `src` sources so karma can report code coverage.
const webpack = webpackFactory({}, { mode: "development", target: "target" });
webpack.module = webpack.module || {};
webpack.module.rules = (webpack.module.rules || []).concat([
	{
		test: /\.js$/,
		include: path.resolve(__dirname, "src"),
		use: {
			loader: "babel-loader",
			options: {
				babelrc: false,
				configFile: false,
				plugins: ["babel-plugin-istanbul"],
			},
		},
	},
]);

module.exports = function (config) {
	config.set({
		// base path that will be used to resolve all patterns (eg. files,
		// exclude)
		basePath: "",
		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ["jasmine", "webpack"],
		plugins: [
			"karma-webpack",
			"karma-jasmine",
			"karma-coverage-istanbul-reporter",
			"karma-sourcemap-loader",
			"karma-firefox-launcher",
			"karma-chrome-launcher",
			"karma-safari-launcher",
		],
		// list of files / patterns to load in the browser
		files: ["test/index.js"],
		// list of files / patterns to exclude
		exclude: ["node_modules/*"],
		// available preprocessors:
		// https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			"test/index.js": ["webpack", "sourcemap"],
		},
		// test results reporter to use
		// possible values: "dots", "progress"
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ["progress", "coverage-istanbul"],
		coverageIstanbulReporter: {
			reports: ["text-summary", "text", "html", "lcovonly", "cobertura"],
			dir: path.join(__dirname, "coverage"),
			combineBrowserReports: true,
			fixWebpackSourcePaths: true,
			"report-config": {
				html: { subdir: "report-html" },
				lcovonly: { subdir: ".", file: "report-lcovonly.txt" },
				cobertura: { subdir: ".", file: "cobertura.txt" },
				text: { subdir: ".", file: "text.txt" },
			},
		},
		logLevel: config.LOG_INFO,
		browsers: [config.autoWatch ? "Chrome" : "ChromeHeadless"],
		singleRun: !config.autoWatch,
		concurrency: Infinity,
		port: 9876,
		colors: true,
		client: {
			clearContext: true,
			//useIframe : false,
			runInParent: false,
			captureConsole: true,
		},
		browserDisconnectTimeout: 60000,
		browserNoActivityTimeout: 60000,
		webpack,
	});
};
