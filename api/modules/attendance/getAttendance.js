
const database = require("../../../config/database");
const mysql=require('mysql')
const getAttendance = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = ['Admin', 'Super Admin', 'HR Head', 'HR Assistant','Floor Incharge 1','Floor Incharge 2']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="SELECT file_upload.name as photo,attendance.id as attendance_id, roles.role_name,employees.id as employee_id,employees.employee_id as empID,employees.name as employee_name,floors.name AS floor_name,stores.name as store_name ,attendance.status,attendance.check_in_datetime as datetime FROM attendance  LEFT JOIN employees ON employees.id=attendance.employee_id left JOIN job_details ON employees.job_details_id=job_details.id left JOIN floors ON job_details.floor_id=floors.id left join roles on job_details.role_id=roles.id left join file_upload on file_upload.id=employees.photo_id left join stores on stores.id=job_details.store_id where attendance.check_in_datetime>=" + mysql.escape(req.query.from_date) + " and attendance.check_in_datetime< " +mysql.escape(req.query.to_date)
            if(result[0].role_name.split(" ")[0]==='Floor'){
                database.query("select employees.id from employees left join job_details on job_details.id=employees.job_details_id where job_details.role_id="+role_id,(err,employeesResult,fields)=>{
                    console.log(err)
                    queryString+=" and job_details.head_employee_id=" +employeesResult[0].id
                    if(req.query.floor_name){
                        queryString+=" and floors.name=" +mysql.escape(req.query.floor_name)
                       }
                       if(req.query.store_name){
                        queryString+=" and stores.name="+ mysql.escape(req.query.store_name)
                       }
                       if(req.query.role_name){
                        queryString+=" and roles.role_name= "+req.query.role_name
                       }
                       if(req.query.status){
                        queryString+=" and attendance.status in ("+ req.query.status+")"
                       }
                       
                       if(req.query.employee_query){
                        queryString+=" and (employees.employee_id like '%"+ req.query.employee_query+"%'or employees.name like '%"+req.query.employee_query+"%')"
                       }
                       queryString+=" limit "+req.query.limit+" Offset "+req.query.offset
                       console.log(queryString)
            
                        database.query(queryString , (err, attendanceResult, fields) => {
                            console.log(err)
                            res.send(attendanceResult) 
                        })
                })
                
               }
               else{
                if(req.query.floor_name){
                    queryString+=" and floors.name=" +mysql.escape(req.query.floor_name)
                   }
                   if(req.query.store_name){
                    queryString+=" and stores.name="+ mysql.escape(req.query.store_name)
                   }
                   if(req.query.role_name){
                    queryString+=" and roles.role_name="+ mysql.escape(req.query.role_name)
                   }
                   
                   if(req.query.employee_query){
                    queryString+=" and (employees.employee_id like '%"+ req.query.employee_query+"%'or employees.name like '%"+req.query.employee_query+"%')"
                   }
                   if(req.query.status){
                    queryString+=" and attendance.status in ("+ req.query.status+")"
                   }
                   queryString+=" limit "+req.query.limit+" Offset "+req.query.offset
                  
        
                    database.query(queryString , (err, attendanceResult, fields) => {
                        console.log(err)
                        res.send(attendanceResult) 
                    })
            
               }
          
        }


    })

}

module.exports=getAttendance