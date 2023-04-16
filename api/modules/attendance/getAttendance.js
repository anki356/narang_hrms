
const database = require("../../../config/database");
const knex=require("../../../config/knex")
const getAttendance = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = ['Admin', 'Super Admin', 'HR Head', 'HR Assistant','Floor Incharge']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="SELECT file_upload.name as photo, roles.role_name,employees.employee_id,employees.name,floors.name AS floor_name,stores.name as store_name ,attendance.status,attendance.check_in_datetime as datetime FROM attendance  LEFT JOIN employees ON employees.id=attendance.employee_id RIGHT JOIN job_details ON employees.job_details_id=job_details.id RIGHT JOIN floors ON job_details.floor_id=floors.id left join roles on job_details.role_id=roles.id left join file_upload on file_upload.id=employees.photo_id left join stores on stores.id=job_details.store_id where attendance.check_in_datetime>=" + req.query.from_date + "and attendance.check_in_datetime< " + req.query.to_date
            if(result[0].role_name.split(" ")[0]==='Floor'){
                database.query("select id from employees left join job_details on job_details.id=employees.job_details_id where job_details.role_id="+role_id,(err,employeesResult,fields)=>{
                    queryString+=" and job_details.head_employee_id=" +employeesResult[0].id
                })
                
               }
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
            database.query(queryString , (err, attendanceResult, fields) => {
                console.log(err)
                res.send(attendanceResult) 
            })
        }


    })

}

module.exports=getAttendance