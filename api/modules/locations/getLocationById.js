const database = require("../../../config/database");
const mysql = require("mysql")
const getlocationById = (req, res, next) => {
    let query="select locations.*, floors.name as floor_name from locations left join floors on locations.id=floors.location_id"
    if(req.query.location_id){
        query+=" where locations.id="+req.query.location_id
    }
            database.query(query, (err, locationData, fields) => {
                console.log(err)
                res.send(locationData) 
            })
}

module.exports=getlocationById