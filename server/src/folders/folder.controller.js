const folderController = require('express').Router({ mergeParams: true });
const { requestValidator } = require('../helpers/validator');
const { paramsFolderIdSchema, createFolderSchema } = require('./folder.schemas');
const folderService = require("./folder.service");

folderController.delete('/:folderId', requestValidator(paramsFolderIdSchema), async (req, res, next) => {
    try {
        const { folderId } = res.locals.params
        res.json({ status: await folderService.deleteFolder({ folderId }) })
    } catch (error) {
        next(error)
    }
})
folderController.post('/', requestValidator(createFolderSchema), async (req, res, next) => {
    try {
        const { title } = req.body
        const { tableId } = res.locals.params
        const newFolder = await folderService.createFolder({ tableId, title })
        res.json({ folder: newFolder })
    } catch (error) {
        next(error)
    }
})

module.exports = { folderController }