const database = require("../../../config/database");
const mysql=require('mysql')
const getTotalFinedEmployees = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','HR Assistant','Super Admin','Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("select count (fines.employee_id) as count_id from fines left join employees on employees.id=fines.employee_id where date >="+mysql.escape(req.query.from_date)+" and date<="+mysql.escape(req.query.to_date) +" and employees.status=1" , (err, fineData, fields) => {
                console.log(err)
                res.send(fineData) 
                    
            })
        }



    })

}

module.exports=getTotalFinedEmployees