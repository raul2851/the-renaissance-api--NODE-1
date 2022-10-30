const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json("SERVIDOR OK, BIENVENIDXS A NUESTRA GALERÍA RENACENTISTA");
});

module.exports = router;
