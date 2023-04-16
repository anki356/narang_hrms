const database = require("../../../config/database");
const getEmployees = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Assistant','HR Head','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="SELECT job_details.*,bank_details.*,floors.*,stores.*,roles.*,store_departments.*,employees.* from employees left join job_details on job_details.id=employees.job_details_id left join bank_details on bank_details.id=employees.bank_details_id left join floors on floors.id =job_details.floor_id left join stores on stores.id =job_details.store_id left join roles on roles.id=job_details.role_id left join store_departments on store_departments.id=job_details.store_department_id left join file_upload on file_upload.id=employees.photo_id where employees.created_on>="+req.query.from_date+"and employees.created_on<"+req.query.to_date
            if(req.query.floor_name){
                queryString+=" and floors.name=" +req.query.floor_name
               }
               if(req.query.store_name){
                queryString+=" and stores.name="+ req.query.store_name
               }
               if(req.query.role_name){
                queryString+=" and roles.role_name="+ req.query.role_name
               }
               if(req.query.employee_id){
                queryString+="and employees.employee_id="+ req.query.employee_id
               }
               if (req.query.employee_name){
                queryString+="and employees.name like '%'"+ req.query.employee_name+"'%'"
               }
            database.query(queryString , (err, employeesResult, fields) => {
                console.log(err)
              res.send(employeesResult)
            })
        }



    })

}

module.exports=getEmployees