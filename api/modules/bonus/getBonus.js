const database = require("../../../config/database");
const getBonus = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("select amount from base_salaries where role_id=8", (err, baseSalariesData, fields) => {
                
                    
                database.query("select bonus.*, employees.name as employee_name,employees.employee_id as empID from bonus left join employees on employees.id=bonus.employee_id", (err, bonusData, fields) => {
                    res.json({"bonusData":bonusData,"baseSalariesData":baseSalariesData}) 
                        
                })
            })
        }


    })

}

module.exports=getBonus