const database = require("../config/database");
const mysql = require("mysql")
const getlocationDep = (req, res, next) => {
    
            database.query("select * from store_departments", (err, locationInchargeData, fields) => {
                console.log(err)
                res.send(locationInchargeData) 
                    
            })
       

}

module.exports=getlocationDep