const productController = require('../controllers/productController.js')
const express= require('express');
const router = express.Router();
const path = require('path')
const multer = require('multer')

const multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
     cb(null, path.join(__dirname,'../../public/imagenes/products'));    // Ruta donde almacenamos el archivo
    },
    filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
     let imageName = Date.now() + path.extname(file.originalname);   // milisegundos y extensión de archivo original
     cb(null, imageName);         
    }
});

const uploadFile = multer({ storage: multerDiskStorage });



router.get("/detail/:id", productController.detail)

router.get("/create",productController.create)
router.post("/create", uploadFile.single('cImage'), productController.store)


router.get('/edit/:id', productController.edit)
router.put('/edit/:id',uploadFile.single('cImage'), productController.update)

router.delete('/:id',productController.destroy)
module.exports = router