const database = require("../../../config/database");
const mysql = require("mysql")
const getlocationIdOfGuard = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        
        let allowed_roles = [ 'Guard']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("select locations.*,locations.id as location_id from locations right join job_details on job_details.location_id=locations.id where job_details.role_id= "+role_id, (err, locationData, fields) => {
                console.log(err)
                res.send(locationData) 
                    
            })
        }
    })

}

module.exports=getlocationIdOfGuard