const database = require("../../../config/database");
const mysql = require("mysql")
const getLeave = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="SELECT file_upload.name as document, leaves.*,employees.name as employee_name ,employees.employee_id as empID, floors.name as floor_name,roles.role_name,store_departments.name as department_name,roles.role_name,locations.name as location_name from leaves left join employees on employees.id=leaves.employee_id left join job_details on job_details.id=employees.job_details_id left join floors on floors.id=job_details.floor_id left join roles on job_details.role_id=roles.id left join store_departments on job_details.store_department_id=store_departments.id left join file_upload on file_upload.id=leaves.approval_document_id left join locations on locations.id=job_details.location_id  where leaves.id="+req.query.id
             
               
               
              
                database.query(queryString ,(err, leavesData, fields) => {
                    console.log(err);
                res.send(leavesData) 
                    
            })
        }



    })

}

module.exports=getLeave