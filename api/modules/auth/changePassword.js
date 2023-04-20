const database = require("../../../config/database");
const mysql = require("mysql")
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');


const changePassword=(req,res,next)=>{
    const role_id=req.body.result.role_id
    database.query("Select * from roles where id="+role_id,(err,result)=>{
       if(err)console.log(err)
      
        let allowed_roles=['Super Admin']
        if(allowed_roles.includes(result[0].role_name) ){
        
            database.query("Select * from roles where role_name="+mysql.escape(req.body.role),(err,roleResult,fields)=>{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
             
                database.query("Update users set password="+mysql.escape(hash)+"where username="+mysql.escape(req.body.username),(err,endResult,fields)=>{
                    console.log(err)
                    res.send(endResult)
                })
            })
                
            })
        }
        
        
    })

}
module.exports=changePassword