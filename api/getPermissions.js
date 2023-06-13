const database = require("../config/database");
const mysql = require("mysql")
const getPermissions = (req, res, next) => {
    const role_id = req.body.result.role_id
            database.query("select *,permissions.name from permission_roles left join permissions on permissions.id=permission_roles.permission_id  where role_id="+role_id, (err, permissions, fields) => {
                res.send(permissions) 
                    
            })
       

}

module.exports=getPermissions