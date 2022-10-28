const express = require('express');
const indexRoutes = require('./src/api/index/index.routes');
const paintingsRoutes = require('./src/api/painting/painting.routes')
const sculpturesRoutes = require('./src/api/scuplture/sculpture.routes')
const architecturesRoutes = require('./src/api/architecture/architecture.routes')
const db = require('./src/utils/database/db')
require('dotenv').config()

db.connectDb();

const PORT = 3000;
const server = express()


server.use(express.json({limit: "5mb"}));
server.use(express.urlencoded({ extended: false }));


server.use('/', indexRoutes)
server.use('/paintings', paintingsRoutes)
server.use('/sculptures', sculpturesRoutes)
server.use('/architectures', architecturesRoutes)
server.listen(PORT, () => {
    console.log(`Server running a todo gas en http://localhost:${PORT}`);
})