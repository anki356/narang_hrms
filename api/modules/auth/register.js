const database = require("../../../config/database");
const mysql = require("mysql")
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');


const register=async (username,password,employee_id)=>{
            
            bcrypt.hash(password,10,(err,hash)=>{
               
                        database.query("Insert into users (employee_id,username,password) values("+employee_id+","+mysql.escape(username)+","+mysql.escape(hash)+")",(err,endResult,fields)=>{
                            return true
                            
                        })
                  
                
            })
        
        

}
module.exports=register