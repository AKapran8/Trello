const defaultHandler = require("./default");
const { joiValidationErrorHandler } = require("./joiErrors");

const errorHandlers = [
    joiValidationErrorHandler
]


errorHandlers.push(defaultHandler)

module.exports = { errorHandlers }