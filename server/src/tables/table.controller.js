const tableController = require('express').Router({ mergeParams: true });
const tableService = require('./table.service');
const { userHaveAccesToTable } = require('../middlewares/isUserHaveAccesToTable');
const { requestValidator } = require('../helpers/validator');
const { createTableSchema, paramsTableIdSchema } = require('./table.schemas');

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


tableController.post('/', requestValidator(createTableSchema), async (req, res, next) => {
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

tableController.route('/:tableId').all(requestValidator(paramsTableIdSchema), userHaveAccesToTable).get(requestValidator(''), async (req, res, next) => {
    try {
        const { tableId } = res.locals.params
        const table = await tableService.getTableDataById(tableId)
        res.json({ table })
    } catch (error) {
        console.error(error);
        next(error)
    }
}).delete(async (req, res, next) => {
    try {
        const { tableId } = res.locals.params
        await tableService.deleteTable(tableId)
        res.json({ status: true })
    } catch (error) {
        console.error(error)
        next(error)
    }
})

module.exports = { tableController }