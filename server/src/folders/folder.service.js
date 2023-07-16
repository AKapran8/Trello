const { PrismaClient } = require('@prisma/client')
const folderDb = new PrismaClient().folder

const createFolder = async ({ tableId, title }) => {
    try {
        const newFolder = await folderDb.create({ data: { tableId, title, position: 0 } })
        // TODO position fix
        return newFolder
    } catch (error) {
        console.error(error)
        throw error
    }
}

const deleteFolder = async ({ folderId }) => {
    try {
        console.log(Number(folderId))
        await folderDb.delete({ where: { id: Number(folderId) } })
        return true
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = { createFolder, deleteFolder }
