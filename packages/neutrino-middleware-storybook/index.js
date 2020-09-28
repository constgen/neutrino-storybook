let path = require('path')

let deepmerge = require('deepmerge')

module.exports = function (customSettings = {}) {
	return function (neutrino) {
		const STORIES_EXTENSIONS = '**/*.stories.@(js|jsx|ts|tsx|mdx)'
		const ROOT_PATH          = '../' // relative to `./.storybook`
		let sourcePath           = path.relative(process.cwd(), neutrino.options.source)
		let storiesPattern       = path.join(ROOT_PATH, sourcePath, STORIES_EXTENSIONS)
		let storiesGlobPattern   = storiesPattern.replace(/\\/g, '/')
		let defaultSettings      = {
			stories: [storiesGlobPattern],
			addons : []
		}
		let settings             = deepmerge(defaultSettings, customSettings)

		neutrino.register('storybookMain', function () {
			return {
				stories: settings.stories,
				addons : settings.addons,
				async webpackFinal (storybookConfig) {
					neutrino.config
						.module.rules
							.delete('lint')
							.end()
						.end()

					let neutrinoConfig  = neutrino.config.toConfig()
					let storybookRules  = storybookConfig.module.rules
						.filter(function hasInclude (rule) {
							return rule.include
						})
						.filter(function hasJsExtension (rule) {
							return rule.test.toString() === '/\\.js$/'
						})
					let neutrinoPlugins = neutrinoConfig.plugins.filter(function isCssPlugin (plugin) {
						return plugin.constructor.name === 'MiniCssExtractPlugin'
					})

					return {
						...storybookConfig,
						name       : neutrinoConfig.name,
						devtool    : neutrinoConfig.devtool,
						node       : deepmerge(storybookConfig.node, neutrinoConfig.node),
						output     : deepmerge(neutrinoConfig.output, storybookConfig.output),
						resolve    : deepmerge(storybookConfig.resolve, neutrinoConfig.resolve),
						plugins    : [...storybookConfig.plugins, ...neutrinoPlugins],
						performance: deepmerge(neutrinoConfig.performance, storybookConfig.performance),
						module     : {
							...storybookConfig.module,
							rules: deepmerge(storybookRules, neutrinoConfig.module.rules)
						}
					}
				 }
			}
		})
	}
}