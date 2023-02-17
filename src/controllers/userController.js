const path = require('path')
const fs = require('fs')
const {validationResult} = require ('express-validator')
const { render } = require('ejs')
const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const session = require('express-session')


const userController = {
    login: (req,res)=> {

        return res.render("./users/login")
    },
    register: (req,res)=> {
      
        return res.render("./users/registro")
    },
    processRegister: (req,res) =>{
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0){
            return res.render("./users/registro", {
                errors: resultValidation.mapped(),
                oldData: req.body,
            })
        }
        let userInDB = User.fiendField('email' , req.body.email)
       
        
        if (userInDB){
            return res.render("./users/registro", {
                errors: {
                    email: {
                        msg: 'este email ya esta registrado'
                    }
                },
                oldData: req.body
            })

        }

        let userToCreate = {
            ...req.body,
            password : bcryptjs.hashSync(req.body.password, 10),
            fotoPerfil: req.file.filename
        }
        let userCreated = User.create(userToCreate)
        return res.redirect("/users/login")
    },

    processLogin:  (req, res) =>{
      
        let userToLogin = User.fiendField('email', req.body.email);

        if(userToLogin) {
            let isOkPassword = bcryptjs.compareSync(req.body.password, userToLogin.password);

           
            if (isOkPassword ){
                delete userToLogin.password
                req.session.userLogged = userToLogin

                if(req.body.recordarUsuario) {
                    res.cookie ('userEmail', req.body.email , {maxAge: (1000 * 60)* 60 })
                }
                return res.redirect ('/users/profile');
            }
            return res.render("./users/login", {
                errors:{
                    email: {
                        msg: 'las credenciales son invalidas'
                    }
                }
            });
  
        }
        return res.render("./users/login", {
            errors:{
                email: {
                    msg: 'este email no existe'
                }
            }
        })
      
    },
    profile: (req, res) => {
       
      
        res.render ("./users/profile", {
            users : req.session.userLogged      
        })
    },
    
    logout: (req,res)=> {
        res.clearCookie('userEmail')
        req.session.destroy();
        return res.redirect('/')
    }
}

module.exports = userController;