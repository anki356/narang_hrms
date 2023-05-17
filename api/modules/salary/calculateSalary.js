const database = require("../../../config/database");
const moment = require('moment')
const mysql = require('mysql')
const calculateSalary = async (employee_id, from_date, to_date, commission) => {
try {
    
    database.query("select count (id) as id_count from attendance where employee_id=" + employee_id + " and status='Present' and check_in_datetime>" + mysql.escape(from_date) + " and check_in_datetime<=" + mysql.escape(to_date), (err, attendanceCountResult, fields) => {
        
        database.query("select amount from base_salaries where employee_id=" + employee_id, (err, baseSalariesResult, fields) => {
            console.log(baseSalariesResult[0],employee_id);
            let total_days = moment().daysInMonth()

            let salary=baseSalariesResult[0].amount/total_days*attendanceCountResult[0].id_count
            // let salary = baseSalariesResult[0].amount / total_days * 25
            database.query("select sum(amount) as expense_total from expenses where employee_id=" + employee_id, (err, expenseResult, fields) => {
                let tea = 10 * attendanceCountResult[0].id_count
                if (tea > 300) {
                    tea = 300
                }

                expense = expenseResult[0].expense_total
                if (expense === null) {
                    expense = 0
                }
                database.query("select sum(amount) as advance_total from advance where employee_id=" + employee_id + " and date>=" + from_date + " and date<=" + to_date, (err, advanceResult, fields) => {
                    let month = moment(from_date, 'YYYY-MM-DD').month()
                    let year = moment(from_date, 'YYYY-MM-DD').year()
                    let advance
                    let net_salary
                    advance = advanceResult[0].advance_total
                    if (advance === null) {
                        advance = 0
                    }
                    let loan = 0

                    database.query("select id from loan where employee_id=" + employee_id, (err, loanResult, fields) => {
                        
                        if (loanResult.length > 0) {

                            loan = loanResult[0].amount
                            database.query("select amount from loan_repayment where loan_id=" + loanResult[0].id + " and month=" + month + " and year=" + year, (err, loanRepaymentResult, fields) => {
                             
                                if (loanRepaymentResult.length > 0) {
                                    net_salary = Number(salary) + Number(commission) - Number(expense) - tea - Number(advance)-loanRepaymentResult[0].amount
                                   
                                }
                                else {
                                    net_salary = Number(salary) + Number(commission) - Number(expense) - tea - Number(advance)
                                }
                                
                            })//number
                        }
                        else {
                            net_salary = Number(salary) + Number(commission) - Number(expense) - tea - Number(advance)
                        }
                        
                        database.query("select min_wages_as_per_rule from employees where id= " + employee_id, (err, minWagesResult, fields) => {
                            console.log(err)
                            let salary_as_per_rule = minWagesResult[0].min_wages_as_per_rule
                            let per_day_salary = salary_as_per_rule / total_days
                            let days
                            for (let i = total_days; i > 0; i--) {
                                if ((per_day_salary * i) - net_salary < per_day_salary) {
                                    days = i
                                    break;
                                }
                            }
                            let cash_incentive = per_day_salary * days - net_salary
                            database.query("Select value from settings where name in ('hra','basic')", (err, settingsResult) => {
                                console.log(err)
                                let basic_salary = Number(settingsResult[1].value) * net_salary / 100
                                let hra = Number(settingsResult[0].value) * net_salary / 100
                                database.query("select type from employees where id=" + employee_id, (err, employeeTypeResponse) => {
                                    console.log(err)
                                    if (employeeTypeResponse[0].type === 'PF') {
                                        let esi
                                        if (net_salary < 21000) {
                                            esi = basic_salary * 0.75 / 100 * 60 / 100
                                        }
                                        let pf = basic_salary * 12 / 100
                                        let net_payable_salary = net_salary - esi - pf
                                        return { "days": days, "net_salary": net_salary, "cash_incentive": cash_incentive, "basic": basic_salary, "hra": hra, "esi": esi, "pf": pf, "net_payable_salary": net_payable_salary, "advance": advance, "expense": expense, "loan": loan, "tea": tea, "working_days": attendanceCountResult[0].id_count, "computed": salary }
                                    }
                                    else {
                                        console.log({ "days": days, "net_salary": net_salary, "cash_incentive": cash_incentive, "basic": basic_salary, "hra": hra, "net_payable_salary": net_salary, "advance": advance, "expense": expense, "loan": loan, "tea": tea, "working_days": attendanceCountResult[0].id_count, "computed": salary })
                                        return { "days": days, "net_salary": net_salary, "cash_incentive": cash_incentive, "basic": basic_salary, "hra": hra, "net_payable_salary": net_salary, "advance": advance, "expense": expense, "loan": loan, "tea": tea, "working_days": attendanceCountResult[0].id_count, "computed": salary }

                                    }


                                })



                            })
                        })

                    })
                })
            })
        })

    })
} catch (error) {
    console.log("calculateSalary",error)
}



}

module.exports = calculateSalary