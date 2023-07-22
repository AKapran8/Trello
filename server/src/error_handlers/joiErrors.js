const { ValidationError } = require("joi")


/**
 * 
 * @param {Error} err 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {*} next 
 */
const joiValidationErrorHandler = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        res.statusCode = 400
        res.json({ errors: err.details.map(error => error.message.replaceAll('"', '')) },)
    } else {
        next(err)
    }
}

module.exports = { joiValidationErrorHandler }