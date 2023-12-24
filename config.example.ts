import { validate } from 'backend-helper-kit'
import Joi from 'joi'

type configType = {
    PORT: number
    MONGO_CONNECTION: string
    MODULE_NAME: string
    MODULE_KEY: string
    SESSION_SECRET: string
    ENV: string
    BOT_TOKEN: string
    GPT_CONNECTOR: string
}

const configSchema = Joi.object({
    PORT: Joi.number().required(),
    MONGO_CONNECTION: Joi.string().required(),
    MODULE_NAME: Joi.string().required(),
    MODULE_KEY: Joi.string().required(),
    SESSION_SECRET: Joi.string().required(),
    ENV: Joi.string().valid('development', 'production').required(),
    BOT_TOKEN: Joi.string().required(),
    GPT_CONNECTOR: Joi.string().required()
})

export const config: configType = validate(
    {
        PORT: 8000,
        MONGO_CONNECTION: 'mongodb://127.0.0.1:27017/fundementai',
        MODULE_KEY: '123',
        MODULE_NAME: 'fundementai',
        SESSION_SECRET: '123',
        ENV: 'development',
        BOT_TOKEN: '123',
        GPT_CONNECTOR: 'http://localhost:8001'
    },
    configSchema
)

console.log(config)
