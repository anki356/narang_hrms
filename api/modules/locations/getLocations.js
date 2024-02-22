const database = require("../../../config/database");
const mysql = require("mysql")
const getlocations = (req, res, next) => {
    let query="select locations.*, GROUP_CONCAT(floors.name  SEPARATOR ', ') AS floor_names from locations left join floors on locations.id=floors.location_id"
    if(req.query.location_id){
        query+=" where locations.id="+req.query.location_id
    }
    query+=" group by locations.id"
            database.query(query, (err, locationData, fields) => {
                console.log(err)
                res.send(locationData) 
            })
}

module.exports=getlocations