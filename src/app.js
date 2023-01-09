const express = require('express')
const { read } = require('fs')
const path = require('path')
const app=express()
const routes = require('./routes/index.routes')

const methodOverride = require('method-override')
app.use(methodOverride('_method'))


app.use(express.static(path.join(__dirname,'../public')))

app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))


app.use('/', routes);


app.use((req ,res, next)=>{
    res.status(404).render("error-404")
})

app.listen(process.env.PORT  || 3009, function(){
    console.log("Servidor corriendo en el puerto 3009")

})





