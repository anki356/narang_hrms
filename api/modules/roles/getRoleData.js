const database = require("../../../config/database");
const mysql = require("mysql")
const getRoleData = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Assistant','HR Head','Admin','Super Admin','Guard','Floor Incharge']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("select departments.name as department_name,locations.name as location_name,roles.id as id,roles.role_name as role_name ,roles_locations.id as role_location_id,hierarchy.parent_role_id as parent_role_id, locations.id as location_id from roles  left join roles_locations on roles_locations.role_id=roles.id left join  locations on locations.id=roles_locations.location_id left join hierarchy on hierarchy.child_role_id=roles_locations.id left join departments on departments.id =roles.department_id where roles.id="+req.query.id, (err, roleData, fields) => {
                console.log("role_data",roleData)
                database.query("select roles.id as parent_role_id,roles.role_name as parent_role_name from roles left join roles_locations on roles_locations.role_id =roles.id left join hierarchy on hierarchy.parent_role_id =roles_locations.id where hierarchy.parent_role_id="+roleData[0].parent_role_id,(err,result)=>{
                    roleData[0].parent_role_id=result.length>0?result[0].parent_role_id:null
                    roleData[0].parent_role_name=result.length>0?result[0].parent_role_name:null

                    database.query("select permissions.name from permission_roles left join permissions on permissions.id=permission_roles.permission_id where role_id="+req.query.id,(err,permissionData)=>{

                        roleData.forEach((data)=>{
    data.permissions=permissionData
                        })
                        res.send(roleData) 
                    })
                })
              
                    
            })
        }
    })

}

module.exports=getRoleData