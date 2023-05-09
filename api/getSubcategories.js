const database = require("../config/database");
const mysql = require("mysql")
const getSubcategories = (req, res, next) => {
    
            database.query("select * from expenses_sub_categories", (err, storeInchargeData, fields) => {
                console.log(err)
                res.send(storeInchargeData) 
                    
            })
       

}

module.exports=getSubcategories