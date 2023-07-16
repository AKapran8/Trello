const tasksController = require('express').Router({ mergeParams: true });
const tasksService = require('./tasks.service');

tasksController.delete('/:taskId', async (req, res, next) => {
    try {
        const { taskId } = req.params
        const deletedTask = await tasksService.deleteTask({ id: taskId })
        res.json({ status: deletedTask })
    } catch (error) {
        console.error(error)
        next(error)
    }
})

tasksController.post('/', async (req, res, next) => {
    try {
        const { body, params: { folderId }, session: { user } } = req
        const newTask = await tasksService.createTask({ folderId, description: body.description, title: body.title, userId: user.id })
        res.json({ task: newTask })
    } catch (error) {
        console.error(error)
        next(error)
    }
})

module.exports = { tasksController }