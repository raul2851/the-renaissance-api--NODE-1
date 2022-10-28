const express = require('express');
const Painting = require('./painting.model');
const router = express.Router();
require('dotenv').config()

router.get('/', async (req, res,) =>{
    try {
        const allPaintings = await Painting.find().lean();
        return res.status(200).json(allPaintings);
        
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports = router;