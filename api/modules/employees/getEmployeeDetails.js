const database = require("../../../config/database");
const getEmployeeDetails = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Assistant','HR Head','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="SELECT base_salaries.*, job_details.*,bank_details.*,floors.*,stores.*,roles.*,store_departments.*,employees.* from employees left join job_details on job_details.id=employees.job_details_id left join bank_details on bank_details.id=employees.bank_details_id left join floors on floors.id =job_details.floor_id left join stores on stores.id =job_details.store_id left join roles on roles.id=job_details.role_id left join store_departments on store_departments.id=job_details.store_department_id left join file_upload on file_upload.id=employees.photo_id left join base_salaries on base_salaries.employee_id =employees.id where employees.id="+req.query.id
            database.query(queryString , (err, employeesResult, fields) => {
                database.query('select documents.*,file_upload.* from documents left join file_upload on file_upload.id=documents.file_id where employee_id='+req.query.id,(err,documentResult)=>{
                   
                        
                            database.query('select loan.*,loan_repayment.date,loan_repayment.status,loan_repayment.date,loan_repayment.month, loan_repayment.year,loan_repayment.amount from loan left join loan_repayment on loan_repayment.loan_id=loan.id where employee_id='+req.query.id,(err,loanResult)=>{ 
                                
                                database.query('select advance.* from advance where employee_id='+req.query.id,(err,advanceResult)=>{  
                     if(result[0].role_name!=='HR Assistant') {
                        database.query('select salaries.* from salaries where employee_id='+req.query.id,(err,salariesResult)=>{
                            database.query('select * from salaries_increment where employee_id='+req.query.id,(err,salariesIncrementResult)=>{   
                            res.json({
                                "employeesResult":employeesResult,
                                "documentResult":documentResult ,
                                "salariesResult" :salariesResult,
                                "salariesIncrementResult":salariesIncrementResult,
                                "loanResult":loanResult,
                                "advanceResult":advanceResult
                              })
                        })
                    })
                     }  
                     else{
                        res.json({
                            "employeesResult":employeesResult,
                            "documentResult":documentResult ,
                            "loanResult":loanResult,
                            "advanceResult":advanceResult
                          })
                     }                 
                    
                
            })
                })
                })
                
                
              
            })
        }



    })

}

module.exports=getEmployeeDetails