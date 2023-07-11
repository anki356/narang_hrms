
const database = require("../../../config/database");
const mysql=require('mysql')
const getAttendance = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        database.query("select role_id ,permissions.name from permission_roles left join permissions on permissions.id=permission_roles.permission_id where name='Attendance'",(
           err,allowed_roles 
        )=>{
          
            
          allowed_roles=allowed_roles.map((data)=>{
            return data.role_id
          })
         
            if (allowed_roles.includes(role_id)) {
                let queryString="SELECT file_upload.name as photo,attendance.id as attendance_id, roles.role_name as role_name,employees.id as employee_id,employees.employee_id as empID,employees.name as employee_name,floors.name AS floor_name,locations.name as location_name ,attendance.status,attendance.check_in_datetime as datetime FROM attendance  LEFT JOIN employees ON employees.id=attendance.employee_id left JOIN job_details ON employees.job_details_id=job_details.id left JOIN floors ON job_details.floor_id=floors.id left join roles on job_details.role_id=roles.id left join file_upload on file_upload.id=employees.photo_id left join locations on locations.id=job_details.location_id where attendance.check_in_datetime>=" + mysql.escape(req.query.from_date) + " and attendance.check_in_datetime< " +mysql.escape(req.query.to_date)  +" and employees.status=1"  
                if(result[0].role_name.split(" ")[0]==='Floor'){
                    database.query("select employees.id from employees left join job_details on job_details.id=employees.job_details_id where job_details.role_id="+role_id,(err,employeesResult,fields)=>{
                        console.log(err)
                        queryString+=" and job_details.head_employee_id=" +employeesResult[0].id
                        if(req.query.floor_name){
                            queryString+=" and floors.name=" +mysql.escape(req.query.floor_name)
                           }
                           if(req.query.location_name){
                            queryString+=" and locations.name="+ mysql.escape(req.query.location_name)
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
                           if(req.query.limit){
                            queryString+=" limit "+req.query.limit
                           }
                           if(req.query.offset){
                            queryString+=" Offset "+req.query.offset
                           }
                           console.log(queryString)
                
                            database.query(queryString , (err, attendanceResult, fields) => {
        
                                    res.send(attendanceResult) 
                               
                                console.log(err)
                               
                            })
                    })
                    
                   }
                   else{
                    if(req.query.floor_name){
                        queryString+=" and floors.name=" +mysql.escape(req.query.floor_name)
                       }
                       if(req.query.location_name){
                        queryString+=" and locations.name="+ mysql.escape(req.query.location_name)
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
                       if(req.query.employee_id){
                        queryString+=" and attendance.employee_id = "+req.query.employee_id
                      
                       }
                       if(req.query.limit){
                        queryString+=" limit "+req.query.limit
                       }
                       if(req.query.offset){
                        queryString+=" Offset "+req.query.offset
                      
                       }
                      
                       
            
                        database.query(queryString , (err, attendanceResult, fields) => {
                            console.log(err)
                            res.send(attendanceResult) 
                        })
                
                   }
              
            }
    
    
        })
      
    })

}

module.exports=getAttendance