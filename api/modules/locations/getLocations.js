const database = require("../../../config/database");
const mysql = require("mysql")
const getlocations = (req, res, next) => {
            database.query("select * from locations", (err, locationData, fields) => {
                console.log(err)
                res.send(locationData) 
            })
}

module.exports=getlocations