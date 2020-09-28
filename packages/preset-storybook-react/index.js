let path = require('path')

let storybook = require('neutrino-middleware-storybook')
let deepmerge = require('deepmerge')

// eslint-disable-next-line unicorn/prevent-abbreviations
let docs = require('./middlewares/docs')

module.exports = function (customSettings = {}) {
	return function (neutrino) {
		const STORIES_EXTENSIONS = '**/*.stories.mdx'
		const ROOT_PATH          = '../' // relative to `./.storybook`
		let sourcePath           = path.relative(process.cwd(), neutrino.options.source)
		let storiesPattern       = path.join(ROOT_PATH, sourcePath, STORIES_EXTENSIONS)
		let storiesGlobPattern   = storiesPattern.replace(/\\/g, '/')
		let defaultSettings      = {
			stories: [storiesGlobPattern],
			addons : [
				require.resolve('@storybook/addon-links/preset'),
				require.resolve('@storybook/addon-actions/preset'),
				require.resolve('@storybook/addon-backgrounds/preset'),
				require.resolve('@storybook/addon-controls'),
				require.resolve('@storybook/addon-docs/preset'),
				require.resolve('@storybook/addon-viewport'),
				require.resolve('@storybook/addon-toolbars')
			]
		}
		let settings             = deepmerge(defaultSettings, customSettings)

		neutrino.use(storybook({
			stories: settings.stories,
			addons : settings.addons
		}))
		neutrino.use(docs())

		neutrino.config
			.resolve
				.alias
					.set('@storybook/addon-links', require.resolve('@storybook/addon-links'))
					.set('@storybook/addon-actions', require.resolve('@storybook/addon-actions'))
					.set('@storybook/addon-docs/blocks', require.resolve('@storybook/addon-docs/blocks'))
					.set('@storybook/react', require.resolve('@storybook/react'))
					.end()
				.end()
	}
}