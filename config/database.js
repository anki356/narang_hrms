const mysql=require('mysql')
require("dotenv").config()
const conn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database:process.env.DATABASE,
    port:3306
  });
  

  
module.exports=conn  