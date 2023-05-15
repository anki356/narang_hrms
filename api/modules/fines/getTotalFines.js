const database = require("../../../config/database");
const mysql=require('mysql')
const getTotalFines = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','HR Assistant','Super Admin','Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="select sum (amount) as amount from fines where date >="+req.query.from_date+" and date<="+req.query.to_date
            if(req.query.employee_id){
                queryString+=" and fines.employee_id = "+req.query.employee_id
              
               }
            queryString
            database.query(queryString, (err, fineData, fields) => {
                console.log(err)
                res.send(fineData) 
                    
            })
        }



    })

}

module.exports=getTotalFines