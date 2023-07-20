const createSchema = require("../helpers/schemaBuilder");
const { baseRequiredString, baseRequiredInt } = require("../helpers/joi");
const Joi = require("joi");

const paramsFolderIdSchema = createSchema({ params: Joi.object({ folderId: baseRequiredInt }) })
const createFolderSchema = createSchema({ body: Joi.object({ title: baseRequiredString }) })

module.exports = { paramsFolderIdSchema, createFolderSchema }