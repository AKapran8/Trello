const isAuth = async (req, res, next) => {
    if (!req.session.user) return next(new Error('Not authorized'))
    next()
}


module.exports = { isAuth }