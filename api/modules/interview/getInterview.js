
const database = require("../../../config/database");
const mysql = require("mysql")
const getInterview = (req, res, next) => {
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
            let queryString="SELECT roles.role_name,roles.id as role_id, file_upload.name as document_name ,interview.*,departments.name as department_name,hired_by_employees.name as hired_by,interview.name as employee_name,employees.name as interviewer_name from interview left join employees on employees.id=interview.interviewer_employee_id left join job_details on job_details.id=employees.job_details_id left join floors on job_details.floor_id=floors.id left join departments on departments.id=interview.department_id left join locations on locations.id=job_details.location_id  left join roles on roles.id=interview.designation_id left join employees as hired_by_employees on hired_by_employees.id=interview.hired_by_employee_id left join interview_documents on interview_documents.interview_id=interview.id left join file_upload on file_upload.id=interview_documents.document_id where interview.id="+req.query.id
               
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

module.exports=getInterview