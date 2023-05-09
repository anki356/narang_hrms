const database = require("../config/database");
const mysql = require("mysql")
const getStoreIdOfFloorIncharge = (req, res, next) => {
    const role_id = req.body.result.role_id  
            database.query("select job_details.store_id as store_id from employees left join job_details on job_details.id=employees.job_details_id where role_id="+role_id, (err, floorInchargeData, fields) => {
                console.log(err)
                res.send(floorInchargeData) 
                    
            })
       

}

module.exports=getStoreIdOfFloorIncharge