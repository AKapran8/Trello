const Joi = require("joi")

/**
 * 
 * @param {Object} config
 * @param {Joi.ObjectSchema} config.params
 * @param {Joi.ObjectSchema} config.body
 */
const createSchema = ({ body, params }) => {
    const schema = {}
    if (body) schema.body = body
    if (params) schema.params = params
    return schema
}

module.exports = createSchema