const tasksController = require('express').Router({ mergeParams: true });
const { requestValidator } = require('../helpers/validator');
const { createTaskSchema, paramsTaskIdSchema } = require('./task.schemas');
const tasksService = require('./tasks.service');

tasksController.delete('/:taskId', requestValidator(paramsTaskIdSchema), async (req, res, next) => {
    try {
        const { taskId } = res.locals.params
        const deletedTask = await tasksService.deleteTask({ id: taskId })
        res.json({ status: deletedTask })
    } catch (error) {
        console.error(error)
        next(error)
    }
})

tasksController.post('/', requestValidator(createTaskSchema), async (req, res, next) => {
    try {
        const { body } = req
        const { userId, params: { folderId } } = res.locals
        const newTask = await tasksService.createTask({ folderId, userId, ...body })
        res.json({ task: newTask })
    } catch (error) {
        console.error(error)
        next(error)
    }
})

module.exports = { tasksController }