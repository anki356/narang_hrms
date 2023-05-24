const database = require("../../../config/database");
const mysql = require("mysql")
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');


const register=(req,res,next)=>{
    const role_id=req.body.result.role_id
    database.query("Select * from roles where id="+role_id,(err,result)=>{
       if(err)console.log(err)
       console.log(result[0].id)
        let allowed_roles=['Super Admin']
        if(allowed_roles.includes(result[0].role_name) ){
            database.query("Select * from roles where role_name="+mysql.escape(req.body.role),(err,roleResult,fields)=>{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                database.query("select * from users where username="+mysql.escape(req.body.username),(err,endResult,fields)=>{
                   
                    if(endResult.length===0){
                        database.query("Insert into users (role_id,username,password) values("+roleResult[0].id+","+mysql.escape(req.body.username)+","+mysql.escape(hash)+")",(err,endResult,fields)=>{
                            res.send(endResult)
                            
                        })
                    }else{
                        res.json({
                            statusCode:401,
                            error:"Username is Already Registered"
                        })
                    }
                })
                
            })
        })
    }else{
        res.json({
            statusCode:403,
            error:"Unauthorized Access"
        })

    }
        
        
    })

}
module.exports=register