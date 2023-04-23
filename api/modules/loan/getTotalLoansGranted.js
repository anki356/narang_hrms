const database = require("../../../config/database");
const getTotalLoansGranted = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT sum(amount) from loan where date>="+req.query.from_date+"and date <"+req.query.to_date+"and status='Approved'" , (err, loanData, fields) => {
             
                res.send(loanData) 
                    
            })
        }



    })

}
module.exports=getTotalLoansGranted