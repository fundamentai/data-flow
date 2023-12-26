import Joi from 'joi'

export const article = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string(),
    link: Joi.string().required()
})
