const database = require("../../../config/database");
const moment = require('moment')
const mysql = require('mysql')
const getSalaryDetails = async (from_date, to_date, commission) => {
    let month = moment(from_date).month()
    let year = moment(from_date).year()
    database.query("select count(attendance.id)  as attendance_count,attendance.employee_id,sum(amount)as total_fine from attendance left join employees on employees.id=attendance.employee_id left join fines on fines.employee_id=attendance.employee_id  where check_in_datetime>="+mysql.escape(from_date)+" and check_in_datetime<="+mysql.escape(to_date)+" and attendance.status='Present' group by attendance.employee_id" +" and employees.status=1", (err, result, fields) => {
        console.log(err, result)
        console.log(result)
        let total_days = moment(from_date).daysInMonth()
        let promiseArray = []
        result.forEach((data, index) => {

            let pr = {}
            pr.pr = new Promise((resolve, reject) => {
                pr.resolve = resolve
                pr.reject = reject
            })
            promiseArray[index] = pr.pr
            database.query("select amount from base_salaries where employee_id=" + data.employee_id, (err, baserSalariesResult, fields) => {
                database.query("select count (attendance.id) as attendance_count, attendance.employee_id as employee_id from attendance where attendance.status='WeekOff' and check_in_datetime>=" + mysql.escape(from_date) + " and check_in_datetime<=" + mysql.escape(to_date) + " and attendance.employee_id =" + data.employee_id, (err, weekOFFResult, fields) => {
console.log(err)
                    let total_days = moment(from_date).daysInMonth() - weekOFFResult[0].attendance_count

                    let salary = baserSalariesResult[0].amount / total_days * data.attendance_count
                    // let salary = baserSalariesResult[0].amount / total_days * 25
                    database.query("select sum(amount) as expense_total from expenses where employee_id=" + data.employee_id + " and status='Approved'", (err, expenseResult, fields) => {
                        let tea = 10 * data.attendance_count
                        if (tea > 300) {
                            tea = 300
                        }

                        expense = expenseResult[0].expense_total
                        if (expense === null) {
                            expense = 0
                        }

                        database.query("select sum(amount) as advance_total from advance where employee_id=" + data.employee_id + " and date>=" + mysql.escape(from_date) + "and status='Approved' and date<=" + mysql.escape(to_date), (err, advanceResult, fields) => {

                            let month = moment(from_date, 'YYYY-MM-DD').month()
                            let year = moment(from_date, 'YYYY-MM-DD').year()
                            let advance
                            let net_salary
                            advance = advanceResult[0].advance_total
                            if (advance === null) {
                                advance = 0
                            }
                            database.query("select sum(amount) as fine_total from fines where employee_id=" + data.employee_id + " and date>=" + mysql.escape(from_date) + "and status='Approved' and date<=" + mysql.escape(to_date), (err, fineResult, fields) => {
                                console.log(err)
                                let fine = fineResult[0].fine_total
                                if (fine === null) {
                                    fine = 0
                                }
                                let loan = 0
                                database.query("select id from loan where employee_id=" + data.employee_id, (err, loanResult, fields) => {

                                    if (loanResult.length > 0) {

                                        loan = loanResult[0].amount
                                        database.query("select amount from loan_repayment where loan_id=" + loanResult[0].id + " and month=" + month + " and year=" + year, (err, loanRepaymentResult, fields) => {

                                            if (loanRepaymentResult.length > 0) {
                                                net_salary = salary + commission - expense - tea - advance - loanRepaymentResult[0].amount - fine
                                                loan = loanRepaymentResult[0].amount
                                            }
                                            else {
                                                net_salary = Number(salary) + Number(commission) - Number(expense) - tea - Number(advance) - fine
                                                loan = 0
                                            }

                                        })//number
                                    }
                                    else {
                                        net_salary = Number(salary) + Number(commission) - Number(expense) - tea - Number(advance) - fine
                                        loan = 0
                                    }
                                    database.query("select sub_type from employees where id=" + data.employee_id, (err, employeeTypeResponse) => {
                                        console.log(err)
                                        if (employeeTypeResponse[0].sub_type === 'PF') {
                                            database.query("select min_wages_as_per_rule from employees where id= " + data.employee_id, (err, minWagesResult, fields) => {
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
                                                    
                                    
                                                   
                                                    let total_deduction = (Number(expense) + Number(tea) + Number(advance) + Number(loan) + Number(fine))
                                                    let total_earnings = Number(salary) + Number(commission)
                                                    let basic_salary = Number(settingsResult[1].value) * total_earnings / 100
                                                    let hra = Number(settingsResult[0].value) * total_earnings / 100
                                                    let esi
                                                    if (net_salary < 21000) {
                                                        esi = basic_salary * 0.75 / 100 * 60 / 100
                                                    }
                                                    let pf = basic_salary * 12 / 100
                                                    let net_payable_salary = net_salary - esi - pf
                                                    database.query("Insert into salaries (employee_id, working_days, month, computed, commission, expense, tea, advance, loan_emi,fine, total_earnings, total_deductions, net_salary, status, esi, pf, basic_salary, hra, days_shown, cash_incentive,net_payable_salary,year)values (" + data.employee_id + "," + data.attendance_count + "," + month + "," + salary + "," + commission + "," + expense + "," + tea + "," + advance + "," + loan + "," + fine+","+total_earnings + "," + total_deduction + "," + net_salary + ",'Pending'," + esi + "," + pf + "," + basic_salary + "," + hra + "," + days + "," + cash_incentive + "," + net_payable_salary +","+moment(from_date).year()+ ")", (err, salariesResult) => {
                                                        console.log(err)
                                                        pr.resolve(true)
                                                    })
                                                })
                                            })
                                        }
                                        else {
                                            let total_deduction = (Number(expense) + Number(tea) + Number(advance) + Number(loan) + Number(fine))
                                            let total_earnings = Number(salary) + Number(commission)
                                            database.query("Insert into salaries (employee_id, working_days,fine, month, computed, commission, expense, tea, advance, loan_emi, total_earnings, total_deductions, net_salary, status,  basic_salary, hra, days_shown, cash_incentive,net_payable_salary,year)values (" + data.employee_id + "," + data.attendance_count + "," + fine + "," + month + "," + salary + "," + commission + "," + expense + "," + tea + "," + advance + "," + loan + "," + total_earnings + "," + total_deduction +","+net_salary + ",'Pending'," + null + "," + null + "," + null + "," + null + "," + null + ","+moment(from_date).year()+")", (err, salariesResult) => {
                                                console.log("here", err)
                                                pr.resolve(true)
                                            })
                                        }
                                    
                                    
                                    })
                                        })

                                    })
                                })


                })
            })
        })
    })

})

            }










module.exports = getSalaryDetails