const database=require("../../../config/database");
const mysql=require("mysql")
const bcrypt=require('bcryptjs')
var jwt = require('jsonwebtoken');
const verifyLogin=(req,res,next)=>{


    
    database.connect(()=>{
        database.query("SELECT * from users WHERE username = "+mysql.escape(req.body.username),(err,userResult,fields)=>{
            console.log(userResult)

if(userResult.length===0){
    
   
res.json({
    statusCode:401,
    error:"Username is in correct"
})

}
else{
    
        bcrypt.compare(req.body.password, userResult[0].password, function(err, result) {
            if (err) res.json({
                statusCode:401,
                error:"Password is incorrect"
            })
            var token=jwt.sign({
                data: {
                    username:userResult[0].username,
                    role_id:userResult[0].role_id
                }
              }, 'secret');
res.json({
    token:token,
    username:userResult[0].username,
    role_id:userResult[0].role_id
})
            
        })

}
        })
    })
    
   
}
module.exports=verifyLogin