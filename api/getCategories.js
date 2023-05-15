const database = require("../config/database");
const mysql = require("mysql")
const getCategories = (req, res, next) => {
    
            database.query("select * from expenses_categories", (err, storeInchargeData, fields) => {
                console.log(err)
                res.send(storeInchargeData) 
                    
            })
       

}

module.exports=getCategories