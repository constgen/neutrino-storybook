# Neutrino middleware to merge Webpack config with Storybook

[![npm](https://img.shields.io/npm/v/neutrino-middleware-storybook.svg)](https://www.npmjs.com/package/neutrino-middleware-storybook)
[![npm](https://img.shields.io/npm/dt/neutrino-middleware-storybook.svg)](https://www.npmjs.com/package/neutrino-middleware-storybook)

`neutrino-middleware-storybook` is a middleware that is necessary when you want to use [Neutrino](https://neutrino.js.org) with [Storybook](https://storybook.js.org/). It merges configs of both so Storybook inherits configuration from your project and you don't have to separately duplicate the Webpack config. For example, if you have SASS loader configured in your project it will be automatically used in Storybook. The same for other loaders.

## Features

- Reuse all Neutrino loaders
- Skip mostly all Neutrino plugins except `MiniCssExtractPlugin`
- Skip linting
- Merge some other configuration parts without breaking build process

## Requirements

- Node.js v10.13+
- Neutrino v9
- Storybook v6

## Installation

`neutrino-middleware-storybook` can be installed from NPM. You should install it to `"dependencies"` (--save) or `"devDependncies"` (--save-dev) depending on your goal.

```bash
npm install --save neutrino-middleware-storybook
```

Create a `./storybook/main.js` file in the root of the project, containing:

**./storybook/main.js**

```js
let neutrino = require('neutrino')

module.exports = neutrino().storybookMain()
```

## Usage

`neutrino-middleware-storybook` can be consumed from the Neutrino API, middleware, or presets.

### In **neutrinorc**

The middleware also may be used together with another presets in Neutrino rc-file, e.g.:

**.neutrinorc.js**

```js
let web       = require('@neutrino/web')
let storybook = require('neutrino-middleware-storybook')

module.exports = {
   use: [
      web(),
      storybook()
   ]
}
```

### In preset

Require this package and plug it into Neutrino. The following shows how you can pass an options object to the middleware, showing the **defaults**:

```js
let storybook = require('neutrino-middleware-storybook')

neutrino.use(storybook({
   stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
   addons : []
}))
```

- `stories`: optional array of glob pattern paths to [configure stories loading](https://storybook.js.org/docs/react/configure/overview). Maps to `stories` property in `./storybook/main.js`.
- `addons`: optional array of [Storybook addons](https://storybook.js.org/addons) that you installed in the project. Maps to `addons` property in `./storybook/main.js`.

### Addons

In order to use addons, simply install and add them to the the `addons` option:

```js
let storybook = require('neutrino-middleware-storybook')

neutrino.use(storybook({
   addons: ['@storybook/addon-actions']
}))
```