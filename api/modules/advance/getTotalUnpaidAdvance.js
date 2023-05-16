const database = require("../../../config/database");
const mysql=require('mysql')
const getTotalUnpaidAdvance = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT count(distinct employee_id ) as count_id from advance where payment_status='Unpaid'" , (err, advanceData, fields) => {
                console.log(err)
                res.send(advanceData) 
                    
            })
        }



    })

}
module.exports=getTotalUnpaidAdvance