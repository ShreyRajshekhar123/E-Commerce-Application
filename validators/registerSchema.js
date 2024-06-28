const Joi = require('joi');

module.exports.registerSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
    email: Joi.string().email().required()
})