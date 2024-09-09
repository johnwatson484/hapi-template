const joi = require('joi')
const envs = ['development', 'test', 'production']

const schema = joi.object().keys({
  port: joi.number().default(3000),
  env: joi.string().valid(...envs).default(envs[0]),
  appName: joi.string(),
})

const config = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  appName: 'Hapi Template',
}

const { error, value } = schema.validate(config)

if (error) {
  throw new Error(`The server config is invalid. ${error.message}`)
}

value.isDev = value.env === 'development'

module.exports = value
