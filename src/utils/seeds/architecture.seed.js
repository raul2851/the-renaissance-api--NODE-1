const mongoose = require("mongoose");
const Architecture = require("../../api/architecture/architecture.model");
require("dotenv").config();

const architectures = [
  {
    name: "Palacio Medici Riccardi",
    architect: "Michelozzo di Bartolomeo",
    year: 1460,
    img: "https://destinoinfinito.com/wp-content/uploads/2014/06/Michelozzo-di-Bartolomeo.jpg",
    location: "Florencia, Italia",
  },

  {
    name: "Spedale degli Innocenti",
    architect: "Filippo Brunelleschi",
    year: 1445,
    img: "https://destinoinfinito.com/wp-content/uploads/2014/06/Spedale-degli-Innocenti.jpg",
    location: "Florencia, Italia",
  },

  {
    name: "Convento De San Esteban",
    architect: "Juan de Álava y RG de Hontañón",
    year: 1610,
    img: "https://destinoinfinito.com/wp-content/uploads/2014/06/Convento-De-San-Esteban.jpg",
    location: "Salamanca, España",
  },

  {
    name: "Catedral del Arcángel Miguel",
    architect: "Aleviz Fryazin Noviy",
    year: 1508,
    img: "https://destinoinfinito.com/wp-content/uploads/2014/06/Catedral-del-Arc%C3%A1ngel.jpg",
    location: "Moscú, Rusia",
  },

  {
    name: "Basílica de San Andrés",
    architect: "Leon Battista Alberti",
    year: 1790,
    img: "https://destinoinfinito.com/wp-content/uploads/2014/06/Bas%C3%ADlica-de-San-Andr%C3%A9s.jpg",
    location: "Mantua, Lombardía, Italia.",
  },

  {
    name: "Catedral de San Pablo",
    architect: "Sir Christopher Wren",
    year: 1710,
    img: "https://destinoinfinito.com/wp-content/uploads/2014/06/Catedral-de-San-Pablo.jpg",
    location: "Londres, Reino Unido",
  },

  {
    name: "Catedral de Jaén",
    architect: "Andrés de Vandelvira",
    year: 1724,
    img: "https://destinoinfinito.com/wp-content/uploads/2014/06/Catedral-de-Ja%C3%A9n.jpg",
    location: "Jaén, España",
  },

  {
    name: "Basílica de San Lorenzo",
    architect: "Filippo Brunelleschi",
    year: 1470,
    img: "https://destinoinfinito.com/wp-content/uploads/2014/06/Bas%C3%ADlica-de-San-Lorenzo.jpg",
    location: "Florencia, Italia",
  },

  {
    name: "Ayuntamiento de Augsburgo",
    architect: "Elias Holl",
    year: 1624,
    img: "https://destinoinfinito.com/wp-content/uploads/2014/06/Ayuntamiento.jpg",
    location: "Augsburgo, Baviera, Alemania",
  },

  {
    name: "Ayuntamiento de Bremen",
    architect: "Luder Von Bentheim",
    year: 1409,
    img: "https://destinoinfinito.com/wp-content/uploads/2014/06/Ayuntamiento-de-Bremen.jpg",
    location: "Bremen, Alemania",
  },

  {
    name: "Ayuntamiento de Amberes",
    architect: "Cornelis Floris de Vriendt",
    year: 1565,
    img: "https://destinoinfinito.com/wp-content/uploads/2014/06/Ayuntamiento-de-Amberes.jpg",
    location: "Amberes, Bélgica",
  },

  {
    name: "Ayuntamiento de Poznań",
    architect: "Giovanni Battista di Quadro",
    year: 1404,
    img: "https://destinoinfinito.com/wp-content/uploads/2014/06/Ayuntamiento-de-Poznan.jpg",
    location: "Poznán, Polonia",
  },
];

mongoose
  .connect(process.env.DB_URL)
  .then(async () => {
    const allArchitectures = await Architecture.find().lean();

    if (!allArchitectures.length) {
      console.log("[seed]: No estoy encontrando las arquitecturas ... ");
    } else {
      console.log(`[seed]: Encontrados ${allArchitectures.length} arquitecturas.`);
      await Architecture.collection.drop();
      console.log("[seed]: Colección Architectures eliminada correctamente");
    }
  })
  .catch((error) => console.log("[seed]: Error eliminando la colección -->", error))
  .then(async () => {
    await Architecture.insertMany(architectures);
    console.log("[seed]: Nuevas arquitecturas añadidas con éxito");
  })
  .catch((error) => console.log("[seed]: Error añadiendo las arquitecturas", error))
  .finally(() => mongoose.disconnect());
