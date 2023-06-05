const database = require("../../../config/database");

const mysql=require('mysql')
const getLoansHistory = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString= "SELECT  loan.*,stores.name as store_name,roles.role_name as role_name,file_upload.name as photo,employees.name as employee_name,employees.employee_id as empID,floors.name as floor_name from loan left join employees on employees.id=loan.employee_id left join job_details on job_details.id=employees.job_details_id left join floors on floors.id=job_details.floor_id left join file_upload on file_upload.id=employees.photo_id left join roles on job_details.role_id=roles.id left join stores on stores.id =job_details.store_id where loan.employee_id="+ req.query.employee_id
    
            database.query( queryString, (err, loanData, fields) => {
                console.log(err)
                let  loan_ids=[]
                if(loanData.length>0){
                    loan_ids=loanData.map((loan)=>{
                        return loan.id
                    })
                }else{
                   loan_ids=[]
                }
                
                if(loan_ids.length>0)
               {
                database.query("Select * from loan_repayment where loan_id  in ("+loan_ids+")",(err, loanRepaymentData, fields) => {
                    console.log(err)
                    loanData.forEach((data)=>{
                        data.loan_repayment=loanRepaymentData.filter((repaymentData)=>{
                            return repaymentData.loan_id===data.id
                        })
                    })
                    res.send(loanData) 
            })
               } else{
                res.send(loanData) 
               }
               
                    
            })
        }



    })

}
module.exports=getLoansHistory