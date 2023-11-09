const database = require("../../../config/database");
const mysql = require("mysql")
const getFloors = (req, res, next) => {
    let query="select * from floors "

    if(req.query.location_id){
        query+="where location_id="+req.query.location_id
    }
    console.log(query)
   
            database.query(query, (err, floorData, fields) => {
                console.log(err)
                res.send(floorData) 
                    
            })
       

}

module.exports=getFloors