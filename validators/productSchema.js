const Joi = require('joi');

module.exports.productSchema = Joi.object({
    name: Joi.string().required().trim().min(1).max(20),
    price: Joi.number().required().min(0).max(500000),
    desc: Joi.string().required(),
    img: Joi.string()
})