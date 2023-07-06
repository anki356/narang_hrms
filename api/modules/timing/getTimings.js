
const database = require("../../../config/database");
const mysql=require('mysql')
const getTimings = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [ 'HR Head', 'HR Assistant','Floor Incharge','Guard']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="SELECT file_upload.name as photo, employees.id as employees_id,employees.name as employee_name,employees.employee_id as empID,timing.*,floors.name as floor_name from timing left join employees on employees.id=timing.employee_id left join file_upload on file_upload.id=employees.photo_id left join job_details on job_details.id=employees.job_details_id left join floors on floors.id =job_details.floor_id left join locations on locations.id=job_details.location_id left join roles on roles.id=job_details.role_id where timing.date>="+mysql.escape(req.query.from_date)+"and timing.date<"+mysql.escape(req.query.to_date)
            if(req.query.location_id){
               queryString+= "and job_details.location_id="+req.query.location_id
            }
            if(result[0].role_name.split(" ")[0]==='Floor'){
                database.query("select employees.id from employees left join job_details on job_details.id=employees.job_details_id where job_details.role_id="+role_id,(err,employeesResult,fields)=>{
                    console.log(err)
                    queryString+=" and job_details.head_employee_id=" +employeesResult[0].id   
            if(req.query.in_time==='null'){
                
queryString+=" and timing.in_time is null"
            }
            console.log(req.query.out_time)
            if(req.query.out_time!=='null' && req.query.out_time!==undefined ){
             
                queryString+=" and timing.out_time is not null"
                            }
            
            if(req.query.floor_name){
                queryString+=" and floors.name=" + mysql.escape(req.query.floor_name)
               }
            if(req.query.employee_id){
                queryString+=" and employees.id=" + req.query.employee_id
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
               if (req.query.approval_status){
                queryString+=" and timing.approval_status ="+ req.query.approval_status
               }
               if (req.query.status_id){
                queryString+=" and timing.status_id in("+ req.query.status_id+")"
               }
            database.query( queryString, (err, timingResult, fields) => {
                console.log(err)
                res.send(timingResult) 
                    
            })
        })
    }
    else{
        if(req.query.in_time==='null'){
                
            queryString+=" and timing.in_time is null"
                        }
                        console.log(req.query.out_time)
                        if(req.query.out_time!=='null' && req.query.out_time!==undefined ){
                         
                            queryString+=" and timing.out_time is not null"
                                        }
                        
                        if(req.query.floor_name){
                            queryString+=" and floors.name=" + mysql.escape(req.query.floor_name)
                           }
                        if(req.query.employee_id){
                            queryString+=" and employees.id=" + req.query.employee_id
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
                           if (req.query.approval_status){
                            queryString+=" and timing.approval_status ="+ req.query.approval_status
                           }
                           if (req.query.status_id){
                            queryString+=" and timing.status_id in("+ req.query.status_id+")"
                           }
                        database.query( queryString, (err, timingResult, fields) => {
                            console.log(err)
                            res.send(timingResult) 
                                
                        })

    }
        }


    })

}

module.exports=getTimings