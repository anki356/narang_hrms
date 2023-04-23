const database = require("../../../config/database");
const mysql = require("mysql")
const getAttendanceCorrectionRequests= (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [ 'Hr Assistant','Hr Head','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="select attendance_requests.*,employees.name as employee_name,employees.employee_id as empID,floors.name as floor_name,roles.role_name as role_name from attendance_requests left join employees on employees.id=attendance_requests.employee_id left join job_details on job_details.id=employees.job_details_id left join floors on floors.id=job_details.floor_id left join roles on roles.id=job_details.role_id where date_time>="+req.query.from_date+"and date_time<"+req.query.to_date+"and status='Pending'"
            if(req.query.floor_name){
                queryString+="and floors.name=" +req.query.floor_name
               }
               if(req.query.store_name){
                queryString+="and stores.name="+ req.query.store_name
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
                database.query(queryString ,(err,AttendanceRequestData,fields)=>{
                console.log(err)
                res.send(AttendanceRequestData)
            })
               
        
          
        }


    })

}

module.exports=getAttendanceCorrectionRequests