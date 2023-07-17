const Joi = require('joi');
const { baseRequiredString } = require('../helpers/joi');
const shareProps = {
    email: baseRequiredString,
    password: baseRequiredString.min(8).max(16)
}
const loginSchema = { body: Joi.object({ ...shareProps }) }
const registerSchema = { body: Joi.object({ ...shareProps, username: baseRequiredString }) }

module.exports = { loginSchema, registerSchema }