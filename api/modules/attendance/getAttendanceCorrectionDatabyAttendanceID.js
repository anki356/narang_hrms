const database = require("../../../config/database");
const mysql = require("mysql")
const getAttendanceCorrectionDatabyAttendanceID= (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = ['HR Assistant','Hr Head','Admin','Super Admin']
        
        if (allowed_roles.includes(result[0].role_name)) {
            
       
            let queryString="select file_upload.name as photo,store_departments.name as store_department_name, attendance_requests.*,job_details.*,attendance.status as attendance_status,employees.name as employee_name,employees.employee_id as empID,employees.gender,floors.name as floor_name,roles.role_name as role_name from attendance_requests left join attendance on attendance.id=attendance_requests.attendance_id left join employees on employees.id=attendance_requests.employee_id left join job_details on job_details.id=employees.job_details_id left join floors on floors.id=job_details.floor_id left join stores on stores.id=job_details.store_id left join roles on roles.id=job_details.role_id left join file_upload on employees.photo_id=file_upload.id left join store_departments on store_departments.id=job_details.store_department_id where attendance.id="+req.query.attendance_id
            
                database.query(queryString ,async(err,AttendanceRequestData,fields)=>{
                
   console.log(err);
                    

                    res.send(AttendanceRequestData)
                 
                    
            })
               
        
          
        }


    })

}

module.exports=getAttendanceCorrectionDatabyAttendanceID