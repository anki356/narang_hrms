const database = require("../../../config/database");
const mysql=require('mysql')
const getTransferDetails = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = ['Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="SELECT roles_b.role_name as designation_to_name, file_upload.name as photo,store_departments.name as department_from_name,location_dep.name as location_dep_name,floor_to.name as floor_to_name,floor_from.name as floor_from_name,locations_from.name as locations_from_name,locations_to.name as locations_to_name, transfer_details.*,employees.name as employee_name,employees.employee_id as empID from transfer_details left join employees on employees.id=transfer_details.employee_id left join store_departments on store_departments.id=transfer_details.department_from left join store_departments as location_dep on location_dep.id=transfer_details.department_to left join file_upload on file_upload.id=employees.photo_id left join job_details on job_details.id=employees.job_details_id left join floors as floor_from on floor_from.id = transfer_details.floor_id_from left join floors as floor_to on floor_to.id=transfer_details.floor_id_to  left join locations as locations_from on locations_from.id=transfer_details.location_id_from left join locations as locations_to on locations_to.id=transfer_details.location_id_to left join roles on roles.id=job_details.role_id left join roles as roles_a on roles_a.id=transfer_details.designation_from left join roles as roles_b on roles_b.id=transfer_details.designation_to where transfer_details.id="+req.query.id +" and employees.status=1"
            database.query( queryString, (err, transferResult, fields) => {
                console.log(err)
                res.send(transferResult) 
                    
            })
        }


    })

}

module.exports=getTransferDetails