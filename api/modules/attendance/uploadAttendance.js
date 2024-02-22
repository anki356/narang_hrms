
const mysql = require("mysql")
const moment = require('moment')
const axios = require('axios');
const fs = require('fs');
const database=mysql.createPool({ host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database:process.env.DATABASE,
    port:3307})
const csv = require('fast-csv');
const uploadAttendance = (req, res, next) => {

    const role_id = req.body.result.role_id
 console.log(__dirname)
 database.query("Select * from roles where id=" + role_id, (err, result) => {
    database.query(
      "select role_id ,permissions.name from permission_roles left join permissions on permissions.id=permission_roles.permission_id where name='Attendance'",
      (err, allowed_roles) => {
        allowed_roles = allowed_roles.map((data) => {
          return data.role_id;
        });
        // let allowed_roles = ['Admin', 'Super Admin', 'HR Head', 'HR Assistant','Floor Incharge']

        if (allowed_roles.includes(role_id)) {
   
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
                                let promiseArray=[]
                                                  
                                                       
                        csvData.forEach((data,index)=>{
                            let pr={}
                            pr.promise=new Promise((resolve,reject)=>{
        pr.resolve=resolve
        pr.reject=reject
                            })
                            promiseArray[index]=pr.promise
                            console.log(data)
                            if(!moment.isMoment(moment(data[1]))){
res.status(500)
res.json("Invalid date")
return
                            }
                            let query="select id from employees where employee_id="+data[0]+" and Status=1"
                            connection.query(query,(err,resultsEmployee)=>{
                                
                           
                            query="update attendance set check_in_datetime="+mysql.escape(moment(data[1]).format("YYYY-MM-DD HH:mm:ss"))+",status='Present', no_of_shifts="+data[2]+" where employee_id="+resultsEmployee[0].id+" and check_in_datetime>="+mysql.escape(moment(data[1]).set('h',0).set('m',0).set('s',0).format("YYYY-MM-DD HH:mm:ss"))+ "and check_in_datetime<"+mysql.escape(moment(data[1]).add(1,'d').set('h',0).set('m',0).set('s',0).format("YYYY-MM-DD HH:mm:ss"))
                            console.log(query)
                            connection.query(query,(err,results)=>{
                                console.log(err)
                                if (err!=null) res.sendStatus(500);
                               
                                if(moment(data[1]).diff(moment(data[1]).set('h',10).set('m',40),'m')>0){
                                   database.query("select * from fines where employee_id="+resultsEmployee[0].id+" and reason ='Late Coming'"+"and date="+mysql.escape(moment(mysql.escape(data[1])).format("DD-MM-YYYY")),(err,result)=>{
                                    console.log(err)
                                    if(result.length===0){
                                        let fine=moment(data[1]).diff(moment(data[1]).set('h',10).set('m',40),'m')
                                        database.query("Insert into fines (employee_id,amount,reason,date,recall_head,head_approval,status,payment_status,status_date) values (" + resultsEmployee[0].id + "," + fine + ",'Late Coming',"+mysql.escape(moment(mysql.escape(data[1])).format("DD-MM-YYYY"))+",1,1,'Approved','Unpaid',current_timestamp)", (err, fineResult) => {
                                            if (err!=null) res.sendStatus(500);
                                            else{
                                                pr.resolve(true)
                                                
                                            }
                                        })  
                                    }
                                    else{
                                        pr.resolve(true)
                                    }
                                  
                                   })
                                        
                                    } 
                                    else{
                                        pr.resolve(true)
                                    }
                                    
                                  
                                
                               
                            })
                        })
                        Promise.all(promiseArray).then(()=>{
                            res.json("SuccessFully Uploaded")
                        })
                    })
                            }
                    
                        })
                
                        fs.unlinkSync(uri)
                    })
                    stream.pipe(fileStream)
                    }
               uploadCSV(__dirname.replace("api\\modules\\attendance","uploads\\")+req.files[0].filename)    
            }
        })
        })
    
  
}


module.exports = uploadAttendance