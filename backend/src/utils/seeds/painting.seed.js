const mongoose = require("mongoose");
const Painting = require("../../api/painting/painting.model");
require('dotenv').config()

const paintings = [
  {
    name: "Sagrada Trinidad con la Virgen, San Juan y donantes",
    painter: "Masaccio",
    year: 1427,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667062544/paintings-assets-node/Masaccio-La-Trinidad-hacia-1425-e1531234176718_iekf4x.jpg",
    location: "Basílica de Santa Maria Novella, Florencia",
  },
  {
    name: "La Anunciación",
    painter: "Fran Angélico",
    year: 1426,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667062545/paintings-assets-node/770_5_Fra_Angelico-Anunciacio%CC%81n-Museo_del_prado_ffowq3.jpg",
    location: "Museo del Prado, Madrid",
  },
  {
    name: "El matrimonio Arnolfini",
    painter: "Jan van Eyck",
    year: 1434,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667062547/paintings-assets-node/simbolismo-matrimonio-Arnolfini-1_reaw6i.jpg",
    location: "Galería Nacional de Londres",
  },
  {
    name: "La virgen del canónigo Van der Paele",
    painter: "Jan van Eyck",
    year: 1436,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667062562/paintings-assets-node/Jan_van_Eyck_069_j6njji.jpg",
    location: "Museo Groeninge, Brujas",
  },
  {
    name: "La batalla de San Romano",
    painter: "Paolo Uccello",
    year: 1438,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667062548/paintings-assets-node/Paolo_Uccello_016_fqskrx.jpg",
    location: "Mouse de Louvre, París",
  },
  {
    name: "Frescos del techo de la Capilla Sixtina",
    painter: "Miguel Ángel Buonarroti",
    year: 1512,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667062544/paintings-assets-node/capilla-sixtina-roma_e96jpm.jpg",
    location: "Museo del Vaticano",
  },
  {
    name: "La escuela de Atenas",
    painter: "Rafael Sanzio",
    year: 1511,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667062601/paintings-assets-node/La_scuola_di_Atene_afyhsk.jpg",
    location: "Museo del Vaticano",
  },
  {
    name: "Mona Lisa",
    painter: "Leonardo da Vinci",
    year: 1506,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667062544/paintings-assets-node/mona_lisa_pn4bep.jpg",
    location: "Museo de Louvre, París",
  },
  {
    name: "Autorretrato",
    painter: "Alberto Durero",
    year: 1500,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667062593/paintings-assets-node/autorretrato_alberto_durero_be3bhm.jpg",
    location: "Pinacoteca Antigua de Munich",
  },
  {
    name: "La última cena",
    painter: "Leonardo da Vinci",
    year: 1498,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667062544/paintings-assets-node/misterios-y-curiosidades-sobre-la-ultima-cena-de-cristo-655x368_pambeo.jpg",
    location: "Refectorio del Convento de Santa Maria delle Grazie, Milán",
  },
  {
    name: "La virgen de las Rocas",
    painter: "Leonardo de Vinci",
    year: 1486,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667062593/paintings-assets-node/autorretrato_alberto_durero_be3bhm.jpg",
    location: "Museo del Louvre, París",
  },
  {
    name: "El nacimiento de Venus",
    painter: "Sandro Boticelli",
    year: 1485,
    img: "https://res.cloudinary.com/dpz8cjurk/image/upload/v1667062544/paintings-assets-node/botticelli-birth-venus_q9kfhf.jpg",
    location: "Galería Uffizi, Florencia",
  },
];
mongoose.connect(process.env.DB_URL)
  .then(async () => {
    const allPaintings = await Painting.find().lean();
    
    if(!allPaintings.length) {
      console.log('[seed]: No estoy encontrando los cuadros ... ')
    } else {
      console.log(`[seed]: Encontrados ${allPaintings.length} cuadros.`);
      await Painting.collection.drop();
      console.log('[seed]: Colección Paintings eliminada correctamente');
    }
  })
  .catch((error) => console.log('[seed]: Error eliminando la colección -->', error))
  .then(async() => {
    await Painting.insertMany(paintings);
    console.log('[seed]: Nuevos cuadros añadidos con éxito');
  })
  .catch((error) => console.log('[seed]: Error añadiendo los cuadros', error))
  .finally(() => mongoose.disconnect());