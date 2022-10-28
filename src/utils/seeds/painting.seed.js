const mongoose = require("mongoose");
const Painting = require("../../api/painting/painting.model");
require('dotenv').config()

const paintings = [
  {
    name: "Sagrada Trinidad con la Virgen, San Juan y donantes",
    painter: "Masaccio",
    year: 1427,
    img: "https://cdn.culturagenial.com/es/imagenes/masaccio-trinita-cke.jpg",
    location: "Basílica de Santa Maria Novella, Florencia",
  },
  {
    name: "La Anunciación",
    painter: "Fran Angélico",
    year: 1426,
    img: "https://cdn.culturagenial.com/es/imagenes/la-anunciacion-de-fra-angelico-cke.jpg",
    location: "Museo del Prado, Madrid",
  },
  {
    name: "El matrimonio Arnolfini",
    painter: "Jan van Eyck",
    year: 1434,
    img: "https://cdn.culturagenial.com/es/imagenes/el-matrimonio-alnorfini-cke.jpg",
    location: "Galería Nacional de Londres",
  },
  {
    name: "La virgen del canónigo Van der Paele",
    painter: "Jan van Eyck",
    year: 1436,
    img: "https://cdn.culturagenial.com/es/imagenes/1386px-jan-van-eyck-069-cke.jpg",
    location: "Museo Groeninge, Brujas",
  },
  {
    name: "La batalla de San Romano",
    painter: "Paolo Uccello",
    year: 1438,
    img: "https://cdn.culturagenial.com/es/imagenes/batalla-de-san-romano-cke.jpg",
    location: "Mouse de Louvre, París",
  },
  {
    name: "Frescos del techo de la Capilla Sixtina",
    painter: "Miguel Ángel Buonarroti",
    year: 1512,
    img: "https://cdn.culturagenial.com/es/imagenes/frescos-de-la-capilla-sixtina.jpg",
    location: "Museo del Vaticano",
  },
  {
    name: "La escuela de Atenas",
    painter: "Rafael Sanzio",
    year: 1511,
    img: "https://cdn.culturagenial.com/es/imagenes/sanzio-la-escuela-de-atenas-1510-1511-fresco-500-cm-770-cm-museos-del-vaticano-vaticano.jpg",
    location: "Museo del Vaticano",
  },
  {
    name: "Mona Lisa",
    painter: "Leonardo da Vinci",
    year: 1506,
    img: "https://cdn.culturagenial.com/es/imagenes/1455px-leonardo-da-vinci-mona-lisa-louvre-paris-cke.jpg",
    location: "Museo de Louvre, París",
  },
  {
    name: "Autorretrato",
    painter: "Alberto Durero",
    year: 1500,
    img: "https://cdn.culturagenial.com/es/imagenes/durero-autorretrato-cke.jpg",
    location: "Pinacoteca Antigua de Munich",
  },
  {
    name: "La última cena",
    painter: "Leonardo da Vinci",
    year: 1498,
    img: "https://cdn.culturagenial.com/es/imagenes/la-ultima-cena-1498-tempera-y-oleo-en-yeso-brea-y-masilla-4-6-x-8-8-mts-refectorio-del-convento-santa-maria-delle-grazie-milan-italia.jpg",
    location: "Refectorio del Convento de Santa Maria delle Grazie, Milán",
  },
  {
    name: "La virgen de las Rocas",
    painter: "Leonardo de Vinci",
    year: 1486,
    img: "https://cdn.culturagenial.com/es/imagenes/1362px-leonardo-da-vinci-vergine-delle-rocce-louvre-cke.jpg",
    location: "Museo del Louvre, París",
  },
  {
    name: "El nacimiento de Venus",
    painter: "Sandro Boticelli",
    year: 1485,
    img: "https://cdn.culturagenial.com/es/imagenes/1720px-sandro-botticelli-la-nascita-di-venere-google-art-project-edited-1-cke.jpg",
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