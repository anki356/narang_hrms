const database = require("../../../config/database");
const getTotalPendingEmis = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT count(loan_id) as count_id from loan  left join employees on employees.id=loan.employee_id where loan.status='Pending'" +" and employees.status=1" , (err, loanRepaymentData, fields) => {
             console.log(err)
                res.send(loanRepaymentData) 
                    
            })
        }



    })

}
module.exports=getTotalPendingEmis