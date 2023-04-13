const database = require("../../../config/database");
const mysql=require('mysql')
const addFine = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','HR Assistant']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("Insert into fines (employee_id,amount,reason,date,status,payment_status) values("+req.body.employee_id+","+req.body.amount+"," +mysql.escape(req.body.reason)+",current_timestamp(),'Pending','Unpaid')", (err, fineData, fields) => {
                console.log(err)
                res.send(fineData) 
                    
            })
        }



    })

}

module.exports=addFine