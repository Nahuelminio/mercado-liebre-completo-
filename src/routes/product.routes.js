const productController = require('../controllers/productController.js')
const express= require('express');
const router = express.Router();
const path = require('path')


router.get("/detail/:id", productController.detail)

router.get("/create", productController.create)
router.post("/create", productController.store)


router.get('/edit/:id', productController.edit)
router.put('/edit/:id', productController.update)

router.delete('/:id' ,productController.destroy)
module.exports = router