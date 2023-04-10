const mysql=require('mysql')
require("dotenv").config()
const conn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASWWORD,
    database:process.env.DATABASE
  });

  
module.exports=conn  