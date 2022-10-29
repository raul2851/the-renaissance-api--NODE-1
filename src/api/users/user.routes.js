const express = require('express');
const User = require('./user.models');
const router = express.Router();
const bcrypt = require('bcrypt');
const { generateSign } = require('../../utils/jwt/jwt');
const { json } = require('express');

router.get('/', async (req, res) =>{ 
    try {
        const allUsers = await User.find()
        return res.status(200).json(allUsers)
    } catch (error) {
        return res.status(500).json('Error al cargar los artistas')
    }
})
router.post("/createNewUser", async (req, res) => {
    try {
      const user = req.body;
      const newUser = new User(user);
      if (newUser.rol === "user") {
          const created = await newUser.save();
          return res.status(200).json(created);
      }else {
          return res.status(500).json("No eres un Mecenas, vete a limpiar establos")
      } 
    } catch (error) {
      return res.status(500).json("Error al crear el artista, demasiado moderno para nuestro tiempo");
    }
  });

  router.post('/login', async (req, res) =>{
    try {
        const dbUser = await User.findOne({email: req.body.email});
        if(!dbUser){
            return res.status(404),json('Este artista no existe')
        }
        if(bcrypt.compareSync(req.body.password, dbUser.password)){
            const token = generateSign(dbUser._id, dbUser.email);
            return res.status(200).json({token, dbUser});
        }else {
            return res.status(200).json('La contraseña es incorrecta, ¿quién te envía?')
        }
    } catch (error) {
        return res.status(500).json("Error al hacer Log in del artista");
    }
  })

  router.post('/logout', async (req, res) =>{
    try {
        const token = null;
        return  res.status(200).json(token)
    } catch (error) {
        return res.status(500).json(error);
        
    }
  })
  
module.exports = router