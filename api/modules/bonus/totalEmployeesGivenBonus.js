const database = require("../../../config/database");
const mysql=require('mysql')
const totalEmployeesGivenBonus = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','Super Admin','Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            
                let queryString="select count(distinct employee_id) as count_id from bonus where created_on>='"+req.query.year+"-01-01' and created_on<='"+req.query.year+"-12-31'"
                database.query(queryString,(err,result)=>{
                   
                    res.send(result)
                })
          
        
        }


    })

}

module.exports=totalEmployeesGivenBonus