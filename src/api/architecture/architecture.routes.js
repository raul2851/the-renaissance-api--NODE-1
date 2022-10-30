const express = require("express");
const Architecture = require("./architecture.model");
const upload = require("../middlewares/file");
const { deleteFile } = require("../../api/middlewares/deleteFile");
const { isAuth, isAdmin } = require("../../api/middlewares/auth");
const router = express.Router();
require("dotenv").config();

router.get("/", async (req, res, next) => {
  try {
    const allArchitectures = await Architecture.find().lean();
    return res.status(200).json(allArchitectures);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", [isAuth], async (req, res, next) => {
  try {
    const id = req.params.id;
    const architectureToFind = await Architecture.findById(id);
    return res.status(200).json(architectureToFind);
  } catch (error) {
    return next(error);
  }
});
router.get('/getbyname/:name', async (req, res, next) => {
  try {
    const name = req.params.name;
    const architectureToFind = await Architecture.findOne({name: name});
    return res.status(200).json(architectureToFind);
  } catch (error) {
    return next(error);
  }
});

router.post("/create", upload.single("img"), async (req, res) => {
  try {
    const architecture = req.body;
    if (req.file) {
      architecture.img = req.file.path;
    }
    const newArchitecute = new Architecture(architecture);
    const architectureCreated = await newArchitecute.save();
    return res.status(200).json(architectureCreated);
  } catch (error) {
    return res
      .status(500)
      .json("Error al crear la nueva arquitectura, con esos planos se iba caer");
  }
});

router.put("/edit/:id", upload.single("img"), async (req, res, next) => {
  try {
    const id = req.params.id;
    const architecture = req.body;
    const architectureToEdit = await Architecture.findById(id);
    if (req.file) {
      if (architectureToEdit.img) {
        deleteFile(architectureToEdit.img);
      }
      architecture.img = req.file.path;
    }
    const architectureModification = new Architecture(architecture);
    architectureModification._id = id;
    const architectureModificated = await Architecture.findByIdAndUpdate(
      id,
      architectureModification
    );
    return res.status(200).json({
      mensaje: "Se ha conseguido editar la arquitectura,¡la próxima hazlo bien desde el principio!",
      architectureModificated: architectureModificated,
    });
  } catch (error) {
    return next(error);
  }
});

router.delete("/delete/:id", [isAdmin], async (req, res) => {
  try {
    const id = req.params.id;
    const architectureToDelete = await Architecture.findByIdAndDelete(id);
    return res.status(200).json("Se ha conseguido borrar la arquitectura");
  } catch (error) {
    return res.status(500).json("Error al borrar la arquitectura, ¿entonces para qué la añadiste?");
  }
});

module.exports = router;
