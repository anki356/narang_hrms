const database = require("../../../config/database");
const mysql = require("mysql")
const getParentRole = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','Admin','Super Admin','HR Assistant']
        if (allowed_roles.includes(result[0].role_name)) {

database.query("Select roles_b.role_name,roles_b.id from hierarchy left join roles as roles_a on roles_a.id =hierarchy.child_role_id left join roles as roles_b on roles_b.id =hierarchy.parent_role_id where roles_a.id in("+req.query.role_id+")",(err,result)=>{
    console.log(err);
    res.send(result)
})

        }
    })
}
module.exports=getParentRole