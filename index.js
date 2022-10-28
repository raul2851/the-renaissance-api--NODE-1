const express = require('express');
const server = express()
const router = express.Router();
require('dotenv').config()

const PORT = 3000;

server.use('/', router)
server.listen(PORT, () => {
    console.log(`Server running a todo gas en http://localhost${PORT}`);
})