const { PrismaClient } = require('@prisma/client')
const tableDb = new PrismaClient().table

const createTable = async (adminId, title, description) => {
    try {
        const newTable = await tableDb.create({ data: { adminId, title, description } })
        return newTable
    } catch (error) {
        console.error(error)
        throw error
    }
}

const isUserHaveAccessToTable = async (userId, tableId) => {
    try {
        const table = await getTableById(tableId)
        return table.adminId === userId
        // TODO add check on user list
    } catch (error) {
        console.error(error)
        throw error
    }
}

const getAllTablesByUserId = async (userId) => {
    try {
        const tables = await tableDb.findMany({ where: { adminId: userId } })//add or with userId in users
        return tables
    } catch (error) {
        console.error(error)
        throw error
    }
}

const getTableById = async (tableId) => {
    try {
        const table = await tableDb.findUnique({ where: { id: Number(tableId) } })
        if (table === null) throw new Error('Table not found')
        return table
    } catch (error) {
        console.error(error)
        throw error
    }
}

const getTableDataById = async (tableId) => {
    try {
        const tableData = await tableDb.findUnique({
            where: { id: Number(tableId) },
            include: {
                Folders: {
                    select: {
                        id: true, position: true, title: true, Tasks: {
                            select: { id: true, position: true, title: true }
                        }
                    }
                }
            }
        })
        return tableData
    } catch (error) {
        console.error(error)
        throw error
    }
}

const deleteTable = async (tableId) => {
    try {
        await tableDb.delete({ where: { id: Number(tableId) } })
        return true
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = { getAllTablesByUserId, getTableDataById, createTable, isUserHaveAccessToTable, getTableById, deleteTable }