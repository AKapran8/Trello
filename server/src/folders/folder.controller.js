const folderController = require('express').Router({ mergeParams: true });
const folderService = require("./folder.service");

folderController.delete('/:folderId', async (req, res, next) => {
    try {
        const { folderId } = req.params
        console.log(req.params)
        res.json({ status: await folderService.deleteFolder({ folderId }) })
    } catch (error) {
        console.error(error)
        throw error
    }
})
folderController.post('/', async (req, res, next) => {
    try {
        const { params: { tableId }, body: { title } } = req
        const newFolder = await folderService.createFolder({ tableId: Number(tableId), title })
        res.json({ folder: newFolder })
    } catch (error) {
        console.error(error)
        throw error
    }
})

module.exports = { folderController }