const database = require("../../../config/database");
const mysql=require('mysql')
const getTotalFines = (req, res, next) => {
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

    })

}

module.exports=getTotalFines