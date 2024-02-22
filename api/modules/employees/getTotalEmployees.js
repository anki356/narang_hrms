const database = require("../../../config/database");
const mysql=require('mysql')
const getTotalEmployees = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        database.query("select role_id ,permissions.name from permission_roles left join permissions on permissions.id=permission_roles.permission_id where name='Employee Detail'",(
            err,allowed_roles 
         )=>{
           
            console.log(allowed_roles) 
           allowed_roles=allowed_roles.map((data)=>{
             return data.role_id
           })
        if (allowed_roles.includes(role_id)) {
            let queryString="SELECT count(id ) as count_id from employees"+ " where employees.status=1" 
           
            if(req.query.type){
                queryString+=" and type=" +req.query.type
               }
               
            
            database.query(queryString , (err, employeesResult, fields) => {
                console.log()
              res.send(employeesResult)
            })
        }

    })

    })

}

module.exports=getTotalEmployees