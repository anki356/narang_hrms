const database = require("../../../config/database");
const mysql=require('mysql')
const getTotalEmployeesTakenLoan = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT count(distinct employee_id ) as count_id from loan where date>="+mysql.escape(req.query.from_date)+" and date<"+mysql.escape(req.query.to_date)+" and status='Approved'" , (err, loanData, fields) => {
                console.log(err)
                res.send(loanData) 
                    
            })
        }



    })

}
module.exports=getTotalEmployeesTakenLoan