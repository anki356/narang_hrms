const database = require("../../../config/database");
const mysql = require('mysql')

const fs = require('fs')
const editEmployee = (req, res, next) => {
    var documentUploadResult = []
    var fileUploadResultArray=[]
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, async (err, result) => {
        if (err) console.log(err)
        let employeeId
        database.query("select role_id ,permissions.name from permission_roles left join permissions on permissions.id=permission_roles.permission_id where name='Employee Detail'", (
            err, allowed_roles
        ) => {


            allowed_roles = allowed_roles.map((data) => {
                return data.role_id
            })
            if (allowed_roles.includes(role_id)) {

database.query("update employees set status=1 where employees.id="+req.params.id,(err,result)=>{
    res.send(result)
})

            }
            
        })
    })
}