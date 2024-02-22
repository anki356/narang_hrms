const database = require("../../../config/database");
const mysql=require('mysql')
const updateTransfer = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = ['Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="update transfer_details set status ="+mysql.escape(req.body.status)+", status_id="+role_id+",status_date=current_timestamp() where transfer_details.id="+req.params.id
            database.query( queryString, (err, transferResult, fields) => {
                console.log(err)
                if(req.body.status==='Approved'){

                
                database.query("select job_details_id from employees where employees.id="+req.body.employee_id,(err, jobResult, fields) => {
                database.query("select employees.id from employees left join job_details on job_details.id=employees.job_details_id left join hierarchy on hierarchy.parent_role_id=job_details.role_id where child_role_id="+req.body.designation_to,(err,employeeResult)=>{
                    database.query("select job_details.head_employee_id from employees left join job_details on job_details.id=employees.job_details_id  where employees.id="+employeeResult[0].id,(err,employeeSuperVisorResult)=>{
console.log(err)
database.query("select department_id from roles where id= "+req.body.designation_to,(err,deptResult)=>{
    console.log(err)
                    database.query("Update job_details set store_department_id="+req.body.department_to+",floor_id="+req.body.floor_id_to+",location_id="+req.body.location_id+", head_employee_id="+employeeResult[0].id+",role_id="+req.body.designation_to+", department_id="+deptResult[0].department_id+",supervisor_id="+employeeSuperVisorResult[0].head_employee_id+" where job_details.id="+jobResult[0].job_details_id, (err, jobResult, fields) => {
                        console.log(err)
                        res.send(jobResult) 
                            
                    })
                })
                })
                })
            })
        }
        else{
            res.send(transferResult)
        }  
                    
            })
        }


    })

}

module.exports=updateTransfer