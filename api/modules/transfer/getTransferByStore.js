const database = require("../../../config/database");
const getTransferByStore = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = ['Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT file_upload.name as photo,transfer_details.*, stores.name as store_name,employees.name as employee_name, employees.employee_id as empID from transfer_details left join employees on employees.id=transfer_details.employee_id left join job_details on job_details.id=employees.job_details_id left join stores on stores.id=job_details.store_id left join file_upload on file_upload.id=employees.photo_id where date>="+req.query.from_date +"and date<"+req.query.to_date+" and stores.name="+req.query.store_name, (err, transferResult, fields) => {
                console.log(err)
                res.send(transferResult) 
                    
            })
        }


    })

}

module.exports=getTransferByStore