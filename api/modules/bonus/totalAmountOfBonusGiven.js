const database = require("../../../config/database");
const mysql=require('mysql')
const totalAmountOfBonusGiven = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','Super Admin','Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            
                let queryString="select sum(amount) as total from bonus left join employees on employees.id=bonus.employee_id where bonus.created_on>='"+req.query.year+"-01-01' and bonus.created_on<='"+req.query.year+"-12-31'" +" and employees.status=1"  
                database.query(queryString,(err,result)=>{
                   console.log(err)
                    res.send(result)
                })
          
        
        }


    })

}

module.exports=totalAmountOfBonusGiven