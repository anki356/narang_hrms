const database = require("../../../config/database");
const getTotalExpenseADay = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Admin', 'Super Admin', 'HR Head', 'HR Assistant']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT sum(amount) from expenses where date>="+req.query.today_date+"and date<"+req.query.tommorow_date , (err, expense_total, fields) => {
                res.send(expense_total) 
                    
            })
        }


    })

}

module.exports=getTotalExpenseADay