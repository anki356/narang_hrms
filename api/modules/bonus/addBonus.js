const database = require("../../../config/database");
const mysql = require("mysql")
const addBonus = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head']
        if (allowed_roles.includes(result[0].role_name)) {
            
                
                
                database.query("Insert Into bonus (employee_id,amount,status) values ("+mysql.escape(req.body.employee_id)+"," +mysql.escape(req.body.amount)+",'pending')", (err, bonusData, fields) => {
                   
                    res.send(bonusData) 
                        
                })
        
        }


    })

}

module.exports=addBonus