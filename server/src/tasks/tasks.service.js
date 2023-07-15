const { PrismaClient } = require('@prisma/client')
const tasksDb = new PrismaClient().task

const createTask = async ({ userId, folderId, title, description }) => {
    try {
        const newTask = await tasksDb.create({ data: { folderId: Number(folderId), title, description, position: 0, authorId: Number(userId) } })
        return newTask
    } catch (error) {
        console.error(error)
        throw error
    }
}

const deleteTask = async ({ id }) => {
    try {
        await tasksDb.delete({ where: { id: Number(id) } })
        return true
    } catch (error) {
        throw new Error('Task not found')
    }
}

module.exports = { deleteTask, createTask }