const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const registerValidationSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const loginValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const addToCartValidationSchema = Joi.object({
    productid: Joi.objectId().required(),
});

module.exports = { registerValidationSchema, loginValidationSchema, addToCartValidationSchema };
