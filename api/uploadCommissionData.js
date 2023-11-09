const mysql = require('mysql');
const multer = require('multer');
const fs = require('fs');
require("dotenv").config()
const database=mysql.createPool({ host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database:process.env.DATABASE,
    port:3307})
const csv = require('fast-csv');
// Create a MySQL database connection
const uploadCommissionData=(req,res,next)=>{
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [ 'Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {

    console.log(__dirname)
    const uploadCSV=(uri)=>{
        let stream=fs.createReadStream(uri)
        let csvData=[]
        let fileStream=csv.parse({strictColumnHandling: true, headers: false}).on('data',(data)=>{
            csvData.push(data)
        }).on('end',()=>{
            csvData.shift()
            database.getConnection((error,connection)=>{
                if (error) console.log(error)
                else{
            let query="Insert into commission (employee_id,employee_name,date,commission) values ?"
            connection.query(query, [csvData],(err,results)=>{
                if (err!=null&&err.errno===1062) res.sendStatus(409);
                else{
                    console.log(results)
                    
                }
            })
                }
            })
            fs.unlinkSync(uri)
        })
        stream.pipe(fileStream)
        }
   uploadCSV(__dirname.replace("api","uploads/")+req.files[0].filename)
    
    // Create a table in the MySQL database with the same columns as the CSV file
    
    
    // Use the `mysql` library to insert the data from the CSV file into the MySQL table
   
  
}

    })


}
module.exports=uploadCommissionData
// Use multer to upload the CSV file to the server

// Close the MySQL database connection
