const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const architectureSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    architect: { type: String, required: true, trim: true },
    year: { type: Number, required: false, trim: true },
    img: {
      type: String,
      required: true,
      default:
        "https://img.asmedia.epimg.net/resizer/oUNb0wBYIO50WPygBt42dRkApvc=/1952x1098/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/OEP5YPD7MFO5VI6QSNFGHKNQZQ.jpg",
    },
    location: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);
const Architecture = mongoose.model("architectures", architectureSchema);
module.exports = Architecture;
