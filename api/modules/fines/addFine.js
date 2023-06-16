const database = require("../../../config/database");
const mysql=require('mysql')
const addFine = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        database.query("select role_id ,permissions.name from permission_roles left join permissions on permissions.id=permission_roles.permission_id where name='Fine Management'",(
            err,allowed_roles 
         )=>{
           
            console.log(allowed_roles) 
           allowed_roles=allowed_roles.map((data)=>{
             return data.role_id
           })
        if (allowed_roles.includes(role_id)) {
            database.query("Insert into fines (employee_id,amount,reason,date,status,payment_status) values("+req.body.employee_id+","+req.body.amount+"," +mysql.escape(req.body.reason)+",current_timestamp(),'Pending','Unpaid')", (err, fineData, fields) => {
                console.log(err)
                res.send(fineData) 
                    
            })
        }

    })

    })

}

module.exports=addFine