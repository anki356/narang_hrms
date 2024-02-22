const database = require("../../../config/database");
const mysql = require("mysql")
const moment = require('moment')
const calculateGradesForAll = (req, res, next) => {

    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, async(err, result) => {
        let allowed_roles = ['Admin', 'Super Admin','Floor Incharge 1','Floor Incharge 2']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="select file_upload.name as photo, job_details.head_employee_id,employees.id,employees.name,employees.employee_id as empID,roles.role_name,floors.name as floor_name,locations.name as location_name, store_departments.name as location_department_name from employees left join job_details on employees.job_details_id=job_details.id left join roles on roles.id=job_details.role_id left join store_departments on store_departments.id=job_details.store_department_id left join floors on floors.id=job_details.floor_id left join locations on locations.id=job_details.location_id left join file_upload on file_upload.id=employees.photo_id where role_id=8 "
           
            if(result[0].role_name.split(" ")[0]==='Floor'){
           
                database.query("select employees.id from employees left join job_details on job_details.id=employees.job_details_id where job_details.role_id="+role_id,(err,employeesResult,fields)=>{
                    queryString+=" and job_details.head_employee_id=" +employeesResult[0].id
                    if(req.query.employee_query){
                        queryString+=" and (employees.employee_id like '%"+ req.query.employee_query+"%'or employees.name like '%"+req.query.employee_query+"%')"
                       }
                    queryString+=" limit " + req.query.limit + " offset " + req.query.offset
           
                    database.query(queryString, async(err, employeesResult) => {
                        
                        result=[]
                        
                        let promiseArray=[]
                        employeesResult.forEach(async(data,index) => {
                            var pr={}
                            pr.promise=new Promise((resolve,reject)=>{
                               pr.resolve=resolve
                               pr.reject=reject
                
                            })
        promiseArray[index]=pr.promise
                            database.query("Select count(id) as count_id from attendance where check_in_datetime>=" + req.query.from_date + " and check_in_datetime<=" + req.query.to_date + " and employee_id =" + data.id + " and status='Present'", (err, attendanceCountResult) => {
                               
                                let from_moment = moment(req.query.from_date, "YYYY-MM-DD")
                                let to_moment = moment(req.query.to_date, "YYYY-MM-DD")
                                let total_working_days = to_moment.diff(from_moment, 'd')
                                attendance_percentage = attendanceCountResult[0].count_id * 100 / total_working_days
                                let grade_5th
                                if (attendance_percentage > 90) {
                                    grade_5th = 10
                                }
                                else if (attendance_percentage > 80) {
                                    grade_5th = 7
                                }
                                else if (attendance_percentage > 60) {
                                    grade_5th = 5
                                }
                                else {
                                    grade_5th = 0
                                }
                                let grade_6th
                                if(data.role_name==='Floor Incharge 1'||data.role_name==='Floor Incharge 2'){
                                    grade_6th=10
                                }
                                else{
                                    let avg_commission = req.query.commission[index] / total_working_days
                                    
                                    if (avg_commission > 125) {
                                        grade_6th = 10
                                    }
                                    else if (avg_commission > 100) {
                                        grade_6th = 9
                                    }
                                    else if (avg_commission > 90) {
                                        grade_6th = 8
                                    }
                                    else if (avg_commission > 70) {
                                        grade_6th = 5
                                    }
                                    else {
                                        grade_6th = 0
                                    }
                                }
                                
                                database.query("select sum(amount) as total_fine from fines where employee_id=" + data.id + " and date>=" + req.query.from_date + " and date<=" + req.query.to_date, (err, fineResult) => {
                                
                                    let total_fine
                                    if (fineResult[0].total_fine === null) {
                                        total_fine = 0
                                    }
                                    else {
                                        total_fine = fineResult[0].total_fine
                                    }
                                    let grade_7th
                                    if (total_fine < 2) {
                                        grade_7th = 10
                                    }
                                    else if (total_fine < 7) {
                                        grade_7th = 9
                                    }
                                    else if (total_fine < 10) {
                                        grade_7th = 8
                                    }
                                    else if (total_fine < 15) {
                                        grade_7th = 5
                                    }
                                    else {
                                        grade_7th = 0
                                    }
                                    // let month = from_moment.month()
                                    database.query("select AVG(grade_1st) as first_Avg ,AVG(grade_2nd) as second_Avg, AVG(grade_3rd) as third_Avg, AVG(grade_4th) as fourth_AVG from grades where employee_id=" + data.id+ " and  date>=" + mysql.escape(req.query.from_date) + " and date<=" + mysql.escape(req.query.to_date), (err, gradeResult) => {
                                      
                                        let total_grades = gradeResult[0]?.first_Avg + gradeResult[0]?.second_Avg + gradeResult[0]?.third_Avg + gradeResult[0]?.fourth_AVG + (grade_5th + grade_6th + grade_7th) * 2
                                        //IF(S5>95,"A+",IF(S5>91,"A",IF(S5>85,"B+",IF(S5>80,"B","C"))))
                                        let grade_equivalent
                                        if (total_grades > 95) {
                                            grade_equivalent = "A+"
                                        }
                                        else if (total_grades > 91) {
                                            grade_equivalent = "A"
                                        }
                                        else if (total_grades > 85) {
                                            grade_equivalent = "B+"
                                        }
                                        else if (total_grades > 80) {
                                            grade_equivalent = "B"
                                        }
                                        else {
                                            grade_equivalent = "C"
                                        }
                                        
                                        result.push({
                                           ... data,
                                            "grade_1st": gradeResult[0].first_Avg,
                                            "grade_2nd": gradeResult[0].second_Avg,
                                            "grade_3rd": gradeResult[0].third_Avg,
                                            "grade_4th": gradeResult[0].fourth_AVG,
                                            "grade_out_of_40":gradeResult[0].first_Avg+gradeResult[0].second_Avg+gradeResult[0].third_Avg+gradeResult[0].fourth_AVG,
                                            "grade_5th":grade_5th,
                                            "grade_6th":grade_6th,
                                            "grade_7th":grade_7th,
                                            "grade_out_of_60":(grade_5th+grade_6th+grade_7th)*2,
                                            "total_grades":total_grades,
                                            "grade_equivalent": grade_equivalent
                                        })
                                        pr.resolve(true)
                                    })
                                   
                                })
        
                            })
                        })
                        
                        Promise.all(promiseArray).then(()=>{
                            
        
                            res.send(result)
                        })
                        
                    })
                
                })
                
            }
            else{
                if(req.query.employee_query){
                    queryString+=" and (employees.employee_id like '%"+ req.query.employee_query+"%'or employees.name like '%"+req.query.employee_query+"%')"
                   }
                queryString+=" limit " + req.query.limit + " offset " + req.query.offset
           
                database.query(queryString, async(err, employeesResult) => {
                    
                    result=[]
                    
                    let promiseArray=[]
                    employeesResult.forEach(async(data,index) => {
                        var pr={}
                        pr.promise=new Promise((resolve,reject)=>{
                           pr.resolve=resolve
                           pr.reject=reject
            
                        })
    promiseArray[index]=pr.promise
                        database.query("Select count(id) as count_id from attendance where check_in_datetime>=" + req.query.from_date + " and check_in_datetime<=" + req.query.to_date + " and employee_id =" + data.id + " and status='Present'", (err, attendanceCountResult) => {
                           
                            let from_moment = moment(req.query.from_date, "YYYY-MM-DD")
                            let to_moment = moment(req.query.to_date, "YYYY-MM-DD")
                            let total_working_days = to_moment.diff(from_moment, 'd')
                            attendance_percentage = attendanceCountResult[0].count_id * 100 / total_working_days
                            let grade_5th
                            if (attendance_percentage > 90) {
                                grade_5th = 10
                            }
                            else if (attendance_percentage > 80) {
                                grade_5th = 7
                            }
                            else if (attendance_percentage > 60) {
                                grade_5th = 5
                            }
                            else {
                                grade_5th = 0
                            }
                            let grade_6th
                            if(data.role_name==='Floor Incharge'){
                                grade_6th=10
                            }
                            else{
                                let avg_commission = req.query.commission[index] / total_working_days
                                
                                if (avg_commission > 125) {
                                    grade_6th = 10
                                }
                                else if (avg_commission > 100) {
                                    grade_6th = 9
                                }
                                else if (avg_commission > 90) {
                                    grade_6th = 8
                                }
                                else if (avg_commission > 70) {
                                    grade_6th = 5
                                }
                                else {
                                    grade_6th = 0
                                }
                            }
                            
                            database.query("select sum(amount) as total_fine from fines where employee_id=" + data.id + " and date>=" + req.query.from_date + " and date<=" + req.query.to_date, (err, fineResult) => {
                            
                                let total_fine
                                if (fineResult[0].total_fine === null) {
                                    total_fine = 0
                                }
                                else {
                                    total_fine = fineResult[0].total_fine
                                }
                                let grade_7th
                                if (total_fine < 2) {
                                    grade_7th = 10
                                }
                                else if (total_fine < 7) {
                                    grade_7th = 9
                                }
                                else if (total_fine < 10) {
                                    grade_7th = 8
                                }
                                else if (total_fine < 15) {
                                    grade_7th = 5
                                }
                                else {
                                    grade_7th = 0
                                }
                                // let month = from_moment.month()
                                database.query("select AVG(grade_1st) as first_Avg ,AVG(grade_2nd) as second_Avg, AVG(grade_3rd) as third_Avg, AVG(grade_4th) as fourth_AVG from grades where employee_id=" + data.id+ " and  date>=" + req.query.from_date + " and date<=" + req.query.to_date, (err, gradeResult) => {
                                   
                                    let total_grades = gradeResult[0]?.first_Avg + gradeResult[0]?.second_Avg + gradeResult[0]?.third_Avg + gradeResult[0]?.fourth_AVG + (grade_5th + grade_6th + grade_7th) * 2
                                    //IF(S5>95,"A+",IF(S5>91,"A",IF(S5>85,"B+",IF(S5>80,"B","C"))))
                                    let grade_equivalent
                                    if (total_grades > 95) {
                                        grade_equivalent = "A+"
                                    }
                                    else if (total_grades > 91) {
                                        grade_equivalent = "A"
                                    }
                                    else if (total_grades > 85) {
                                        grade_equivalent = "B+"
                                    }
                                    else if (total_grades > 80) {
                                        grade_equivalent = "B"
                                    }
                                    else {
                                        grade_equivalent = "C"
                                    }
                                    result.push({
                                       ... data,
                                        "grade_1st": gradeResult[0].first_Avg,
                                        "grade_2nd": gradeResult[0].second_Avg,
                                        "grade_3rd": gradeResult[0].third_Avg,
                                        "grade_4th": gradeResult[0].fourth_AVG,
                                        "grade_out_of_40":gradeResult[0].first_Avg+gradeResult[0].second_Avg+gradeResult[0].third_Avg+gradeResult[0].fourth_AVG,
                                        "grade_5th":grade_5th,
                                        "grade_6th":grade_6th,
                                        "grade_7th":grade_7th,
                                        "grade_out_of_60":(grade_5th+grade_6th+grade_7th)*2,
                                        "total_grades":total_grades,
                                        "grade_equivalent": grade_equivalent
                                    })
                                    pr.resolve(true)
                                })
                               
                            })
    
                        })
                    })
                    
                    Promise.all(promiseArray).then(()=>{
                        
    
                        res.send(result)
                    })
                    
                })
            
            }
          
        }
        })
    
}


module.exports = calculateGradesForAll