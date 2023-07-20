const { isUserHaveAccessToTable } = require("../tables/table.service")


const userHaveAccesToTable = async (req, res, next) => {
    try {
        const userId = req.session.user.id
        const tableId = res.locals.params.tableId
        const access = await isUserHaveAccessToTable(userId, tableId)
        if (!access) return next(new Error("Don't have access"))
        return next()
    } catch (error) {
        next(error)
    }
}

module.exports = { userHaveAccesToTable }