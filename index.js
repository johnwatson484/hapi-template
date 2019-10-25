const init = require('./server')

init()
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
