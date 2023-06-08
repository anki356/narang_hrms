const database = require("../../../config/database");
const mysql=require('mysql')
const getEmployees = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id,async (err, result) => {
        if (err) console.log(err)
        let employeeId
        let allowed_roles = ['HR Assistant', 'HR Head', 'Admin', 'Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
           if(req.files){
            database.query("Insert into file_upload (type,name,created_on) values('photo'," + mysql.escape(req.files[0].filename) + ",current_timestamp())", (err, fileUploadResult, fields) => {
                        
                let photo_id = fileUploadResult.insertId
               
                    database.query("update job_details set head_employee_id="+req.body.head_employee_id+",hired_by_employee_id="+req.body.hired_by_employee_id+",hiring_date_time="+req.body.hiring_date_time+",lead_from="+mysql.escape(req.body.lead_from)+",location="+mysql.escape(req.body.location)+",role_id="+req.body.role_id+",store_department_id="+req.body.store_department_id+",floor_id="+req.body.floor_id+",store_id="+req.body.store_id+",epf_no="+req.body.epf_no+",esi_no="+req.body.esi_no+",department_id="+req.body.store_department_id+" where id=(select job_details_id  from employees where id="+req.params.id, (err, jobDetailsResult, fields) => {
                        
                        database.query("update bank_details set name="+mysql.escape(req.body.bank_name)+",branch="+mysql.escape(req.body.branch)+",ifsc="+mysql.escape(req.body.ifsc)+",account_number="+req.body.account_number+ " where id=(select bank_details_id  from employees where id="+req.params.id, (err, bankDetailsResult, fields) => {
                            console.log(err)
                   database.query("update employees set name="+mysql.escape(req.body.name)+",father_name="+mysql.escape(req.body.father_name)+",phone="+req.body.phone+",emergency_number="+req.body.emergency_no+",dob="+mysql.escape(req.body.dob)+",gender="+mysql.escape(req.body.gender)+",marital_status="+mysql.escape(req.body.marital_status)+",qualification="+ mysql.escape(req.body.qualification)+",local_address="+mysql.escape(req.body.local_address)+",permanent_address="+mysql.escape(req.body.permanent_address)+",aadhar_no="+req.body.aadhar_no+",pan_no="+mysql.escape(req.body.pan_no)+",photo_id="+countId+",uan_no="+req.body.uan_no+",fine_management="+req.body.fine_management+",min_wages_as_per_rule="+req.body.min_wages_as_per_rule+",type="+mysql.escape(req.body.type)+",sub_type="+mysql.escape(req.body.sub_type)+",supervisor_id="+req.body.supervisor_id+" where id="+req.params.id, (err, employeesResult, fields) => {
                    console.log(err)  
                    employeeId = employeesResult.insertId
database.query("update base_salaries set amount="+ req.body.base_salary+"where employee_id="+req.params.id,(err,baseSalariesResult)=>{
console.log(baseSalariesResult,err)
let promiseArray=[]
                    req.files.forEach((data,index) => {
                        var pr={}
                        pr.promise=new Promise((resolve,reject)=>{
                           pr.resolve=resolve
                           pr.reject=reject
            
                        })
    promiseArray[index]=pr.promise
                        if(index!==0){
                            database.query("Insert into file_upload (type,name,created_on) values("+mysql.escape("application_document")+"," + mysql.escape(data.filename) + ",current_timestamp())", (err, fileUploadResultSecond, fields) => {
                                database.query("update  documents set file_id=" + fileUploadResultSecond.insertId + "where employee_id="+req.query.employee_id, (err, documentResult, fields) => {
                                    pr.resolve(true)
        
                                })
                            })
                        }
                        else{
                            pr.resolve(true)
                        }
                       
                               
                                    

                            })
                            Promise.all(promiseArray).then(()=>{
                            res.json({"employeesResult":employeesResult,"fileUploadResult":fileUploadResult,"bankDetailsResult":bankDetailsResult,"jobDetailsResult":jobDetailsResult,"baseSalariesResult":baseSalariesResult})
                            })
                        })
                    })
                })
            })
        
        
        

    })

           }
           else{
            database.query("update job_details set head_employee_id="+req.body.head_employee_id+",hired_by_employee_id="+req.body.hired_by_employee_id+",hiring_date_time="+req.body.hiring_date_time+",lead_from="+mysql.escape(req.body.lead_from)+",location="+mysql.escape(req.body.location)+",role_id="+req.body.role_id+",store_department_id="+req.body.store_department_id+",floor_id="+req.body.floor_id+",store_id="+req.body.store_id+",epf_no="+req.body.epf_no+",esi_no="+req.body.esi_no+",department_id="+req.body.store_department_id+"where(select job_details_id  from employees where id="+req.params.id, (err, jobDetailsResult, fields) => {
                database.query("update bank_details set name="+mysql.escape(req.body.bank_name)+",branch="+mysql.escape(req.body.branch)+",ifsc="+mysql.escape(req.body.ifsc)+",account_number="+req.body.account_number+ " where id=(select bank_details_id  from employees where id="+req.params.id, (err, bankDetailsResult, fields) => {
                    database.query("update employees set name="+mysql.escape(req.body.name)+",father_name="+mysql.escape(req.body.father_name)+",phone="+req.body.phone+",emergency_number="+req.body.emergency_no+",dob="+mysql.escape(req.body.dob)+",gender="+mysql.escape(req.body.gender)+",marital_status="+mysql.escape(req.body.marital_status)+",qualification="+ mysql.escape(req.body.qualification)+",local_address="+mysql.escape(req.body.local_address)+",permanent_address="+mysql.escape(req.body.permanent_address)+",aadhar_no="+req.body.aadhar_no+",pan_no="+mysql.escape(req.body.pan_no)+",uan_no="+req.body.uan_no+",fine_management="+req.body.fine_management+",min_wages_as_per_rule="+req.body.min_wages_as_per_rule+",type="+mysql.escape(req.body.type)+",sub_type="+mysql.escape(req.body.sub_type)+",supervisor_id="+req.body.supervisor_id+" where id="+req.params.id, (err, employeesResult, fields) => {
                    })
                })
            })

           }
                   
            

        }



    })

}

module.exports = getEmployees