const express = require("express");
const indexRoutes = require("./src/api/index/index.routes");
const galleriesRoutes = require("./src/api/galleries/gallery.routes");
const paintingsRoutes = require("./src/api/painting/painting.routes");
const sculpturesRoutes = require("./src/api/sculpture/sculpture.routes");
const architecturesRoutes = require("./src/api/architecture/architecture.routes");
const userRouter = require("./src/api/users/user.routes");
const db = require("./src/utils/database/db");
const cors = require('cors');
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

db.connectDb();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const PORT = 3000;
const server = express();

server.use(cors({
    origin: "*",
    credentials: true
}))

server.use(express.json({ limit: "5mb" }));
server.use(express.urlencoded({ extended: false }));

server.use("/", indexRoutes);
server.use("/gallery", galleriesRoutes);
server.use("/paintings", paintingsRoutes);
server.use("/sculptures", sculpturesRoutes);
server.use("/architectures", architecturesRoutes);
server.use("/users", userRouter);
server.use((error, req, res, next) => {
  return res.status(error.status || 500).json(error.message || "Unexpected error");
});

server.listen(PORT, () => {
  console.log(`Server running a todo gas en http://localhost:${PORT}`);
});
