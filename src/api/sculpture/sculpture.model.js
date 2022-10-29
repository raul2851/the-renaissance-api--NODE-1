const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sculptureSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    sculptor: { type: String, required: true, trim: true },
    year: { type: Number, required: false, trim: true },
    img: {
      type: String,
      required: true,
      default:
        "https://www.ikea.com/images/a-brown-ikea-bag-with-the-word-sculpture-written-on-it-sits--85dc3c7bbe21ed43ccc061424287588f.jpg",
    },
    location: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);
const Sculpture = mongoose.model("sculptures", sculptureSchema);
module.exports = Sculpture;
