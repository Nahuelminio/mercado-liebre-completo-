const userController = require('../controllers/userController')
const {body} = require ('express-validator')
const express= require('express');
const router = express.Router();
const path = require('path')
const fs = require('fs')
const guestMiddleware = require('../middlewares/guestMiddleware')
const authtMiddleware = require('../middlewares/authMiddleware')

const validations = [
    body('fullName').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('email').notEmpty().withMessage('Tienes que escribir un email').bail().isEmail().withMessage('tienes que escribir un formato de correo valido')
    ,
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('country').notEmpty().withMessage('Tienes que escribir un pais'),


]
const multer = require('multer')

const multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
     cb(null, path.join(__dirname,'../../public/imagenes/avatar'));    // Ruta donde almacenamos el archivo
    },
    filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
     let imageName = Date.now() + path.extname(file.originalname);   // milisegundos y extensión de archivo original
     cb(null, imageName);         
    }
});

const uploadFile = multer({ storage: multerDiskStorage });


router.get("/login",  guestMiddleware ,userController.login)
router.post("/login", userController.processLogin)

router.get("/register",  guestMiddleware ,userController.register)
router.post('/register', uploadFile.single('cImageRegistro'),validations, userController.processRegister)

router.get("/profile" , authtMiddleware ,userController.profile)

router.get("/logout", userController.logout)



module.exports = router