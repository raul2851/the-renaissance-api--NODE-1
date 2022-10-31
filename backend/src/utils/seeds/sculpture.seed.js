const mongoose = require("mongoose");
const Sculpture = require("../../api/sculpture/sculpture.model");
require("dotenv").config();

const sculptures = [
  {
    name: "María Magdale Penitente",
    sculptor: "Donatello",
    year: 1453,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667067011/sculptures-assets-node/1200px-Donatello__maria_maddalena_03_kwaygt.jpg",
    location: "Museo dell'Opera del Duomo, Florencia",
  },
  {
    name: "David",
    sculptor: "Miguel Ángel Buonarroti",
    year: 1504,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667067012/sculptures-assets-node/david_de_miguel_angel_njz9di.png",
    location: "Galería de la Academia, Florencia",
  },
  {
    name: "Apolo y Dafne",
    sculptor: "Gian Lorenzo Bernini",
    year: 1625,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667067013/sculptures-assets-node/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbSI6WyJcL2FydHdvcmtcL2ltYWdlRmlsZVwvYXBvbGxvLWRhcGhuZS1zZXB0ZW1iZXItMmEuanBnIiwicmVzaXplLDIwMDAsMjAwMCJdfQ.RRGdLkJVnSKISeYxxbRp33Ek2bSNydVSe4rxVSlDNLU_uw6ykp.png",
    location: "Galería Borghese, Roma",
  },
 
  {
    name: "El Rapto de Proserpina",
    sculptor: "Gian Lorenzo Bernini",
    year: 1622,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667067011/sculptures-assets-node/1200px-The_Rape_of_Proserpina__Rome_x3g70f.jpg",
    location: "Galería Borghese, Roma",
  },
  {
    name: "David",
    sculptor: "Donatello",
    year: 1440,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667067011/sculptures-assets-node/800px-Donatello_-_David_-_Florenc%CC%A7a_vwc2kl.jpg",
    location: "Museo Nacional de Bargello, Florencia",
  },
  {
    name: "Lorenzo de Medici",
    sculptor: "Andrea del Verrocchio",
    year: 1440,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667067011/sculptures-assets-node/Andrea-Del-Verrocchio-Lorenzo-de-Medici-2-_qdposa.jpg",
    location: "Basílica de San Lorenzo, Florencia",
  },
  {
    name: "Perseo",
    sculptor: "Cellini",
    year: 1554,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667067012/sculptures-assets-node/Persee-florence_vgtflt.jpg",
    location: "Plaza de la Señoría, Italia",
  },
  {
    name: "Las Cuatro Estaciones",
    sculptor: "Jean Goujon",
    year: 1547,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667067011/sculptures-assets-node/Carnavalet_Jahreszeiten_tmgvzh.jpg",
    location: "Museo Carnavalet, París",
  },
  {
    name: "San Jerónimo",
    sculptor: "Pietro Torrigiano",
    year: 1525,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Sevilla2005July_097.jpg/800px-Sevilla2005July_097.jpg",
    location: "Museo de Bellas Artes, Sevilla",
  },
  {
    name: "Judit",
    sculptor: "Conrad Meit",
    year: 1551,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667067011/sculptures-assets-node/Conrat_Meit_l94mwl.jpg",
    location: "Catedral de San Miguel y Santa Gudul, Bruselas"
  },
  {
    name: "San Bartolomé",
    sculptor: "Jacques du Broeuq",
    year: 1540,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667067014/sculptures-assets-node/Jacques_Du_Br%C5%93ucq_-_Saint_Barthe%CC%81le%CC%81my_w05cuf.jpg",
    location: "Colegiata de Sainte-W",
  },
  {
    name: "Madona",
    sculptor: "Miguel Angel",
    year: 1501,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667067011/sculptures-assets-node/ARE33_onwioz.jpg",
    location: "Iglesia de Nuestra Señora, Brujas",
  },
];

mongoose
  .connect(process.env.DB_URL)
  .then(async () => {
    const allSculptures = await Sculpture.find().lean();

    if (!allSculptures.length) {
      console.log("[seed]: No estoy encontrando las esculturas ... ");
    } else {
      console.log(`[seed]: Encontradas ${allSculptures.length} esculturass.`);
      await Sculpture.collection.drop();
      console.log("[seed]: Colección Sculptures eliminada correctamente");
    }
  })
  .catch((error) => console.log("[seed]: Error eliminando la colección -->", error))
  .then(async () => {
    await Sculpture.insertMany(sculptures);
    console.log("[seed]: Nuevas esculturas añadidas con éxito");
  })
  .catch((error) => console.log("[seed]: Error añadiendo las esculturas", error))
  .finally(() => mongoose.disconnect());
