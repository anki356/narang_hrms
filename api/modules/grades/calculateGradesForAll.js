const database = require("../../../config/database");
const mysql = require("mysql")
const moment = require('moment')
const calculateGradesForAll = (req, res, next) => {

    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, async(err, result) => {
        let allowed_roles = ['Admin', 'Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            let result=[]
            
            database.query("select employees.*,job_details.*,roles.* from employees left join job_details on employees.job_details_id=job_details.id left join roles on roles.id=job_details.role_id  limit " + req.query.limit + " offset " + req.query.offset, async(err, employeesResult) => {
                console.log(err)
                let promiseArray=[]
                employeesResult.forEach(async(data,index) => {
                    var pr={}
                    pr.promise=new Promise((resolve,reject)=>{
                       pr.resolve=resolve
                       pr.reject=reject
        
                    })
promiseArray[index]=pr.promise
                    database.query("Select count(id) as count_id from attendance where check_in_datetime>=" + req.query.from_date + "and check_in_datetime<=" + req.query.to_date + " and employee_id =" + data.id + " and status='Present'", (err, attendanceCountResult) => {
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
                        if(data.role_name==='Floor Incharge'){
                            grade_6th=10
                        }
                        else{
                            let avg_commission = req.query.commission[index] / total_working_days
                            let grade_6th
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
                        
                        database.query("select sum(amount) as total_fine from fines where employee_id=" + data.id + " and date>=" + req.query.from_date + "and date<=" + req.query.to_date, (err, fineResult) => {
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
                                console.log(gradeResult)
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
                                    employee_data: data,
                                    avg_grade: (gradeResult[0]?.first_Avg + gradeResult[0]?.second_Avg + gradeResult[0]?.third_Avg + gradeResult[0]?.fourth_AVG + grade_5th + grade_6th + grade_7th) / 7,
                                    grade_equivalent: grade_equivalent
                                })
                                pr.resolve(true)
                            })
                           
                        })

                    })
                })
                
                Promise.all(promiseArray).then(()=>{
                    console.log(promiseArray)

                    res.send(result)
                })
                
            })
        }
        })
    
}


module.exports = calculateGradesForAll