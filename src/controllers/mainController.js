const fs = require('fs')
const path = require('path')

const productsFilePath = path.join(__dirname,'../data/productDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))

let controladorMain ={
    home: (req,res) => {

        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))
        res.render('home' , {productos : products})

    }
}

module.exports = controladorMain;