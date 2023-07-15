const tableController = require('express').Router({ mergeParams: true });
const tableService = require('./table.service');
const { userHaveAccesToTable } = require('../middlewares/isUserHaveAccesToTable');

tableController.get('/', async (req, res, next) => {
    try {
        const userId = req.session.user.id
        const tables = await tableService.getAllTablesByUserId(userId)
        res.json({ tables })
    } catch (error) {
        console.error(error);
        next(error)
    }
})


tableController.post('/', async (req, res, next) => {
    try {
        const { body } = req
        const userId = req.session.user.id
        const newTable = await tableService.createTable(userId, body.title, body.description)
        res.json({ table: newTable })
    } catch (error) {
        console.error(error);
        next(error)
    }
})

tableController.route('/:tableId').all(userHaveAccesToTable).get(async (req, res, next) => {
    try {
        const { tableId } = req.params
        const table = await tableService.getTableDataById(tableId)
        res.json({ table })
    } catch (error) {
        console.error(error);
        next(error)
    }
}).delete(async (req, res, next) => {
    try {
        const { tableId } = req.params
        await tableService.deleteTable(tableId)
        res.json({ status: true })
    } catch (error) {
        console.error(error)
        next(error)
    }
})

module.exports = { tableController }