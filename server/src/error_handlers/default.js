const defaultHandler = (err, req, res, next) => {
    console.error('LAST HANDLER ERROR')
    res.statusCode = 400
    res.send(err.message)
}

module.exports = defaultHandler
