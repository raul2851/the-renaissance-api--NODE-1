const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paintingSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    painter: { type: String, required: true, trim: true },
    year: { type: Number, required: false, trim: true },
    img: {
      type: String,
      required: true,
      default: "https://i.pinimg.com/736x/4d/58/23/4d582369ccb842fd09dd96a9258e79bd.jpg",
    },
    location: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);
const Painting = mongoose.model("paintings", paintingSchema);
module.exports = Painting;
