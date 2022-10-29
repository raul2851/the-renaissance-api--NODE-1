const express = require('express');
const Gallery = require('./gallery.model');

const router = express.Router();


router.get('/', async(req, res, next)=>{
    try {
        const allGalleries = await Gallery.find().populate('paintings').populate('sculptures');
        console.log(allGalleries);
        return res.status(200).json(allGalleries);
    } catch (error) {
        return next(error);
        
    }
})
router.post('/create', async (req, res, next) => {
    try {
        const newGallery = new Gallery({
            name: req.body.name,
            location: req.body.location,
            works: []
        });
        const createdGallery = await newGallery.save();
        return res.status(201).json(createdGallery);
    } catch (error) {
        return next(error);
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const galleryToDelete = await Gallery.findByIdAndDelete(id);
      return res.status(200).json("Se ha conseguido borrar la galería");
    } catch (error) {
      return res.status(500).json("Error al borrar la galería");
    }
  });


  //AÑADIR Y ELIMINAR COLECCIONES RELACIONADAS

router.put('/add-work', async (req, res, next) => {
    try {
        const { galleryId } = req.body;
        const { paintingId } = req.body;
        const { sculptureId} = req.body;
        if(paintingId){
            const updatedGallery = await Gallery.findByIdAndUpdate(
                galleryId,
               
                { $push: { paintings: paintingId } },
                { new: true }
            );
        } 
        if(sculptureId){
            const updatedGallery = await Gallery.findByIdAndUpdate(
                galleryId,
               
                { $push: { sculptures: sculptureId } },
                { new: true }
            );
        } 
        return res.status(200).json("Obra(s) añadida con éxito");
    } catch (error) {
        return next(error);
    }
});

router.delete('/delete-work', async (req,res, next) =>{
    try {
        const { galleryId } = req.body;
        const { workId } = req.body;
        const gallery = await Gallery.findById(galleryId)
        const paintingToDelete = gallery.works.indexOf(workId)
        const deletedPainting = gallery.works.splice(paintingToDelete, 1)
        const galleryToUpdated = await Gallery.findByIdAndUpdate(galleryId, gallery);

        console.log(gallery);

        return res.status(201).json('Obra eliminada correctamente')
        
    } catch (error) {
        return next(error);
        
    }
})



module.exports = router;