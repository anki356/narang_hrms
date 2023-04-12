const database = require("../../../config/database");
const getTotalPendingEmis = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT count(loan_id) from loan_repayment where month="+new Date().getMonth()+" and year="+new Date.getYear()+ "and status='Unpaid'" , (err, loanRepaymentData, fields) => {
             
                res.send(loanRepaymentData) 
                    
            })
        }



    })

}
module.exports=getTotalPendingEmis