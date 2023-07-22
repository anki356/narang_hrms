const database = require("../../../config/database");
const mysql = require('mysql')

const fs = require('fs')
const editEmployee = (req, res, next) => {
    var documentUploadResult = []
    var fileUploadResultArray=[]
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



                console.log(err)


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
                database.query("update job_details set head_employee_id=" + req.body.head_employee_id + ",hired_by_employee_id=" + req.body.hired_by_employee_id + ",hiring_date_time=" + mysql.escape(req.body.hiring_date_time) + ",lead_from=" + mysql.escape(req.body.lead_from) + ",role_id=" + req.body.role_id + ",store_department_id=" + req.body.store_department_id + ",floor_id=" + req.body.floor_id + ",location_id=" + req.body.location_id + ",epf_no=" + mysql.escape(req.body.epf_no) + ",esi_no=" + mysql.escape(req.body.esi_no) + ",department_id=" + req.body.department_id + ",supervisor_id=" + req.body.supervisor_id + " where id=(select job_details_id  from employees where id=" + req.params.id + ")", (err, jobDetailsResult, fields) => {
                 database.query("select bank_details_id  from employees where id=" + req.params.id ,(err,bankResults)=>{
                    console.log("bankResults",bankResults)
                    if (req.body.branch !== undefined && req.body.branch !== null && req.body.branch !== ''&&req.body.bank_name !== undefined && req.body.bank_name!== null&&req.body.bank_name!== ''&&req.body.account_number !== undefined&& req.body.account_number !== null &&req.body.account_number!== ''&&req.body.ifsc  !== undefined&&req.body.ifsc!== null&& req.body.ifsc!== ''&& bankResults[0].bank_details_id!== null) {
                        database.query("update bank_details set name=" + mysql.escape(req.body.bank_name) + ",branch=" + mysql.escape(req.body.branch) + ",ifsc=" + mysql.escape(req.body.ifsc) + ",account_number=" + req.body.account_number + " where id=(select bank_details_id  from employees where id=" + req.params.id + ")", (err, bankDetailsResult, fields) => {
                            console.log(err)
                            if (req.body.epf_no === undefined) {
                                req.body.epf_no = null
                            }
                            if (req.body.esi_no === undefined) {
                                req.body.esi_no = null
                            }
                            if (req.body.uan_no === undefined) {
                                req.body.uan_no = null
                            }
                            database.query("update employees set name=" + mysql.escape(req.body.name) + ",father_name=" + mysql.escape(req.body.father_name) + ",phone=" + req.body.phone + ",emergency_number=" + req.body.emergency_no + ",dob=" + mysql.escape(req.body.dob) + ",gender=" + mysql.escape(req.body.gender) + ",marital_status=" + mysql.escape(req.body.marital_status) + ",qualification=" + mysql.escape(req.body.qualification) + ",local_address=" + mysql.escape(req.body.local_address) + ",permanent_address=" + mysql.escape(req.body.permanent_address) + ",aadhar_no=" + req.body.aadhar_no + ",pan_no=" + mysql.escape(req.body.pan_no) + ",uan_no=" + mysql.escape(req.body.uan_no) + ",fine_management=" + req.body.fine_management + ",min_wages_as_per_rule=" + req.body.min_wages_as_per_rule + ",type=" + mysql.escape(req.body.type) + ",sub_type=" + mysql.escape(req.body.sub_type) + " where id=" + req.params.id, (err, employeesResult, fields) => {
                                console.log(err)
                                employeeId = employeesResult.insertId
                                database.query("update base_salaries set amount=" + req.body.base_salary + " where employee_id=" + req.params.id, (err, baseSalariesResult) => {
                                    console.log(baseSalariesResult, err)
                                    database.query("update weekoffs set week_off=" + mysql.escape(req.body.week_off) + " where employee_id=" + req.params.id, (err, weekOffResult) => {
                                        console.log(err)
                                        let promiseArray = []
                                        database.query("select file_id from documents where employee_id=" + req.params.id, (err, fileSecondResult) => {
                                            console.log(err)

                                            req.files.forEach((data, index) => {
                                                var pr = {}
                                                pr.promise = new Promise((resolve, reject) => {
                                                    pr.resolve = resolve
                                                    pr.reject = reject

                                                })
                                                promiseArray[index] = pr.promise
                                                if (data.fieldname === 'photo') {
                                                    database.query("select photo_id from employees where employees.id=" + req.params.id, (err, photoResult) => {
                                                        console.log(photoResult);
                                                        database.query("select * from file_upload where id=" + photoResult[0].photo_id, (err, fileUploadResult) => {
                                                            console.log(err)
                                                            fs.unlink("C://Users/anki3/Desktop/Awarno/naranghrms/uploads/" + fileUploadResult[0].name, (err) => {
                                                                console.log(err)
                                                                database.query("update file_upload set name=" + mysql.escape(req.files[0].filename) + " where id=" + photoResult[0].photo_id, (err, fileUploadResult) => {
                                                                    pr.resolve(true)

fileUploadResultArray.push(fileUploadResult)


                                                                })
                                                            })
                                                        })
                                                    })
                                                }

                                                else {
                                                    if (index <= fileSecondResult.length) {

                                                        database.query("select name from file_upload where id=" + fileSecondResult[index - 1].file_id, (err, fileThirdResult) => {

                                                            fs.unlink("C:/Users/anki3/Desktop/Awarno/naranghrms/uploads/" + fileThirdResult[0].name, (err) => {
                                                                console.log(err)
                                                                database.query("update file_upload set name=" + mysql.escape(data.filename) + ",created_on=current_timestamp() where id=" + fileSecondResult[index - 1].file_id, (err, fileFourthResult) => {
                                                                    console.log("file upload error", err)
                                                                    documentUploadResult.push(fileFourthResult)
                                                                    pr.resolve(true)
                                                                })
                                                            })
                                                        })
                                                    } else {
                                                        console.log("Hello")
                                                        database.query("Insert into file_upload (type,name,created_on) values(" + mysql.escape("application_document") + "," + mysql.escape(data.filename) + ",current_timestamp())", (err, fileUploadResultSecond, fields) => {
                                                            console.log(err)
                                                            database.query("Insert into documents (file_id,employee_id) values(" + fileUploadResultSecond.insertId + "," + req.params.id + ")", (err, documentResult, fields) => {
                                                                console.log(err)
                                                                documentUploadResult.push(documentResult)
                                                                pr.resolve(true)

                                                            })
                                                        })
                                                    }

                                                }





                                            })
                                            Promise.all(promiseArray).then(() => {
                                                res.json({ "employeesResult": employeesResult, "fileUploadResult": fileUploadResultArray, "bankDetailsResult": bankDetailsResult, "jobDetailsResult": jobDetailsResult, "baseSalariesResult": baseSalariesResult, "documentUploadResult": documentUploadResult })
                                            })
                                        })
                                       
                                    })






                                })
                            })

                        })
                
                    }
                    else if(req.body.branch !== undefined && req.body.branch !== null && req.body.branch !== ''&&req.body.bank_name !== undefined && req.body.bank_name!== null&&req.body.bank_name!== ''&&req.body.account_number !== undefined&& req.body.account_number !== null &&req.body.account_number!== ''&&req.body.ifsc  !== undefined&&req.body.ifsc!== null&& req.body.ifsc!== ''){
                        database.query("INSERT INTO bank_details (name,branch,ifsc,account_number) values(" + mysql.escape(req.body.bank_name) + "," + mysql.escape(req.body.branch) + "," + mysql.escape(req.body.ifsc) + "," + req.body.account_number + ")", (err, bankDetailsResult, fields) => {
                            console.log(bankDetailsResult)
                            if (req.body.epf_no === undefined) {
                                req.body.epf_no = null
                            }
                            if (req.body.esi_no === undefined) {
                                req.body.esi_no = null
                            }
                            if (req.body.uan_no === undefined) {
                                req.body.uan_no = null
                            }
                            database.query("update employees set name=" + mysql.escape(req.body.name) +",bank_details_id="+bankDetailsResult.insertId +",father_name=" + mysql.escape(req.body.father_name) + ",phone=" + req.body.phone + ",emergency_number=" + req.body.emergency_no + ",dob=" + mysql.escape(req.body.dob) + ",gender=" + mysql.escape(req.body.gender) + ",marital_status=" + mysql.escape(req.body.marital_status) + ",qualification=" + mysql.escape(req.body.qualification) + ",local_address=" + mysql.escape(req.body.local_address) + ",permanent_address=" + mysql.escape(req.body.permanent_address) + ",aadhar_no=" + req.body.aadhar_no + ",pan_no=" + mysql.escape(req.body.pan_no) + ",uan_no=" + mysql.escape(req.body.uan_no) + ",fine_management=" + req.body.fine_management + ",min_wages_as_per_rule=" + req.body.min_wages_as_per_rule + ",type=" + mysql.escape(req.body.type) + ",sub_type=" + mysql.escape(req.body.sub_type) + " where id=" + req.params.id, (err, employeesResult, fields) => {
                                console.log(err)
                                employeeId = employeesResult.insertId
                                database.query("update base_salaries set amount=" + req.body.base_salary + " where employee_id=" + req.params.id, (err, baseSalariesResult) => {
                                    console.log(baseSalariesResult, err)
                                    database.query("update weekoffs set week_off=" + mysql.escape(req.body.week_off) + " where employee_id=" + req.params.id, (err, weekOffResult) => {
                                        console.log(err)
                                        let promiseArray = []
                                        database.query("select file_id from documents where employee_id=" + req.params.id, (err, fileSecondResult) => {
                                            console.log(err)

                                            req.files.forEach((data, index) => {
                                                var pr = {}
                                                pr.promise = new Promise((resolve, reject) => {
                                                    pr.resolve = resolve
                                                    pr.reject = reject

                                                })
                                                promiseArray[index] = pr.promise
                                                if (data.fieldname === 'photo') {
                                                    database.query("select photo_id from employees where employees.id=" + req.params.id, (err, photoResult) => {
                                                        console.log(photoResult);
                                                        database.query("select * from file_upload where id=" + photoResult[0].photo_id, (err, fileUploadResult) => {
                                                            console.log(err)
                                                            fs.unlink("C://Users/anki3/Desktop/Awarno/naranghrms/uploads/" + fileUploadResult[0].name, (err) => {
                                                                console.log(err)
                                                                database.query("update file_upload set name=" + mysql.escape(req.files[0].filename) + " where id=" + photoResult[0].photo_id, (err, fileUploadResult) => {
                                                                    pr.resolve(true)

fileUploadResultArray.push(fileUploadResult)


                                                                })
                                                            })
                                                        })
                                                    })
                                                }

                                                else {
                                                    if (index <= fileSecondResult.length) {

                                                        database.query("select name from file_upload where id=" + fileSecondResult[index - 1].file_id, (err, fileThirdResult) => {

                                                            fs.unlink("C:/Users/anki3/Desktop/Awarno/naranghrms/uploads/" + fileThirdResult[0].name, (err) => {
                                                                console.log(err)
                                                                database.query("update file_upload set name=" + mysql.escape(data.filename) + ",created_on=current_timestamp() where id=" + fileSecondResult[index - 1].file_id, (err, fileFourthResult) => {
                                                                    console.log("file upload error", err)
                                                                    documentUploadResult.push(fileFourthResult)
                                                                    pr.resolve(true)
                                                                })
                                                            })
                                                        })
                                                    } else {
                                                        console.log("Hello")
                                                        database.query("Insert into file_upload (type,name,created_on) values(" + mysql.escape("application_document") + "," + mysql.escape(data.filename) + ",current_timestamp())", (err, fileUploadResultSecond, fields) => {
                                                            console.log(err)
                                                            database.query("Insert into documents (file_id,employee_id) values(" + fileUploadResultSecond.insertId + "," + req.params.id + ")", (err, documentResult, fields) => {
                                                                console.log(err)
                                                                documentUploadResult.push(documentResult)
                                                                pr.resolve(true)

                                                            })
                                                        })
                                                    }

                                                }





                                            })
                                            Promise.all(promiseArray).then(() => {
                                                res.json({ "employeesResult": employeesResult, "fileUploadResult": fileUploadResultArray, "bankDetailsResult": bankDetailsResult, "jobDetailsResult": jobDetailsResult, "baseSalariesResult": baseSalariesResult, "documentUploadResult": documentUploadResult })
                                            })
                                        })
                                       
                                    })






                                })
                            })

                        })
                    }
                    else{
                        if (req.body.min_wages_as_per_rule === undefined || req.body.min_wages_as_per_rule === '') {
                            req.body.min_wages_as_per_rule = null
                        }
                        database.query("update employees set name=" + mysql.escape(req.body.name) + ",father_name=" + mysql.escape(req.body.father_name) + ",phone=" + req.body.phone + ",emergency_number=" + req.body.emergency_no + ",dob=" + mysql.escape(req.body.dob) + ",gender=" + mysql.escape(req.body.gender) + ",marital_status=" + mysql.escape(req.body.marital_status) + ",qualification=" + mysql.escape(req.body.qualification) + ",local_address=" + mysql.escape(req.body.local_address) + ",permanent_address=" + mysql.escape(req.body.permanent_address) + ",aadhar_no=" + req.body.aadhar_no + ",pan_no=" + mysql.escape(req.body.pan_no) + ",uan_no=" + mysql.escape(req.body.uan_no) + ",fine_management=" + req.body.fine_management + ",min_wages_as_per_rule=" + req.body.min_wages_as_per_rule + ",type=" + mysql.escape(req.body.type) + ",sub_type=" + mysql.escape(req.body.sub_type) + " where id=" + req.params.id, (err, employeesResult, fields) => {
                            console.log(err)
                            employeeId = employeesResult.insertId
                            database.query("update base_salaries set amount=" + req.body.base_salary + " where employee_id=" + req.params.id, (err, baseSalariesResult) => {
                                console.log(baseSalariesResult, err)
                                database.query("update weekoffs set week_off=" + mysql.escape(req.body.week_off) + " where employee_id=" + req.params.id, (err, weekOffResult) => {
                                    console.log(err)
                                    let promiseArray = []
                                    database.query("select file_id from documents where employee_id=" + req.params.id, (err, fileSecondResult) => {
                                        console.log(err)

                                        req.files.forEach((data, index) => {
                                            var pr = {}
                                            pr.promise = new Promise((resolve, reject) => {
                                                pr.resolve = resolve
                                                pr.reject = reject

                                            })
                                            promiseArray[index] = pr.promise
                                            if (data.fieldname === 'photo') {
                                                database.query("select photo_id from employees where employees.id=" + req.params.id, (err, photoResult) => {
                                                    console.log(photoResult);
                                                    database.query("select * from file_upload where id=" + photoResult[0].photo_id, (err, fileUploadResult) => {
                                                        console.log(err)
                                                        fs.unlink("C://Users/anki3/Desktop/Awarno/naranghrms/uploads/" + fileUploadResult[0].name, (err) => {
                                                            console.log(err)
                                                            database.query("update file_upload set name=" + mysql.escape(req.files[0].filename) + " where id=" + photoResult[0].photo_id, (err, fileUploadResult) => {
                                                                pr.resolve(true)

                                                                fileUploadResultArray.push(fileUploadResult)


                                                            })
                                                        })
                                                    })
                                                })
                                            }

                                            else {
                                                if (index <= fileSecondResult.length) {

                                                    database.query("select name from file_upload where id=" + fileSecondResult[index - 1].file_id, (err, fileThirdResult) => {

                                                        fs.unlink("C:/Users/anki3/Desktop/Awarno/naranghrms/uploads/" + fileThirdResult[0].name, (err) => {
                                                            console.log(err)
                                                            database.query("update file_upload set name=" + mysql.escape(data.filename) + ",created_on=current_timestamp() where id=" + fileSecondResult[index - 1].file_id, (err, fileFourthResult) => {
                                                                console.log("file upload error", err)
                                                                documentUploadResult.push(fileFourthResult)
                                                                pr.resolve(true)
                                                            })
                                                        })
                                                    })
                                                } else {
                                                    console.log("hello")
                                                    database.query("Insert into file_upload (type,name,created_on) values(" + mysql.escape("application_document") + "," + mysql.escape(data.filename) + ",current_timestamp())", (err, fileUploadResultSecond, fields) => {
                                                        console.log(err)
                                                        database.query("Insert into documents (file_id,employee_id) values(" + fileUploadResultSecond.insertId + "," + req.params.id + ")", (err, documentResult, fields) => {
                                                            console.log(err)
                                                            documentUploadResult.push(documentResult)
                                                            pr.resolve(true)

                                                        })
                                                    })
                                                }

                                            }





                                        })
                                        Promise.all(promiseArray).then(() => {
                                            res.json({ "employeesResult": employeesResult, "fileUploadResult": fileUploadResultArray, "jobDetailsResult": jobDetailsResult, "baseSalariesResult": baseSalariesResult, "documentUploadResult": documentUploadResult })
                                        })
                                    })
                                })






                            })
                        })

                    }
                 })
                   
                })
            }
        })
    })
}




                    module.exports = editEmployee