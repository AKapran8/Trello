const { server } = require("./server");

const PORT = process.env.API_PORT || 3000

server.listen(PORT, async () => {
    console.log('Server started on port:', PORT)
})