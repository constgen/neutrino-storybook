#!/usr/bin/env node

process.env.NODE_ENV = process.env.NODE_ENV || 'production'
require('@storybook/vue/dist/server/build')