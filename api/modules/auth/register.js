const database = require("../../../config/database");
const mysql = require("mysql")
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');


const register=(req,res,next)=>{
    const role_id=req.body.result.role_id
    database.query("Select * from roles where id="+role_id,(err,result)=>{
       if(err)console.log(err)
       console.log(result[0].id)
        let allowed_roles=['Admin','Super Admin','HR Head']
        if(allowed_roles.includes(result[0].role_name) ){
            database.query("Select * from roles where role_name="+mysql.escape(req.body.role),(err,roleResult,fields)=>{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                database.query("Insert into users (role_id,username,password) values("+roleResult[0].id+","+mysql.escape(req.body.username)+","+mysql.escape(hash)+")"),(err,endResult,fields)=>{
                    res.send(endResult)
                    next()
                }
            })
                
            })
        }
        
        
    })

}
module.exports=register