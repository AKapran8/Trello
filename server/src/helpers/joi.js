const joi = require("joi");

const baseRequiredString = joi.string().exist().required().trim()
const baseRequiredInt = joi.number().exist().required().integer()

module.exports = { baseRequiredString, baseRequiredInt }