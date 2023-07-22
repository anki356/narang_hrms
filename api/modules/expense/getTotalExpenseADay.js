const database = require("../../../config/database");

const mysql = require("mysql")
const getTotalExpenseADay = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Admin', 'Super Admin', 'HR Head', 'HR Assistant','Floor Incharge']
        if (allowed_roles.includes(result[0].role_name)) {
            if(result[0].role_name.split(" ")[0]==='Floor'){
              let  queryString="SELECT sum(amount)as total from expenses left join employees on employees.id=expenses.employee_id left join job_details on job_details.id=employees.job_details_id where date>="+mysql.escape(req.query.from_date)+" and date<"+mysql.escape(req.query.to_date)+" and expenses.status='Approved'" +" and employees.status=1" 
                database.query("select employees.id from employees left join job_details on job_details.id=employees.job_details_id where job_details.role_id="+role_id,(err,employeesResult,fields)=>{
                    console.log(err)
                    queryString+=" and job_details.head_employee_id=" +employeesResult[0].id
            database.query( queryString, (err, expense_total, fields) => {
                res.send(expense_total) 
                    
            })
        })
    }else{
        let  queryString="SELECT sum(amount)as total from expenses left join employees on employees.id=expenses.employee_id left join job_details on job_details.id=employees.job_details_id where date>="+mysql.escape(req.query.from_date)+" and date<"+mysql.escape(req.query.to_date)+" and expenses.status='Approved'" +" and employees.status=1" 
        database.query( queryString, (err, expense_total, fields) => {
            console.log(err,queryString,expense_total)
            res.send(expense_total) 
                
        })

    }
        }


    })

}

module.exports=getTotalExpenseADay