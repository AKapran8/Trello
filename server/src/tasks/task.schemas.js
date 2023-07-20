const Joi = require("joi");
const { baseRequiredInt, baseRequiredString } = require("../helpers/joi");
const createSchema = require("../helpers/schemaBuilder");

const paramsTaskIdSchema = createSchema({ params: Joi.object({ taskId: baseRequiredInt }) })

const createTaskSchema = createSchema({ body: Joi.object({ title: baseRequiredString, description: baseRequiredString }) })

module.exports = { paramsTaskIdSchema, createTaskSchema }