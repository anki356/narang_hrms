const database = require("../../../config/database");
const getTotalEmployees = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Admin', 'Super Admin', 'HR Head', 'HR Assistant']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT count(employee_id) from expenses where date>="+req.query.from_date+"and date<"+req.query.to_date+"and status='Approved'" , (err, expenseData, fields) => {
                res.send(expenseData) 
                    
            })
        }


    })

}

module.exports=getTotalEmployees