const express = require("express");
const Sculpture = require("./sculpture.model");
const upload = require("../middlewares/file");
const router = express.Router();
const { deleteFile } = require("../../api/middlewares/deleteFile");
const { isAuth, isAdmin } = require("../../api/middlewares/auth");
require("dotenv").config();

router.get("/", async (req, res, next) => {
  try {
    const allSculptures = await Sculpture.find().lean();
    return res.status(200).json(allSculptures);
  } catch (error) {
    return next(error);
  }
});
router.get("/:id", [isAuth], async (req, res, next) => {
  try {
    const id = req.params.id;
    const sculptureToFind = await Sculpture.findById(id);
    return res.status(200).json(sculptureToFind);
  } catch (error) {
    return next(error);
  }
});

router.post("/create", upload.single("img"), async (req, res) => {
  try {
    const sculpture = req.body;
    if (req.file) {
      sculpture.img = req.file.path;
    }
    const newSculptures = new Sculpture(sculpture);
    const sculptureCreated = await newSculptures.save();
    return res.status(200).json(sculptureCreated);
  } catch (error) {
    return res
      .status(500)
      .json("Error al crear la nueva escultura, Miguel Angel con 5 años ya dominaba esta técnica");
  }
});

router.put("/edit/:id", [isAuth], upload.single("img"), async (req, res) => {
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
    const sculptureModificated = await Sculpture.findByIdAndUpdate(id, sculptureModification);
    return res.status(200).json({
      mensaje: "Se ha conseguido editar la escultura, menos mal que aún no habíamos inagurado",
      sculptureModificated: sculptureModificated,
    });
  } catch (error) {
    return res.status(500).json("Error al editar la escultura, tu no eres digno");
  }
});

router.delete("/delete/:id", [isAdmin], async (req, res) => {
  try {
    const id = req.params.id;
    const sculptureToDelete = await Sculpture.findByIdAndDelete(id);
    return res
      .status(200)
      .json(
        "Se ha conseguido borrar la escultura, y nos ha costado mucho trabajo. Al Toro de Falaris por mareante."
      );
  } catch (error) {
    return res.status(500).json("Error al borrar la escultura, ¿no ves que es de mármol?");
  }
});

module.exports = router;
