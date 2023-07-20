const userController = require('express').Router({ mergeParams: true });
const { loginSchema, registerSchema } = require('./user.schemas');
const userService = require('./user.service');
const { requestValidator } = require('../helpers/validator')

userController.post('/login', requestValidator(loginSchema), async (req, res, next) => {
    try {
        const user = await userService.login(req.body)
        req.session.user = user
        res.json({ email: user.email, id: user.id })
    } catch (error) {
        next(error)
    }
})

userController.post('/register', requestValidator(registerSchema), async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body)
        req.session.user = user
        res.json({ email: user.email, id: user.id })
    } catch (error) {
        next(error)
    }
})

userController.post('/logout', async (req, res, next) => {
    try {
        req.session.destroy()
        res.send('ok')
    } catch (error) {
        next(error)
    }
})

module.exports = { userController }