const express = require('express')
const session = require('express-session')
const { apiRouter } = require('./router')
const server = express()

server.use(session({
    secret: 'SECRET_SESSION_KEY',
    resave: true,
    saveUninitialized: false,
    cookie: { sameSite: 'strict', maxAge: 1000 * 60 * 24 * 7 }
}))

server.use(express.json())


server.use("/api", apiRouter)

server.use((err, req, res, next) => {
    res.statusCode = 400
    res.send(err.message)
})

module.exports = { server }