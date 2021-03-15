# Neutrino preset for Storybook with React

[![npm](https://img.shields.io/npm/v/neutrino-preset-storybook-react.svg)](https://www.npmjs.com/package/neutrino-preset-storybook-react)
[![npm](https://img.shields.io/npm/dt/neutrino-preset-storybook-react.svg)](https://www.npmjs.com/package/neutrino-preset-storybook-react)

`neutrino-preset-storybook-react` is a [Neutrino](https://neutrino.js.org) preset for React projects to enable usage of [Storybook](https://storybook.js.org/). It is recommended to have some React preset in the configuration to be able to compile modules in Storybook. It includes some addons so you don't have to install them manually.

## Features

- Compatible with any other middlewares and presets
- Aliases to addons so you can import them in your stories directly by name (e.g. `import { Meta } from '@storybook/addon-docs/blocks'`)
- MDX stories support
- Markdown support

## Requirements

- Node.js v10.13+
- Neutrino v9
- Storybook v6
- React

## Installation

`neutrino-preset-storybook-react` can be installed from NPM. You should install it to `"dependencies"` (--save) or `"devDependncies"` (--save-dev) depending on your goal.

```bash
npm install --save-dev neutrino-preset-storybook-react
```

Create a `./storybook/main.js` file in the root of the project, containing:

**./storybook/main.js**

```js
let neutrino = require('neutrino')

module.exports = neutrino().storybookMain()
```

Edit your project's `package.json` and add these scripts

**package.json**

```json
{
   "scripts": {
      "storybook": "start-storybook -p 6006",
      "build-storybook": "build-storybook"
   }
}
```

## Usage

`neutrino-preset-storybook-react` can be consumed from the Neutrino API, middleware, or presets.

### In **neutrinorc**

The preset also may be used together with another presets in Neutrino rc-file, e.g.:

**.neutrinorc.js**

```js
let web       = require('@neutrino/web')
let storybook = require('neutrino-preset-storybook-react')

module.exports = {
   use: [
      web(),
      storybook()
   ]
}
```

### In preset

Require this package and plug it into Neutrino. The following shows how you can pass an options object to the preset, showing the **defaults**:

```js
let storybook = require('neutrino-preset-storybook-react')

neutrino.use(storybook({
   stories: [
      '../src/**/*.stories.@(js|jsx|ts|tsx)',
      '../src/**/*.stories.mdx'
   ],
   addons: []
}))
```

- `stories`: optional array of glob pattern paths to [configure stories loading](https://storybook.js.org/docs/react/configure/overview). Maps to `stories` property in `./storybook/main.js`.
- `addons`: optional array of [Storybook addons](https://storybook.js.org/addons) that you installed in the project. Maps to `addons` property in `./storybook/main.js`.

> It is recommended to call this preset after the `neutrino.config.module.rule('compile')` to make it work properly. More information about usage of Neutrino preset can be found in the [documentation](https://neutrino.js.org/presets).

### Addons

In order to use addons, simply install and add them to the the `addons` option:

**.neutrinorc.js**

```js
let storybook = require('neutrino-preset-storybook-react')

module.exports = {
   use: [
      storybook({
         addons: ['@storybook/addon-storysource']
      })
   ]
}
```