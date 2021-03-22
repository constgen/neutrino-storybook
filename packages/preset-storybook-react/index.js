let path = require('path')

let storybook = require('neutrino-middleware-storybook')
let deepmerge = require('deepmerge')

module.exports = function (customSettings = {}) {
	return function (neutrino) {
		const STORIES_EXTENSIONS = "**/*.stories.mdx";
		const ROOT_PATH          = "../"; // relative to `./.storybook`
		let   sourcePath         = path.relative(process.cwd(), neutrino.options.source);
		let   storiesPattern     = path.join(ROOT_PATH, sourcePath, STORIES_EXTENSIONS);
		let   storiesGlobPattern = storiesPattern.replace(/\\/g, "/");
		let   defaultSettings    = {
			stories: [storiesGlobPattern],
			addons : [],
		};
		let settings = deepmerge(defaultSettings, customSettings);

		neutrino.use(
			storybook({
				stories: settings.stories,
				addons: settings.addons,
			})
		);

		// TODO Perhaps the condition should contained inside docs(). I'm sure there is a better way to test to see if the end-user Storybook config uses certain add-ons.
		if (settings.addons.includes("@storybook/addon-docs/mdx-compiler-plugin")) {
			// eslint-disable-next-line unicorn/prevent-abbreviations
			let docs = require("./middlewares/docs");
			neutrino.use(docs());
		}

		// TODO Perhaps the condition should contained inside source(). I'm sure there is a better way to test to see if the end-user Storybook config uses certain add-ons.
		if (settings.addons.includes("@storybook/source-loader")) {
			let source = require("./middlewares/source");
			neutrino.use(source());
		}

		neutrino.config
			.resolve
				.alias
					.set("@storybook/react", require.resolve("@storybook/react"))
				.end()
			.end();
	}
}