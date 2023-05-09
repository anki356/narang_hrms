const database = require("../../../config/database");

const mysql = require("mysql")
const getPendingExpenses = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Admin', 'Super Admin', 'HR Head', 'HR Assistant','Floor Incharge 1','Floor Incharge 2']
        if (allowed_roles.includes(result[0].role_name)) {
            if(result[0].role_name.split(" ")[0]==='Floor'){
                let  queryString="SELECT count( expenses.id) as total from expenses left join employees on employees.id=expenses.employee_id left join job_details on job_details.id=employees.job_details_id where date>="+mysql.escape(req.query.from_date)+" and date<"+mysql.escape(req.query.to_date)+" and status='Pending'"
                  database.query("select employees.id from employees left join job_details on job_details.id=employees.job_details_id where job_details.role_id="+role_id,(err,employeesResult,fields)=>{
                      
                      queryString+=" and job_details.head_employee_id=" +employeesResult[0].id
              database.query( queryString, (err, expense, fields) => {
                  res.send(expense) 
                      
              })
          })
      }else{
          let  queryString="SELECT count(expenses.id) as total from expenses left join employees on employees.id=expenses.employee_id left join job_details on job_details.id=employees.job_details_id where date>="+mysql.escape(req.query.from_date)+" and date<"+mysql.escape(req.query.to_date)+" and status='Pending'"
          database.query( queryString, (err, expense, fields) => {
              res.send(expense) 
                  
          })
  
      }
        }


    })

}

module.exports=getPendingExpenses