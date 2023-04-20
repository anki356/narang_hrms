const database = require("../../../config/database");
const mysql = require("mysql")
const getRoles = (req, res, next) => {
    
            database.query("select * from roles", (err, roleData, fields) => {
                console.log(err)
                res.send(roleData) 
                    
            })
       

}

module.exports=getRoles