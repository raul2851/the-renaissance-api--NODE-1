const express = require("express");
const Painting = require("./painting.model");
const upload = require("../middlewares/file");
const { deleteFile } = require("../../api/middlewares/deleteFile");
const { isAuth, isAdmin } = require("../../api/middlewares/auth");
const router = express.Router();
require("dotenv").config();

router.get("/", async (req, res, next) => {
  try {
    const allPaintings = await Painting.find().lean();
    return res.status(200).json(allPaintings);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", [isAuth], async (req, res, next) => {
  try {
    const id = req.params.id;
    const paintingToFind = await Painting.findById(id);
    return res.status(200).json(paintingToFind);
  } catch (error) {
    return next(error);
  }
});

router.post("/create", [isAuth], upload.single("img"), async (req, res) => {
  try {
    const painting = req.body;
    if (req.file) {
      painting.img = req.file.path;
    }
    const newPainting = new Painting(painting);
    const paintingCreated = await newPainting.save();
    return res.status(200).json(paintingCreated);
  } catch (error) {
    return res
      .status(500)
      .json("Error al crear la nueva obra, nunca vas a llegar a ser maestro del pincel");
  }
});

router.put("/edit/:id", [isAuth], upload.single("img"), async (req, res) => {
  try {
    const id = req.params.id;
    const painting = req.body;
    const paintingToEdit = await Painting.findById(id);
    if (req.file) {
      if (paintingToEdit.img) {
        deleteFile(paintingToEdit.img);
      }
      painting.img = req.file.path;
    }
    const paintingModification = new Painting(painting);
    paintingModification._id = id;
    const paintingModificated = await Painting.findByIdAndUpdate(id, paintingModification);
    return res.status(200).json({
      mensaje: "Se ha conseguido editar la obra, por esta vez te lo paso",
      paingtingModificated: paintingModificated,
    });
  } catch (error) {
    return res.status(500).json("Error al editar la obra... igual está bien como está ¿no?");
  }
});

router.delete("/delete/:id", [isAdmin], async (req, res) => {
  try {
    const id = req.params.id;
    const paintingToDelete = await Painting.findByIdAndDelete(id);
    return res
      .status(200)
      .json(
        "Se ha conseguido borrar la obra, si sigues borrando cosas, te hundiras en el olvido medieval"
      );
  } catch (error) {
    return res.status(500).json("Error al borrar la obra, ¿ni siquiera esto haces bien?");
  }
});

module.exports = router;
