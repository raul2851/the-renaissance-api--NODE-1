const mongoose = require("mongoose");
const Sculpture = require("../../api/scuplture/sculpture.model");
require("dotenv").config();

const sculptures = [
  {
    name: "María Magdale Penitente",
    sculptor: "Donatell",
    year: 1453,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Donatello%2C_maria_maddalena_03.JPG/1200px-Donatello%2C_maria_maddalena_03.JPG",
    location: "Museo dell'Opera del Duomo, Florencia",
  },
  {
    name: "David",
    sculptor: "Miguel Ángel Buonarroti",
    year: 1504,
    img: "https://cdn.culturagenial.com/es/imagenes/david-by-michelangelo-fir-jbu004-cke.jpg",
    location: "Galería de la Academia, Florencia",
  },
  {
    name: "Apolo y Dafne",
    sculptor: "Gian Lorenzo Bernini",
    year: 1625,
    img: "https://historia-arte.com/_/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbSI6WyJcL2FydHdvcmtcL2ltYWdlRmlsZVwvYXBvbGxvLWRhcGhuZS1zZXB0ZW1iZXItMmEuanBnIiwicmVzaXplLDIwMDAsMjAwMCJdfQ.RRGdLkJVnSKISeYxxbRp33Ek2bSNydVSe4rxVSlDNLU.jpg",
    location: "Galería Borghese, Roma",
  },
 
  {
    name: "El Rapto de Proserpina",
    sculptor: "Gian Lorenzo Bernini",
    year: 1622,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/The_Rape_of_Proserpina_%28Rome%29.jpg/1200px-The_Rape_of_Proserpina_%28Rome%29.jpg",
    location: "Galería Borghese, Roma",
  },
  {
    name: "David",
    sculptor: "Donatello",
    year: 1440,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Donatello_-_David_-_Floren%C3%A7a.jpg/800px-Donatello_-_David_-_Floren%C3%A7a.jpg",
    location: "Museo Nacional de Bargello, Florencia",
  },
  {
    name: "Lorenzo de Medici",
    sculptor: "Andrea del Verrocchio",
    year: 1440,
    img: "https://img.wikioo.org/ADC/Art.nsf/O/8Y3LEY/$File/Andrea-Del-Verrocchio-Lorenzo-de-Medici-2-.JPG",
    location: "Basílica de San Lorenzo, Florencia",
  },
  {
    name: "Perseo",
    sculptor: "Cellini",
    year: 1554,
    img: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Persee-florence.jpg",
    location: "Plaza de la Señoría, Italia",
  },
  {
    name: "Las Cuatro Estaciones",
    sculptor: "Jean Goujon",
    year: 1547,
    img: "https://upload.wikimedia.org/wikipedia/commons/3/32/Carnavalet_Jahreszeiten.jpg",
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
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Conrat_Meit.jpg/320px-Conrat_Meit.jpg",
    location: "Catedral de San Miguel y Santa Gudul, Bruselas",
  },
  {
    name: "San Bartolomé",
    sculptor: "Jacques du Broeuq",
    year: 1540,
    img: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Jacques_Du_Br%C5%93ucq_-_Saint_Barth%C3%A9l%C3%A9my.JPG",
    location: "Colegiata de Sainte-W",
  },
  {
    name: "Madona",
    sculptor: "Miguel Angel",
    year: 1501,
    img: "https://1.bp.blogspot.com/-FUPWTAm7jyA/YJkWnGz_nhI/AAAAAAAAJqI/5cxV8XUgSog3QD4kM7YCrSoJmhzMZgq6ACLcBGAsYHQ/s674/ARE33.jpg",
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
