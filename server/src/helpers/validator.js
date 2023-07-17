const Joi = require("joi");

const options = { abortEarly: false, stripUnknown: { objects: true }, convert: true }

/**
 * 
 * @param {Object} config
 * @param {Joi.ObjectSchema} config.params
 * @param {Joi.ObjectSchema} config.body
 * 
 */
const requestValidator = ({ params, body }) => async (req, res, next) => {
    try {
        if (body) {
            const result = await body.validateAsync(req.body, options)
            req.body = result
        }
        if (params) {
            const result = await params.validateAsync(req.params, options)
            res.locals.params = result
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = { requestValidator }