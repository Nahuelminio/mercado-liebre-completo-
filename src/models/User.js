const fs = require('fs')
const path = require('path')


const User = {
    fileName: path.join(__dirname, '../data/users.json'),

    getData:function ( ){
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'))
    },

    generateId : function (){
        let allUsers = this.fiendAll();
        let lastUser = allUsers.pop()
        if (lastUser){
        return lastUser.id + 1;
        }
        return 1;
    },
    fiendAll: function (){
        return this.getData()
    },

    fiendByPk : function(id){
        let allUsers = this.fiendAll()
        let userFound = allUsers.find(oneUser => oneUser.id === id )
        return userFound;
    },

    fiendField : function(field, text){
        let allUsers = this.fiendAll()
        let userFound = allUsers.find(oneUser => oneUser[field] === text )
        return userFound;
    },

    create: function (userData){
        let allUsers = this.fiendAll()
        let newUser = {
            id : this.generateId(),
            ...userData
        }
        allUsers.push(newUser)
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null , ' '))
        return newUser

    },
    delete: function (id){
        let allUsers = this.fiendAll()
        let finalUsers = allUsers.filter(onerUser => onerUser.id !== id)
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null , ' '))
        return true 
    }
}
module.exports = User;
