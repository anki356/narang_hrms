const database = require("../config/database");
const mysql = require("mysql")
const getStoreIncharge = (req, res, next) => {
    
            database.query("select employees.name from employees left join job_details on job_details.id=employees.job_details_id where role_id=9 and store_id="+req.query.store_id, (err, storeInchargeData, fields) => {
                console.log(err)
                res.send(storeInchargeData) 
                    
            })
       

}

module.exports=getStoreIncharge