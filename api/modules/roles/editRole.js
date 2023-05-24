const database = require("../../../config/database");
const mysql = require("mysql")
const bcrypt=require('bcryptjs')
const editRole = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="Update roles set role_name="+mysql.escape(req.body.role_name)
            if(req.body.floor_id!==null){
                queryString+=",floor_id="+req.body.floor_id
            }
            if(req.body.store_id!==null){
                queryString+=",store_id="+req.body.store_id
            }
            queryString+="where id="+req.params.id
            database.query(queryString,(err,result)=>{
                if(req.body.password!==null)
               {
                bcrypt.hash(req.body.password,10,(err,hash)=>{
database.query("update users set username="+mysql.escape(req.body.username)+" ,password="+mysql.escape(hash)+" where role_id="+req.params.id,(err,userResult)=>{
   console.log(err)
    res.send(userResult)
})
                })
               } 
               else{
                database.query("update users set username="+mysql.escape(req.body.username)+" where role_id="+req.params.id,(err,userResult)=>{
                    console.log(err)
                    res.send(userResult)
                })
               }
            })
        }


    })

}

module.exports=editRole