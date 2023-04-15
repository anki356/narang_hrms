const database = require("../../../config/database");
const mysql = require("mysql")
const getGrades = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Floor Incharge','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="SELECT (grade_1st+grade_2nd+grade_3rd+grade_4th)/4 as avg_grade,file_upload.name as photo, grades.*,employees.name ,employees.employee_id as empID, floors.name as floor_name from grades left join employees on employees.id=grades.employee_id left join job_details on job_details.id=employees.job_details_id left join floors on floors.id=job_details.floor_id left join file_upload on file_upload.id=employees.photo_id left join roles on job_details.role_id=roles.id left join stores on job_details.store_id=stores.id where grades.date>="+req.query.from_date+"and grades.date< "+req.query.to_date
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
                database.query(queryString , (err, gradesData, fields) => {
                res.send(gradesData) 
                    
            })
        }


    })

}

module.exports=getGrades