const http = require('node:http');

const server = http.createServer((req, res) => {
    res.end('end')
})

server.listen(process.env.API_PORT, () => console.log(`server started on port: ${process.env.API_PORT}`))