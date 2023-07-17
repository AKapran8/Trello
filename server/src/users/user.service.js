const { PrismaClient } = require('@prisma/client')
const userDb = new PrismaClient().user
const crypto = require('crypto');


const createUser = async ({ email, password, username }) => {
    try {
        const hashedPass = crypto.createHash('sha256').update(password).digest('base64')
        const newUser = await userDb.create({ data: { email, username, password: hashedPass } })
        return newUser
    } catch (error) {
        console.error(error)
        throw error
    }
}

const login = async ({ email, password }) => {
    try {
        const findedUser = await userDb.findUnique({ where: { email } })
        if (findedUser === null) throw new Error('Wrong credentials')
        const hashedPass = crypto.createHash('sha256').update(password).digest('base64')
        if (findedUser.password !== hashedPass) throw new Error('Wrong credentials')
        return findedUser
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = { login, createUser }