const isAuth = async (req, res, next) => {
    if (!req.session.user) return next(new Error('Not authorized'))
    res.locals.userId = req.session.user.id
    next()
}


module.exports = { isAuth }