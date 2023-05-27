const database = require("../../../config/database");
const mysql=require('mysql')
const getTransferDetails = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = ['Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="SELECT file_upload.name as photo,store_departments.name as department_from_name,store_dep.name as store_dep_name,floor_to.name as floor_to_name,floor_from.name as floor_from_name,stores_from.name as stores_from_name,stores_to.name as stores_to_name, transfer_details.*,employees.name as employee_name,employees.employee_id as empID from transfer_details left join employees on employees.id=transfer_details.employee_id left join store_departments on store_departments.id=transfer_details.department_from left join store_departments as store_dep on store_dep.id=transfer_details.department_to left join file_upload on file_upload.id=employees.photo_id left join job_details on job_details.id=employees.job_details_id left join floors as floor_from on floor_from.id = transfer_details.floor_id_from left join floors as floor_to on floor_to.id=transfer_details.floor_id_to  left join stores as stores_from on stores_from.id=transfer_details.store_id_from left join stores as stores_to on stores_to.id=transfer_details.store_id_to left join roles on roles.id=job_details.role_id where transfer_details.id="+req.query.id
            database.query( queryString, (err, transferResult, fields) => {
                console.log(err)
                res.send(transferResult) 
                    
            })
        }


    })

}

module.exports=getTransferDetails