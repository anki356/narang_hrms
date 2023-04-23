const database = require("../../../config/database");
const getTotalEmployeesTakenLoan = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT count(distinct employee_id ) from loan where date>="+req.query.from_date+"and date <"+req.query.to_date+"and status='Approved'" , (err, loanData, fields) => {
             
                res.send(loanData) 
                    
            })
        }



    })

}
module.exports=getTotalEmployeesTakenLoan