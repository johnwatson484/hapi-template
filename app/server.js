const hapi = require('@hapi/hapi')
const config = require('./config')

async function createServer () {
  const server = hapi.server({
    port: config.port,
    routes: {
      validate: {
        options: {
          abortEarly: false,
        },
      },
    },
    router: {
      stripTrailingSlash: true,
    },
  })

  await server.register(require('@hapi/inert'))
  await server.register(require('./plugins/views'))
  await server.register(require('./plugins/router'))
  await server.register(require('./plugins/errors'))
  await server.register(require('./plugins/logging'))
  await server.register(require('./plugins/crumb'))

  if (config.isDev) {
    await server.register(require('blipp'))
  }

  return server
}

module.exports = { createServer }
