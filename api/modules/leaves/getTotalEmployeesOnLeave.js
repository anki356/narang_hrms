const database = require("../../../config/database");
const mysql = require("mysql")
const getTotalEmployeesOnLeave = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','Super Admin','Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT count (leaves.employee_id) as count_id from leaves left join employees on employees.id=leaves.employee_id where leaves.from_date<="+mysql.escape(req.query.from_date)+" and leaves.to_date>="+mysql.escape(req.query.to_date)+" and employees.status=1" , (err, leavesData, fields) => {
                console.log(err)
                res.send(leavesData) 
                    
            })
        }



    })

}
module.exports=getTotalEmployeesOnLeave