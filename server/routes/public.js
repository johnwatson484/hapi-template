module.exports = [{
  method: 'GET',
  path: '/assets/{path*}',
  handler: {
    directory: {
      path: [
        'server/public/css',
        'server/public/scripts'
      ]
    }
  }
}]
