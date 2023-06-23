const database = require("../../../config/database");
const mysql = require('mysql')
const getEmployees = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, async (err, result) => {
        if (err) console.log(err)
        let employeeId
        database.query("select role_id ,permissions.name from permission_roles left join permissions on permissions.id=permission_roles.permission_id where name='Employee Detail'", (
            err, allowed_roles
        ) => {


            allowed_roles = allowed_roles.map((data) => {
                return data.role_id
            })
            if (allowed_roles.includes(role_id)) {
                console.log(req.files)
                database.query("Insert into file_upload (type,name,created_on) values('photo'," + mysql.escape(req.files[0].filename) + ",current_timestamp())", (err, fileUploadResult, fields) => {

                    let photo_id = fileUploadResult.insertId
                    database.query("select count(id) as count_id from employees", (err, countEmployeeId, fields) => {
                        console.log(err);
                        let countId = 123 + Number(countEmployeeId[0].count_id)
                        if (req.body.epf_no === undefined || req.body.epf_no === '') {
                            req.body.epf_no = null
                        }
                        if (req.body.esi_no === undefined || req.body.esi_no === '') {
                            req.body.esi_no = null
                        }
                        if (req.body.uan_no === undefined || req.body.uan_no === '') {
                            req.body.uan_no = null
                        }
                        if (req.body.head_employee_id === undefined || req.body.head_employee_id === '') {
                            req.body.head_employee_id = null
                        }
                        if (req.body.hired_by_employee_id === undefined || req.body.hired_by_employee_id === '') {
                            req.body.hired_by_employee_id = null
                        }
                        if (req.body.floor_id === undefined || req.body.floor_id === '') {
                            req.body.floor_id = null
                        }
                        if (req.body.supervisor_id === undefined || req.body.supervisor_id === '') {
                            req.body.supervisor_id = null
                        }
                        if (req.body.location_id === undefined || req.body.location_id === '') {
                            req.body.location_id = null
                        }
                        if (req.body.store_department_id === undefined || req.body.store_department_id === '') {
                            req.body.store_department_id = null
                        }

                        database.query("Insert into job_details (head_employee_id,hired_by_employee_id,hiring_date_time,lead_from,floor_id,location_id,role_id,store_department_id,epf_no,esi_no,department_id,supervisor_id) values(" + req.body.head_employee_id + "," + req.body.hired_by_employee_id + "," + mysql.escape(req.body.hiring_date_time) + "," + mysql.escape(req.body.lead_from) +","+req.body.floor_id+","+req.body.location_id  + "," + req.body.role_id + "," + req.body.store_department_id + "," + mysql.escape(req.body.epf_no) + "," + mysql.escape(req.body.esi_no) + "," + req.body.department_id + "," + req.body.supervisor_id + ")", (err, jobDetailsResult, fields) => {
                            console.log(err)
                            if (req.body.branch !== undefined && req.body.branch !== null && req.body.branch!=='') {

                            
                            database.query("INSERT INTO bank_details (name,branch,ifsc,account_number) values(" + mysql.escape(req.body.bank_name) + "," + mysql.escape(req.body.branch) + "," + mysql.escape(req.body.ifsc) + "," + req.body.account_number + ")", (err, bankDetailsResult, fields) => {
                                console.log(err)
                                database.query("Insert into employees(name,father_name,phone,emergency_number,employee_id,dob,gender,marital_status,qualification,local_address,permanent_address,aadhar_no,pan_no,photo_id,job_details_id,bank_details_id,uan_no,fine_management,min_wages_as_per_rule,type,sub_type) values(" + mysql.escape(req.body.name) + "," + mysql.escape(req.body.father_name) + "," + req.body.phone + "," + req.body.emergency_no + "," + countId + "," + mysql.escape(req.body.dob) + "," + mysql.escape(req.body.gender) + "," + mysql.escape(req.body.marital_status) + "," + mysql.escape(req.body.qualification) + "," + mysql.escape(req.body.local_address) + "," + mysql.escape(req.body.permanent_address) + "," + req.body.aadhar_no + "," + mysql.escape(req.body.pan_no) + "," + photo_id + "," + jobDetailsResult.insertId + "," + bankDetailsResult.insertId + "," + mysql.escape(req.body.uan_no) + "," + req.body.fine_management + "," + req.body.min_wages_as_per_rule + "," + mysql.escape(req.body.type) + "," + mysql.escape(req.body.sub_type) + ")", (err, employeesResult, fields) => {
                                    console.log(err)
                                    employeeId = employeesResult.insertId
                                    database.query("Insert into base_salaries (amount,employee_id) values(" + req.body.base_salary + "," + employeeId + ")", (err, baseSalariesResult) => {
                                        console.log(baseSalariesResult, err)
                                        database.query("Insert into weekoffs (week_off,employee_id) values(" + mysql.escape(req.body.week_off) + "," + employeeId + ")", (err, weekOffResult) => {
                                            let promiseArray = []
                                            req.files.forEach((data, index) => {
                                                var pr = {}
                                                pr.promise = new Promise((resolve, reject) => {
                                                    pr.resolve = resolve
                                                    pr.reject = reject

                                                })
                                                promiseArray[index] = pr.promise
                                                if (index !== 0) {
                                                    database.query("Insert into file_upload (type,name,created_on) values(" + mysql.escape("application_document") + "," + mysql.escape(data.filename) + ",current_timestamp())", (err, fileUploadResultSecond, fields) => {
                                                        database.query("Insert into documents (file_id,employee_id) values(" + fileUploadResultSecond.insertId + "," + employeeId + ")", (err, documentResult, fields) => {
                                                            pr.resolve(true)

                                                        })
                                                    })
                                                }
                                                else {
                                                    pr.resolve(true)
                                                }




                                            })
                                            Promise.all(promiseArray).then(() => {
                                                res.json({ "employeesResult": employeesResult, "fileUploadResult": fileUploadResult, "bankDetailsResult": bankDetailsResult, "jobDetailsResult": jobDetailsResult, "baseSalariesResult": baseSalariesResult })
                                            })
                                        })
                                    })
                                })
                            })
                        }else{
                            database.query("Insert into employees(name,father_name,phone,emergency_number,employee_id,dob,gender,marital_status,qualification,local_address,permanent_address,aadhar_no,pan_no,photo_id,job_details_id,uan_no,fine_management,min_wages_as_per_rule,type,sub_type) values(" + mysql.escape(req.body.name) + "," + mysql.escape(req.body.father_name) + "," + req.body.phone + "," + req.body.emergency_no + "," + countId + "," + mysql.escape(req.body.dob) + "," + mysql.escape(req.body.gender) + "," + mysql.escape(req.body.marital_status) + "," + mysql.escape(req.body.qualification) + "," + mysql.escape(req.body.local_address) + "," + mysql.escape(req.body.permanent_address) + "," + req.body.aadhar_no + "," + mysql.escape(req.body.pan_no) + "," + photo_id + "," + jobDetailsResult.insertId + "," + mysql.escape(req.body.uan_no) + "," + req.body.fine_management + "," + req.body.min_wages_as_per_rule + "," + mysql.escape(req.body.type) + "," + mysql.escape(req.body.sub_type) + ")", (err, employeesResult, fields) => {
                                console.log(err)
                                employeeId = employeesResult.insertId
                                database.query("Insert into base_salaries (amount,employee_id) values(" + req.body.base_salary + "," + employeeId + ")", (err, baseSalariesResult) => {
                                    console.log(baseSalariesResult, err)
                                    database.query("Insert into weekoffs (week_off,employee_id) values(" + mysql.escape(req.body.week_off) + "," + employeeId + ")", (err, weekOffResult) => {
                                        let promiseArray = []
                                        req.files.forEach((data, index) => {
                                            var pr = {}
                                            pr.promise = new Promise((resolve, reject) => {
                                                pr.resolve = resolve
                                                pr.reject = reject

                                            })
                                            promiseArray[index] = pr.promise
                                            if (index !== 0) {
                                                database.query("Insert into file_upload (type,name,created_on) values(" + mysql.escape("application_document") + "," + mysql.escape(data.filename) + ",current_timestamp())", (err, fileUploadResultSecond, fields) => {
                                                    database.query("Insert into documents (file_id,employee_id) values(" + fileUploadResultSecond.insertId + "," + employeeId + ")", (err, documentResult, fields) => {
                                                        pr.resolve(true)

                                                    })
                                                })
                                            }
                                            else {
                                                pr.resolve(true)
                                            }




                                        })
                                        Promise.all(promiseArray).then(() => {
                                            res.json({ "employeesResult": employeesResult, "fileUploadResult": fileUploadResult, "jobDetailsResult": jobDetailsResult, "baseSalariesResult": baseSalariesResult })
                                        })
                                    })
                                })
                            })

                        }
                        })

                    })


                })



            }

        })

    })

}

module.exports = getEmployees