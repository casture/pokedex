const Fastify = require('fastify')
const fastifyStatic = require('@fastify/static')
const Autoload = require('@fastify/autoload')
const { join } = require('path')

const fastify = Fastify({
  logger: true
})

fastify.register(fastifyStatic, {
  root: join(__dirname, 'public'),
  prefix: '/public/'
})

fastify.register(Autoload, {
  dir: join(__dirname, 'routes'),
})

module.exports = fastify
