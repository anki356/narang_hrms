const database = require("../config/database");
const mysql = require("mysql")
const getlocationIncharge = (req, res, next) => {
    
            database.query("select employees.name from employees left join job_details on job_details.id=employees.job_details_id where role_id=9 and location_id="+req.query.location_id, (err, locationInchargeData, fields) => {
                console.log(err)
                res.send(locationInchargeData) 
                    
            })
       

}

module.exports=getlocationIncharge