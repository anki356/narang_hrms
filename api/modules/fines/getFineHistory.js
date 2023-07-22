const database = require("../../../config/database");
const mysql = require("mysql")
const moment =require("moment")
const getFineHistory = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        database.query("select role_id ,permissions.name from permission_roles left join permissions on permissions.id=permission_roles.permission_id where name='Fine Management'",(
            err,allowed_roles 
         )=>{
           
            console.log(allowed_roles) 
           allowed_roles=allowed_roles.map((data)=>{
             return data.role_id
           })
        if (allowed_roles.includes(role_id)) {
      let from_date=moment([req.query.year,req.query.month]).startOf('month')
      let to_date=moment([req.query.year,req.query.month]).endOf('month')
      let queryString="SELECT job_details.*,employees.*, file_upload.name as photo, fines.*,employees.name as employee_name ,employees.employee_id as empID, floors.name as floor_name,locations.name as location_name from fines left join employees on employees.id=fines.employee_id left join job_details on job_details.id=employees.job_details_id left join floors on floors.id=job_details.floor_id left join file_upload on file_upload.id=employees.photo_id left join roles on job_details.role_id=roles.id left join locations on job_details.location_id=locations.id where fines.employee_id="+req.query.employee_id +" and employees.status=1"
      if(req.query.year&& req.query.month){
          queryString+= " and date>="+mysql.escape(from_date.format("YYYY-MM-DD")) +" and date<="+mysql.escape(to_date.format("YYYY-MM-DD"))
      }
           console.log(queryString)
                database.query(queryString , (err, fineData, fields) => {
                    res.send(fineData)
                })
            }
        })
        })
    }
    module.exports=getFineHistory