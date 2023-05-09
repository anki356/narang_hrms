const database = require("../../../config/database");
const mysql = require("mysql")
const getStoreIdOfGuard = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [ 'Guard']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("select stores.*,stores.id as store_id from stores right join job_details on job_details.store_id=stores.id where job_details.role_id= "+role_id, (err, storeData, fields) => {
                console.log(err)
                res.send(storeData) 
                    
            })
        }
    })

}

module.exports=getStoreIdOfGuard