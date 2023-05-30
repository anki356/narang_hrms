const database = require("../config/database");
const mysql = require("mysql")
const getDepartments = (req, res, next) => {
    
            database.query("select * from departments", (err, departments, fields) => {
                res.send(departments) 
                    
            })
       

}

module.exports=getDepartments