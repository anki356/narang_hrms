const database = require("../../../config/database");
const mysql=require('mysql')
const getEmployees = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id,async (err, result) => {
        if (err) console.log(err)
        let employeeId
        let allowed_roles = ['HR Assistant', 'HR Head', 'Admin', 'Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
                    database.query("Insert into file_upload (type,name,created_on) values('photo'," + mysql.escape(req.files.photo[0].filename) + ",current_timestamp())", (err, fileUploadResult, fields) => {
                        console.log(fileUploadResult.insertId)
                        let photo_id = fileUploadResult.insertId
                        database.query("select count(id) as count_id from employees", (err, countEmployeeId, fields) => {
                            console.log(err)
                            let countId=123 + Number(countEmployeeId[0].count_id)
                            database.query("Insert into job_details (head_employee_id,hiring_date_time,lead_from,location,role_id,store_department_id,floor_id,store_id,epf_no,esi_no) values(" + req.body.head_employee_id + "," + req.body.hiring_date_time + "," + req.body.lead_from + "," + req.body.location + "," + req.body.role_id + "," + req.body.store_department_id + "," + req.body.floor_id + "," + req.body.store_id + "," + req.body.epf_no + "," + req.body.esi_no + ")", (err, jobDetailsResult, fields) => {
                                database.query("INSERT INTO bank_details (name,branch,ifsc,account_number) values(" + req.body.bank_name + "," + req.body.branch + "," + req.body.ifsc + "," + req.body.account_number + ")", (err, bankDetailsResult, fields) => {
                           database.query("Insert into employees(name,father_name,phone,emergency_number,employee_id,email_address,dob,gender,marital_status,qualification,local_address,permanent_address,aadhar_no,pan_no,photo_id,job_details_id,bank_details_id,uan_no,fine_management,min_wages_as_per_rule,type,sub_type) values(" + req.body.name + "," + req.body.father_name + "," + req.body.phone + "," + req.body.emergency_number + "," + countId + "," + req.body.email_address + "," + req.body.dob + "," + req.body.gender + "," + req.body.marital_status + "," + req.body.qualification + "," + req.body.local_address + "," + req.body.permanent_address + "," + req.body.aadhar_no + "," + mysql.escape(req.body.pan_no) + "," + photo_id+","+jobDetailsResult.insertId+","+bankDetailsResult.insertId+","+req.body.uan_no+","+req.body.fine_management+","+req.body.min_wages_as_per_rule+","+mysql.escape(req.body.type)+","+mysql.escape(req.body.sub_type)+")", (err, employeesResult, fields) => {
                            console.log(err)  
                            employeeId = employeesResult.insertId
     database.query("Insert into base_salaries (amount,employee_id) values("+req.body.base_salary+","+employeeId+")",(err,baseSalariesResult)=>{
console.log(baseSalariesResult,err)
     
                            req.files.document.forEach((data) => {
                                database.query("Insert into file_upload (type,name,created_on) values('documents'," + mysql.escape(data.filename) + ",current_timestamp())", (err, fileUploadResultSecond, fields) => {
                                    database.query("Insert into documents (file_id,employee_id) values(" + fileUploadResultSecond.insertId + "," + employeeId + ")", (err, documentResult, fields) => {
            console.log(err)
            
                                    })
                                })
                                       
                                            

                                    })
                                    res.json({"employeesResult":employeesResult,"fileUploadResult":fileUploadResult,"bankDetailsResult":bankDetailsResult,"jobDetailsResult":jobDetailsResult,"baseSalariesResult":baseSalariesResult})
                                })
                            })
                        })
                    })
                
                })
                

            })
    
            

        }



    })

}

module.exports = getEmployees