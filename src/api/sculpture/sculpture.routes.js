const express = require('express');
const Sculpture = require('./sculpture.model');
const router = express.Router();
require('dotenv').config()

router.get('/', async (req, res,) =>{
    try {
        const allSculptures = await Sculpture.find().lean();
        return res.status(200).json(allSculptures);
        
    } catch (error) {
        return res.status(500).json(error)
    }
})
router.get("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const sculptureToFind = await Sculpture.findById(id);
      return res.status(200).json(sculptureToFind);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
  
  router.post("/create", async (req, res) => {
    try {
      const sculpture = req.body;
      if (req.file) {
        sculpture.img = req.file.path;
      }
      const newSculptures = new Sculpture(sculpture);
      const sculptureCreated = await newSculptures.save();
      return res.status(201).json(sculptureCreated);
    } catch (error) {
      return res.status(500).json("Error al crear la nueva escultura");
    }
  });
  
  router.put("/edit/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const sculpture = req.body;
      const sculptureToEdit = await Sculpture.findById(id);
      if (req.file) {
        if (sculptureToEdit.img) {
          deleteFile(sculptureToEdit.img);
        }
        sculpture.img = req.file.path;
      }
      const sculptureModification = new Sculpture(sculpture);
      sculptureModification._id = id;
      const sculptureModificated = await Sculpture.findByIdAndUpdate(
        id,
        sculptureModification
      );
      return res
        .status(200)
        .json({
          mensaje: "Se ha conseguido editar la escultura",
          sculptureModificated: sculptureModificated,
        });
    } catch (error) {
      return res.status(500).json("Error al editar la escultura");
    }
  });
  
  router.delete("/delete/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const sculptureToDelete = await Sculpture.findByIdAndDelete(id);
      return res.status(200).json("Se ha conseguido borrar la escultura");
    } catch (error) {
      return res.status(500).json("Error al borrar la escultura");
    }
  });
  

module.exports = router;