const database = require("../../../config/database");
const mysql = require("mysql")
const getHierarchy = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head', 'Admin', 'Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
database.query("select * from hierarchy where parent_role_id="+req.query.role_id,(err,hierarchyData)=>{
    res.send(hierarchyData)
})
        }
    })
}

module.exports = getHierarchy