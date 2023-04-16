const database = require("../../../config/database");
const mysql = require("mysql")
const addBonus = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("select amount from base_salaries where role_id=8", (err, baseSalariesData, fields) => {
                
                    let amount=req.body.percentage*baseSalariesData[0].amount/100
                database.query("Insert Into bonus (employee_id,percentage,amount,status) values ("+mysql.escape(req.body.employee_id)+","+mysql.escape(req.body.percentage)+"," +mysql.escape(amount)+",'pending')", (err, bonusData, fields) => {
                    res.send(bonusData) 
                        
                })
            })
        }


    })

}

module.exports=addBonus