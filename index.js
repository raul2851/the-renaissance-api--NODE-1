const express = require('express');
const paintingsRoutes = require('./src/api/painting/painting.routes')
const db = require('./src/utils/database/db')
require('dotenv').config()

db.connectDb();

const PORT = 3000;
const server = express()


server.use(express.json({limit: "5mb"}));
server.use(express.urlencoded({ extended: false }));

server.use('/', paintingsRoutes)
server.listen(PORT, () => {
    console.log(`Server running a todo gas en http://localhost:${PORT}`);
})