const userController = require('../controllers/userController')

const express= require('express');
const router = express.Router();
const path = require('path')
const fs = require('fs')

router.get("/login", userController.login)

router.get("/register", userController.register)

module.exports = router