const database = require("../../../config/database");
const mysql = require("mysql")
const getRoleData = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Assistant','HR Head','Admin','Super Admin','Guard','Floor Incharge 1', 'Floor Incharge 2']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("select *,roles.id as id,locations.name as location_name from roles  left join locations on locations.id=roles.location_id left join users on users.role_id=roles.id where roles.id="+req.query.id, (err, roleData, fields) => {
                console.log(err)
                database.query("select permissions.name from permission_roles left join permissions on permissions.id=permission_roles.permission_id where role_id="+req.query.id,(err,permissionData)=>{

                    roleData.forEach((data)=>{
data.permissions=permissionData
                    })
                    res.send(roleData) 
                })
                    
            })
        }
    })

}

module.exports=getRoleData