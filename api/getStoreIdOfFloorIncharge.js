const database = require("../config/database");
const mysql = require("mysql")
const getlocationIdOfFloorIncharge = (req, res, next) => {
    const role_id = req.body.result.role_id  
            database.query("select job_details.location_id as location_id from employees left join job_details on job_details.id=employees.job_details_id where role_id="+role_id, (err, floorInchargeData, fields) => {
                console.log(err)
                res.send(floorInchargeData) 
                    
            })
       

}

module.exports=getlocationIdOfFloorIncharge