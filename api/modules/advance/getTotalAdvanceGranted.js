const database = require("../../../config/database");
const mysql=require('mysql')
const getTotalAdvanceGranted = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT sum(amount) as amount from advance left join employees on  employees.id=advance.employee_id where date>="+mysql.escape(req.query.from_date)+" and date<"+mysql.escape(req.query.to_date)+" and advance.status='Approved'"  +" and employees.status=1"          , (err, advanceData, fields) => {
                console.log(err)
                res.send(advanceData) 
                    
            })
        }



    })

}
module.exports=getTotalAdvanceGranted