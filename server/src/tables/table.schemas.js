const createSchema = require('../helpers/schemaBuilder');
const { baseRequiredString, baseRequiredInt } = require('../helpers/joi');
const Joi = require('joi');

const createTableSchema = createSchema({
    body: Joi.object({
        title: baseRequiredString,
        description: baseRequiredString
    })
})

const paramsTableIdSchema = createSchema({ params: Joi.object({ tableId: baseRequiredInt }) })

module.exports = { createTableSchema, paramsTableIdSchema }