const database = require("../../../config/database");
const mysql=require('mysql')
const getTotalFinedEmployees = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("select count (employee_id) from fines where date >="+req.query.from_date+"and date<="+req.query.to_date, (err, fineData, fields) => {
                console.log(err)
                res.send(fineData) 
                    
            })
        }



    })

}

module.exports=getTotalFinedEmployees