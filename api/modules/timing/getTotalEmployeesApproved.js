
const database = require("../../../config/database");
const mysql=require('mysql')
const getTotalEmployeesApproved = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [ 'Floor Incharge 1','Floor Incharge 2','Guard']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="SELECT count(distinct timing.employee_id) as count_id from timing left join employees on employees.id=timing.employee_id left join job_details on job_details.id=employees.job_details_id where timing.approval_status='Approved' and date>="+mysql.escape(req.query.from_date)+" and date<"+mysql.escape(req.query.to_date)+" and status_id ="+role_id
            if(req.query.in_time){
queryString+=" and in_time="+req.query.in_time
            }
            if(result[0].role_name.split(" ")[0]==='Floor'){
                database.query("select employees.id from employees left join job_details on job_details.id=employees.job_details_id where job_details.role_id="+role_id,(err,employeesResult,fields)=>{
                    console.log(err)
                    queryString+=" and job_details.head_employee_id=" +employeesResult[0].id  
            database.query( queryString, (err, timingResult, fields) => {
                console.log(err)
                res.send(timingResult) 
                    
            })
        })
    }
    else{
        database.query( queryString, (err, timingResult, fields) => {
            console.log(err)
            res.send(timingResult) 
                
        })
    }
        }


    })

}

module.exports=getTotalEmployeesApproved