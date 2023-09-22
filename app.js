'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')

module.exports.options = {}

module.exports = async function (fastify, opts) {
  fastify.register(require('@fastify/view'), {
    engine: {
      ejs: require('ejs')
    },
    root: path.join(__dirname, 'views')
  });
  
  fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'public'),
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
