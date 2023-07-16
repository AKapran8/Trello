const userController = require('express').Router({ mergeParams: true });
const userService = require('./user.service');

userController.post('/login', async (req, res, next) => {
    try {
        const { body: { email, password } } = req
        const user = await userService.login(email, password)
        req.session.user = user
        res.json({ email: user.email, id: user.id })
    } catch (error) {
        console.error(error)
        next(error)
    }
})

userController.post('/register', async (req, res, next) => {
    try {
        const { body: { email, password } } = req
        const user = await userService.createUser(email, password)
        req.session.user = user
        res.json({ email: user.email, id: user.id })
    } catch (error) {
        console.error(error)
        next(error)
    }
})

userController.post('/logout', async (req, res, next) => {
    try {
        req.session.destroy()
        res.send('ok')
    } catch (error) {
        console.error(error)
        next(error)
    }
})

module.exports = { userController }