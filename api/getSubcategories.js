const database = require("../config/database");
const mysql = require("mysql")
const getSubcategories = (req, res, next) => {
    
            database.query("select * from expenses_sub_categories", (err, locationInchargeData, fields) => {
                console.log(err)
                res.send(locationInchargeData) 
                    
            })
       

}

module.exports=getSubcategories