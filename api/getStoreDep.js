const database = require("../config/database");
const mysql = require("mysql")
const getStoreDep = (req, res, next) => {
    
            database.query("select * from store_departments", (err, storeInchargeData, fields) => {
                console.log(err)
                res.send(storeInchargeData) 
                    
            })
       

}

module.exports=getStoreDep