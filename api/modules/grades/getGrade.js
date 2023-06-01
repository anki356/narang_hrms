const database = require("../../../config/database");
const mysql = require("mysql")
const getGrade = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Floor Incharge','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="SELECT file_upload.name as photo, automated_grades.*,roles.role_name as role_name,employees.name as employee_name ,employees.employee_id as empID,head_employees.name as head_employee_name, floors.name as floor_name from automated_grades left join employees on employees.id=automated_grades.employee_id left join job_details on job_details.id=employees.job_details_id left join floors on floors.id=job_details.floor_id left join file_upload on file_upload.id=employees.photo_id left join roles on job_details.role_id=roles.id left join employees as head_employees  on head_employees.id =job_details.head_employee_id left join stores on job_details.store_id=stores.id where automated_grades.id="+req.query.id
            
                database.query(queryString , (err, gradesData, fields) => {
                    console.log(err);
                res.send(gradesData) 
                    
            })
        }


    })

}

module.exports=getGrade