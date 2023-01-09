const fs = require('fs')
const path = require('path')

const productsFilePath = path.join(__dirname,'../data/productDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))

const productController = {
    detail: (req,res)=> {
        let idProduct = req.params.id;
        let productoBuscado ;

        for (let o of products){
            if (o.id == idProduct){
                productoBuscado=o
                break
  
            }
        }
        
            res.render('producto', {producto:productoBuscado})
      
    },
    create: (req,res) => {
        res.render('createProduct')
    },
    store: (req,res) => {
     let datos = req.body;
     let idNuevoProducto = (products[products.length-1].id)+1;
     let imagenNuevoProducto = 'qqqqq.jpg'

     let nuevoProducto= {
        "id": idNuevoProducto,
        "name": datos.name,
        "price":parseInt(datos.price),
        "category": datos.category,
        "description": datos.description,
        "discount" : parseInt(datos.price),
        "image":imagenNuevoProducto
     }

     products.push(nuevoProducto)

     fs.writeFileSync(productsFilePath,JSON.stringify(products, null, " "), 'utf-8' )
     res.redirect('/')
},
    edit: (req,res)=>{
        let idProduct = req.params.id;
        let productoBuscado ;

        for (let o of products){
            if (o.id == idProduct){
                productoBuscado=o
                break
  
            }
        }
        
            res.render('editProduct', {producto:productoBuscado})
      
    },
    update: (req,res)=> {

        let idProducto = req.params.id

        let datosProductos = req.body;

        for (let o of products){
            if (o.id == idProducto){
               
                o.name=datosProductos.name
                o.price=parseInt(datosProductos.price)
                o.category= datosProductos.category
                o.description= datosProductos.description
                o.discount = parseInt(datosProductos.price)
                o.image=datosProductos.image
                break
  
            }
        }
        fs.writeFileSync(productsFilePath,JSON.stringify(products, null, " "), 'utf-8' )
        res.redirect('/')
   },
   destroy: (req,res )=>{
    let idProductoX = req.params.id;

    let nuevaListaProductos = products.filter(function(e){
        return e.id!= idProductoX
    
    });
    fs.writeFileSync(productsFilePath,JSON.stringify(nuevaListaProductos, null, " "), 'utf-8' )
    
    res.redirect('/')
    
   }
        
    }
 
    


module.exports = productController;