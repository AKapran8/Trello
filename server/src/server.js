const express = require('express')
const session = require('express-session')
const cors = require('cors')
const { apiRouter } = require('./router')
const { errorHandlers } = require('./error_handlers/handlerRouter')
const server = express()

server.use(session({
    secret: 'SECRET_SESSION_KEY',
    resave: true,
    saveUninitialized: false,
    cookie: { sameSite: 'strict', maxAge: 1000 * 60 * 24 * 7 }
}))

server.use(cors({ origin: `http://localhost:${process.env.CLIENT_PORT}`, credentials: true }))

server.use(express.json())

server.use("/api", apiRouter)

server.use(...errorHandlers)


module.exports = { server }