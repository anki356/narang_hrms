
const database = require("../../../config/database");
const mysql = require("mysql")
const getInterviews = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        database.query("select role_id ,permissions.name from permission_roles left join permissions on permissions.id=permission_roles.permission_id where name='Interview'",(
            err,allowed_roles 
         )=>{
           
            console.log(allowed_roles) 
           allowed_roles=allowed_roles.map((data)=>{
             return data.role_id
           })
        if (allowed_roles.includes(role_id)) {
            let queryString="SELECT roles.role_name,interview.*,departments.name as department_name,hired_by_employees.name as hired_by,interview.name as employee_name,employees.name as interviewer_name from interview left join employees on employees.id=interview.interviewer_employee_id left join job_details on job_details.id=employees.job_details_id left join floors on job_details.floor_id=floors.id left join departments on departments.id=interview.department_id left join locations on locations.id=job_details.location_id  left join roles on roles.id=interview.designation_id left join employees as hired_by_employees on hired_by_employees.id=interview.hired_by_employee_id where date_time>="+mysql.escape(req.query.from_date)+" and date_time<"+mysql.escape(req.query.to_date)
            if(req.query.floor_name){
                queryString+=" and floors.name=" +mysql.escape(req.query.floor_name)
               }
            if(req.query.interviewee_name){
                queryString+=" and interview.name like '%" +req.query.interviewee_name+"%'"
               }
            if(req.query.interviewer_name){
                queryString+=" and employees.name like '%" +req.query.interviewer_name+"%'"
               }
               if(req.query.location_name){
                queryString+=" and locations.name="+ mysql.escape(req.query.location_name)
               }
               if(req.query.role_name){
                queryString+=" and roles.role_name= "+mysql.escape(req.query.role_name)
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
               
            database.query( queryString, (err, interviewResult, fields) => {
                console.log(err)
               
                let reference_id_employee_id_array=interviewResult.map((data)=>{
                    return data.reference_id
                })
                    if(reference_id_employee_id_array.length>0)
                      {
                          database.query("SELECT employees.name as reference_name,employees.id from employees where employees.id in ("+reference_id_employee_id_array+")" , (err, referenceIdResult, fields) => {
                              console.log(err)
                              interviewResult.forEach(element => {
                                referenceIdResult.forEach((data)=>{

                                    if(element.reference_id===data.id){
                                        element.reference=data.reference_name
                                    }
                                })  
                              });
                              res.send(interviewResult)
                          })

                      }  
                      else{
                        res.send(interviewResult)
                      }
               

                
                    
        
        })
        }
    })

    })

}

module.exports=getInterviews