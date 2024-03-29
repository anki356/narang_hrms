const database = require("../../../config/database");
const mysql = require("mysql")
const getAttendanceCorrectionRequests= (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        database.query("select role_id ,permissions.name from permission_roles left join permissions on permissions.id=permission_roles.permission_id where name='Timing Approval'",(
            err,allowed_roles 
         )=>{
           
             
           allowed_roles=allowed_roles.map((data)=>{
             return data.role_id
           })
        
        if (allowed_roles.includes(role_id)) {
            
       
            let queryString="select file_upload.name as photo,store_departments.name as location_department_name, attendance_requests.*,job_details.*,attendance.status as attendance_status,employees.name as employee_name,employees.employee_id as empID,employees.gender,floors.name as floor_name,locations.name as location_name,roles.role_name as role_name from attendance_requests left join attendance on attendance.id=attendance_requests.attendance_id left join employees on employees.id=attendance_requests.employee_id left join job_details on job_details.id=employees.job_details_id left join floors on floors.id=job_details.floor_id left join locations on locations.id=job_details.location_id left join roles on roles.id=job_details.role_id left join file_upload on employees.photo_id=file_upload.id left join store_departments on store_departments.id=job_details.store_department_id where attendance.check_in_datetime>="+ mysql.escape(req.query.from_date) + " and attendance.check_in_datetime< " +mysql.escape(req.query.to_date)  +" and employees.status=1"  
            if(req.query.floor_name){
                queryString+=" and floors.name=" + mysql.escape(req.query.floor_name)
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
               if(req.query.type){
                queryString+=" and attendance_requests.type ="+ req.query.type
               }
               console.log(queryString)
                database.query(queryString ,async(err,AttendanceRequestData,fields)=>{
                
//         console.log(err)
//         let promiseArray=[]
//                     AttendanceRequestData.forEach((data,index)=>{
//                         let pr={}
//                         pr.promise=new Promise((resolve,reject)=>{
//     pr.resolve=resolve
//     pr.reject=reject
//                         })
//                         promiseArray[index]=pr.promise
//                         database.query("Select * from employees where employees.id="+data.head_employee_id,(err,headEmployeeData)=>{
//                             console.log(err)
// data.head_employee_data=headEmployeeData
// pr.resolve(true)
//                         })
//                     })
                    

//                         console.log(err)
//                   Promise.all(promiseArray).then(()=>{
                    res.send(AttendanceRequestData)
                //   })
                    
            })
               
        
          
        }
    })

    })

}

module.exports=getAttendanceCorrectionRequests