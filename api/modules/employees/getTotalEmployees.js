const database = require("../../../config/database");
const mysql=require('mysql')
const getTotalEmployees = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Assistant','HR Head','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="SELECT count(id ) as count_id from employees"
           
            if(req.query.type){
                queryString+=" where type=" +req.query.type
               }
               
            
            database.query(queryString , (err, employeesResult, fields) => {
                console.log()
              res.send(employeesResult)
            })
        }



    })

}

module.exports=getTotalEmployees