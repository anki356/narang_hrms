const database = require("../../../config/database");
const mysql = require("mysql")
const getRoles = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Assistant','HR Head','Admin','Super Admin','Guard','Floor Incharge 1', 'Floor Incharge 2']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="select roles.role_name as name,departments.name as department_name ,roles.id as id, GROUP_CONCAT(locations.name  SEPARATOR ', ') AS location_name from roles  left join roles_locations on roles.id=roles_locations.role_id left join locations on locations.id =roles_locations.location_id left join departments on departments.id=roles.department_id " 
            if(req.query.department_id){
                queryString+=" where department_id="+req.query.department_id
            }
           
            if(req.query.location_id){
                queryString+=" where location_id="+req.query.location_id
            }
            queryString+=" group by roles.id order by roles.role_name asc "

            if(req.query.limit){
                queryString+=" limit "+req.query.limit
               }
               if(req.query.offset){
                queryString+=" Offset "+req.query.offset
              
               }
            database.query(queryString, (err, roleData, fields) => {
                console.log(err)
                res.send(roleData) 
                    
            })
        }
    })

}

module.exports=getRoles