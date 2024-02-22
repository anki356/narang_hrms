const database = require("../../../config/database");
const mysql = require("mysql")
const moment = require('moment')
const calculateGradesOtherThanSalesman = (req, res, next) => {

    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = ['Admin', 'Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            console.log("Select count(id) as count_id from attendance where check_in_datetime>=" + mysql.escape(req.query.from_date) + "and check_in_datetime<=" + mysql.escape(req.query.to_date) + " and employee_id=" + req.query.employee_id + " and status='Present'")
            database.query("select employee_id,SUM(CASE WHEN STATUS = 'Present' THEN no_of_shifts ELSE 0 END)AS attendance_count FROM attendance WHERE check_in_datetime >= "+mysql.escape(req.query.from_date)+" and check_in_datetime <="+ mysql.escape(req.query.to_date)+" and employee_id=" + req.query.employee_id  , (err, attendanceCountResult) => {
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
                let grade_6th=10
                database.query("select sum(amount) as total_fine from fines where employee_id=" + req.query.employee_id + " and date>=" + req.query.from_date + "and date<=" + req.query.to_date, (err, fineResult) => {
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
                    database.query("select AVG(grade_1st) as first_Avg ,AVG(grade_2nd) as second_Avg, AVG(grade_3rd) as third_Avg, AVG(grade_4th) as fourth_AVG from grades where employee_id=" + req.query.employee_id + " and  date>=" + req.query.from_date+" and date<="+req.query.to_date, (err, gradeResult) => {
                        console.log(err)
                        let total_grades = gradeResult[0].first_Avg + gradeResult[0].second_Avg + gradeResult[0].third_Avg + gradeResult[0].fourth_AVG + (grade_5th + grade_6th + grade_7th) * 2
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
                        res.json({
                            "grade_1st": gradeResult[0].first_Avg,
                            "grade_2nd": gradeResult[0].second_Avg,
                            "grade_3rd": gradeResult[0].third_Avg,
                            "grade_4th": gradeResult[0].fourth_AVG,
                            "grade_5th":grade_5th,
                            "grade_6th":grade_6th,
                            "grade_7th":grade_7th,
                            "total_grades":total_grades,
                            "grade_equivalent":grade_equivalent

                        })

                    })
                })
            })
        }
    })
}
module.exports = calculateGradesOtherThanSalesman