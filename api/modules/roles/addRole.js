const database = require("../../../config/database");
const mysql = require("mysql")
const addRole = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            
            database.query("Insert into roles (role_name,location_id,department_id) values("+mysql.escape(req.body.role_name)+","+req.body.location_id+","+req.body.department_id+")", (err, roleData, fields) => {
                console.log(roleData)
                let pr={}
            if(req.body.attendance===true){
pr.pr=new Promise((resolve,reject)=>{
    pr.resolve=resolve
    pr.reject=reject
})
                database.query("Insert into permission_roles (role_id,permission_id) values("+roleData.insertId+","+1+")",(err,permissionata)=>{
pr.resolve(true)
                })
            }
            if(req.body.timing_approval===true){
                pr.pr=new Promise((resolve,reject)=>{
                    pr.resolve=resolve
                    pr.reject=reject
                })
                database.query("Insert into permission_roles (role_id,permission_id) values("+roleData[0].id+","+2+")",(err,permissionata)=>{
                    pr.resolve(true)
                                    })
            }
            if(req.body.interview===true){
                pr.pr=new Promise((resolve,reject)=>{
                    pr.resolve=resolve
                    pr.reject=reject
                })
                database.query("Insert into permission_roles (role_id,permission_id) values("+roleData.insertId+","+3+")",(err,permissionata)=>{
                    pr.resolve(true)
                                    })
            }
            if(req.body.employee_detail===true){
                pr.pr=new Promise((resolve,reject)=>{
                    pr.resolve=resolve
                    pr.reject=reject
                })
                database.query("Insert into permission_roles (role_id,permission_id) values("+roleData.insertId+","+4+")",(err,permissionata)=>{
                    pr.resolve(true)
                                    })
            }
            if(req.body.salary===true){
                pr.pr=new Promise((resolve,reject)=>{
                    pr.resolve=resolve
                    pr.reject=reject
                })
                database.query("Insert into permission_roles (role_id,permission_id) values("+roleData.insertId+","+5+")",(err,permissionata)=>{
                    pr.resolve(true)
                                    })
            }
            if(req.body.fine_management===true){
                pr.pr=new Promise((resolve,reject)=>{
                    pr.resolve=resolve
                    pr.reject=reject
                })
                database.query("Insert into permission_roles (role_id,permission_id) values("+roleData.insertId+","+6+")",(err,permissionata)=>{
                    pr.resolve(true)
                                    })
            }
            Promise.all([pr.pr]).then(()=>{

                res.send(roleData) 
            })
                    
            })
        }


    })

}

module.exports=addRole