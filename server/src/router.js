const express = require('express');
const { userController } = require('./users/user.controller');
const { tableController } = require('./tables/table.controller');
const { folderController } = require('./folders/folder.controller');
const { isAuth } = require('./middlewares/isAuth');
const { tasksController } = require('./tasks/tasks.controller');
const { userHaveAccesToTable } = require('./middlewares/isUserHaveAccesToTable');
const apiRouter = express.Router({ mergeParams: true })

apiRouter.use('/auth', userController)

apiRouter.use(isAuth)
apiRouter.use('/table', tableController)
apiRouter.use('/table/:tableId/folder', userHaveAccesToTable, folderController)
apiRouter.use('/table/:tableId/folder/:folderId/task', userHaveAccesToTable, tasksController)

module.exports = { apiRouter }