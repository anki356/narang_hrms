const database = require("../../../config/database");
const getEmployees = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Assistant','HR Head']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT employees.name ,employees.employee_id AS empID ,floors.name AS floor_name,roles.role_name, departments.name AS department_name FROM employees LEFT JOIN job_details ON job_details.id=employees.id LEFT JOIN floors ON job_details.floor_id=floors.id LEFT JOIN roles ON roles.id=job_details.role_id LEFT JOIN departments ON departments.id=roles.department_id LEFT JOIN file_upload ON file_upload.id=employees.photo_id" , (err, employeesData, fields) => {
                res.send(employeesData) 
                    
            })
        }



    })

}

module.exports=getEmployees