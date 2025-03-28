const plugin = {
  name: 'headers',
  register: (server, options) => {
    server.ext('onPreResponse', (request, h) => {
      const headers = request.response.isBoom ? request.response.output.headers : request.response?.headers

      if (headers) {
        headers['X-Content-Type-Options'] = 'nosniff'
        headers['X-Frame-Options'] = 'DENY'
        headers['X-XSS-Protection'] = '1; mode=block'
        // Cache-Control must be lower case to avoid conflicts with Hapi's built-in header handling
        headers['cache-control'] = 'no-cache'
        headers['Cross-Origin-Opener-Policy'] = 'same-origin'
        headers['Cross-Origin-Embedder-Policy'] = 'require-corp'
        headers['Cross-Origin-Resource-Policy'] = 'same-site'
        headers['Referrer-Policy'] = 'no-referrer'
        headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload'
        headers['Permissions-Policy'] = 'camera=(), geolocation=(), magnetometer=(), microphone=(), payment=(), usb=()'
      }

      return h.continue
    })
  }
}

export default plugin
