const mongoose = require("mongoose");
const Architecture = require("../../api/architecture/architecture.model");
require("dotenv").config();

const architectures = [
  {
    name: "Palacio Medici Riccardi",
    architect: "Michelozzo di Bartolomeo",
    year: 1460,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667055456/architectures-assets-node/Palacio_Medici_Riccardi_mizykj.jpg",
    location: "Florencia, Italia",
  },
 
  {
    name: "Spedale degli Innocenti",
    architect: "Filippo Brunelleschi",
    year: 1445,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667055456/architectures-assets-node/Spedale_degli_Innocenti_qon650.jpg",
    location: "Florencia, Italia",
  }, 

  {
    name: "Convento De San Esteban",
    architect: "Juan de Álava y RG de Hontañón",
    year: 1610,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667055456/architectures-assets-node/Convento_De_San_Esteban_cxcuxg.jpg",
    location: "Salamanca, España",
  },

  {
    name: "Catedral del Arcángel Miguel",
    architect: "Aleviz Fryazin Noviy",
    year: 1508,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667055456/architectures-assets-node/Catedral_del_Arca%CC%81ngel_Miguel_ogckcq.jpg",
    location: "Moscú, Rusia",
  },

  {
    name: "Basílica de San Andrés",
    architect: "Leon Battista Alberti",
    year: 1790,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667055455/architectures-assets-node/Basi%CC%81lica_de_San_Andre%CC%81s_fhhzkr.jpg",
    location: "Mantua, Lombardía, Italia.",
  },

  {
    name: "Catedral de San Pablo",
    architect: "Sir Christopher Wren",
    year: 1710,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667055456/architectures-assets-node/Catedral-de-San-Pablo_bypcjq.jpg",
    location: "Londres, Reino Unido",
  },

  {
    name: "Catedral de Jaén",
    architect: "Andrés de Vandelvira",
    year: 1724,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667055456/architectures-assets-node/Catedral-de-Jae%CC%81n_ziot7p.jpg",
    location: "Jaén, España",
  },

  {
    name: "Basílica de San Lorenzo",
    architect: "Filippo Brunelleschi",
    year: 1470,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667055455/architectures-assets-node/Basi%CC%81lica-de-San-Lorenzo_oyy7db.jpg",
    location: "Florencia, Italia",
  },

  {
    name: "Ayuntamiento de Augsburgo",
    architect: "Elias Holl",
    year: 1624,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667055455/architectures-assets-node/Ayuntamiento-Augsburgo_j81jh4.jpg",
    location: "Augsburgo, Baviera, Alemania",
  },

  {
    name: "Ayuntamiento de Bremen",
    architect: "Luder Von Bentheim",
    year: 1409,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667055455/architectures-assets-node/Ayuntamiento-de-Bremen_n1h7ls.jpg",
    location: "Bremen, Alemania",
  },

  {
    name: "Ayuntamiento de Amberes",
    architect: "Cornelis Floris de Vriendt",
    year: 1565,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667055455/architectures-assets-node/Ayuntamiento-de-Amberes_e3ogdi.jpg",
    location: "Amberes, Bélgica",
  },

  {
    name: "Ayuntamiento de Poznań",
    architect: "Giovanni Battista di Quadro",
    year: 1404,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667055455/architectures-assets-node/Ayuntamiento-de-Poznan_czjhuu.jpg",
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

