const hapi = require('@hapi/hapi')

async function createServer () {
  // Create the hapi server
  const server = hapi.server({
    port: 3000
  })

  // Register the plugins
  await server.register(require('@hapi/inert'))
  await server.register(require('./plugins/views'))
  await server.register(require('./plugins/router'))
  await server.register(require('blipp'))

  return server
}

module.exports = createServer
