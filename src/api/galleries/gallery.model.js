const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gallerySchema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    paintings: [{ type: mongoose.Types.ObjectId, ref: "paintings" }],
    sculptures: [{ type: mongoose.Types.ObjectId, ref: "sculptures" }],
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model("galleries", gallerySchema);
module.exports = Gallery;
