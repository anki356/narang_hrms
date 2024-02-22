const database = require("../../../config/database");
const mysql=require('mysql')
const getTotalEmployeesTakenLoan = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT count(distinct loan.employee_id ) as count_id from loan left join employees on employees.id=loan.employee_id where date>="+mysql.escape(req.query.from_date)+" and date<"+mysql.escape(req.query.to_date)+" and loan.status='Approved'" +" and employees.status=1" , (err, loanData, fields) => {
                console.log(err)
                res.send(loanData) 
                    
            })
        }



    })

}
module.exports=getTotalEmployeesTakenLoan