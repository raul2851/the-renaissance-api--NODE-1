const express = require('express');
const Architecture = require('./architecture.model');
const router = express.Router();
require('dotenv').config()

router.get('/', async (req, res,) =>{
    try {
        const allArchitectures = await Architecture.find().lean();
        return res.status(200).json(allArchitectures);
        
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports = router;