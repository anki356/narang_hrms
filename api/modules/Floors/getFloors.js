const database = require("../../../config/database");
const mysql = require("mysql")
const getFloors = (req, res, next) => {
    
            database.query("select * from floors", (err, floorData, fields) => {
                console.log(err)
                res.send(floorData) 
                    
            })
       

}

module.exports=getFloors