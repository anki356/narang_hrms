const database = require("../../../config/database");
const mysql = require("mysql")
const getStores = (req, res, next) => {
            database.query("select * from stores", (err, storeData, fields) => {
                console.log(err)
                res.send(storeData) 
            })
}

module.exports=getStores