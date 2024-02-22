const database = require("../../../config/database");
const moment = require('moment')
const mysql = require('mysql')
const getSalaryDetails = async (from_date, to_date) => {
    let month = moment(from_date).month()
    let year = moment(from_date).year()
   
    database.query("select employee_id,SUM(CASE WHEN STATUS = 'Present' THEN no_of_shifts ELSE 0 END)AS attendance_no_of_shifts,COUNT(CASE WHEN STATUS = 'Present' THEN id ELSE 0 END)AS attendance_count FROM attendance WHERE check_in_datetime >= "+mysql.escape(from_date)+" and check_in_datetime <="+ mysql.escape(to_date)+" GROUP BY employee_id" , (err, result, fields) => {
        console.log(err, result)
        console.log(result)
        let total_days = moment(from_date).daysInMonth()
        let promiseArray = []
        result.forEach((data, index) => {
           
console.log(data.attendance_count)
let working_shifts=data.attendance_no_of_shifts
let working_days=data.attendance_count
            let pr = {}
            pr.pr = new Promise((resolve, reject) => {
                pr.resolve = resolve
                pr.reject = reject
            })
            promiseArray[index] = pr.pr
            database.query("select sum(commission) as commission from commission left join employees on employees.employee_id=commission.employee_id where employees.id="+data.employee_id,(err,commissionResults)=>{
                database.query("select amount from base_salaries where employee_id=" + data.employee_id, (err, baserSalariesResult, fields) => {
                    database.query("select count (attendance.id) as attendance_count, attendance.employee_id as employee_id from attendance left join employees on employees.id=attendance.employee_id where attendance.status='WeekOff' and check_in_datetime>=" + mysql.escape(from_date) + " and check_in_datetime<=" + mysql.escape(to_date) + " and attendance.employee_id =" + data.employee_id +" and employees.status=1", (err, weekOFFResult, fields) => {
    console.log(err)
                        let total_days = moment(from_date).daysInMonth() 
    
                        let salary = baserSalariesResult[0].amount / total_days * (data.attendance_no_of_shifts+weekOFFResult[0].attendance_count)
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
                                        let commission=commissionResults.length>0?commissionResults[0].commission:0
                                        if (loanResult.length > 0) {
    
                                            loan = loanResult[0].amount
                                            database.query("select amount from loan_repayment where loan_id=" + loanResult[0].id + " and month=" + month + " and year=" + year, (err, loanRepaymentResult, fields) => {
   
                                                if (loanRepaymentResult.length > 0) {
                                                    net_salary = salary + commission + expense + tea 
                                                    loan = loanRepaymentResult[0].amount
                                                }
                                                else {
                                                    net_salary = Number(salary) + Number(commission) + Number(expense) + tea 
                                                    loan = 0
                                                }
    
                                            })//number
                                        }
                                        else {
                                            net_salary = Number(salary) + Number(commission) + Number(expense) + tea 
                                            loan = 0
                                        }
                                        database.query("select sub_type from employees where id=" + data.employee_id, (err, employeeTypeResponse) => {
                                            console.log(err)
                                            if (employeeTypeResponse[0].sub_type === 'PF') {
                                                database.query("select min_wages_as_per_rule from employees where id= " + data.employee_id, (err, minWagesResult, fields) => {
                                                    console.log(err)
                                                    if(baserSalariesResult[0].amount>minWagesResult[0].min_wages_as_per_rule){
                                                        minWagesResult[0].min_wages_as_per_rule=baserSalariesResult[0].amount 
                                                    }
                                                    let salary_as_per_rule = minWagesResult[0].min_wages_as_per_rule
                                                    let per_day_salary = salary_as_per_rule / total_days
                                                    let days=moment().daysInMonth()
                                                    
                                                    for (let i = total_days; i > 0; i--) {
                                                        if ((per_day_salary * i) - net_salary <= per_day_salary&&(per_day_salary * i) - net_salary>=0 ) {
                                                            days = i
                                                            break;
                                                        }
                                                    }
                                                    if(net_salary===0){
                                                       days=0 
                                                    }
                                                    let cash_incentive =0
                                                    if(per_day_salary * days - net_salary>=0){
                                                        cash_incentive=per_day_salary * days - net_salary
                                                    }
                                                    else{
                                                        cash_incentive=net_salary-salary_as_per_rule
                                                    }
                                                    
                                                    database.query("Select value from settings where name in ('hra','basic')", (err, settingsResult) => {
                                                        console.log(err)
                                                        
                                        
                                                       
                                                        let total_deduction =  Number(advance) + Number(loan) + Number(fine)
                                                        let total_earnings = Number(expense) + Number(tea) + Number(salary) + Number(commission)
                                                        let basic_salary = Number(settingsResult[1].value) *per_day_salary * days  / 100
                                                        let hra = Number(settingsResult[0].value) * per_day_salary * days / 100
                                                        let esi=0
                                                        if (net_salary < 21000) {
                                                            esi = per_day_salary * days * 0.75 / 100 
                                                        }
                                                        let pf = basic_salary * 12 / 100
                                                        let net_payable_salary=0
                                                        if(per_day_salary * days - net_salary>=0){
                                                            net_payable_salary =per_day_salary * days - esi - pf-total_deduction-cash_incentive
                                                        }
                                                        else{
                                                            net_payable_salary=per_day_salary * days - esi - pf-total_deduction
                                                        }
                                                      
                                                        database.query("Insert into salaries (employee_id, working_days, month, computed, commission, expense, tea, advance, loan_emi,fine, total_earnings, total_deductions, net_salary, status, esi, pf, basic_salary, hra, days_shown, cash_incentive,net_payable_salary,year)values (" + data.employee_id + "," + working_days + "," + month + "," + salary + "," + commission + "," + expense + "," + tea + "," + advance + "," + loan + "," + fine+","+total_earnings + "," + total_deduction + "," + net_salary + ",'Pending'," + esi + "," + pf + "," + basic_salary + "," + hra + "," + days + "," + cash_incentive + "," + net_payable_salary +","+moment(from_date).year()+ ")", (err, salariesResult) => {
                                                            console.log(err)
                                                            pr.resolve(true)
                                                        })
                                                    })
                                                })
                                            }
                                            else {
                                                let total_deduction = ( Number(advance) + Number(loan) + Number(fine))
                                                let total_earnings = Number(expense) + Number(tea) +Number(salary) + Number(commission)
                                                net_salary=net_salary-total_deduction
                                                database.query("Insert into salaries (employee_id, working_days,fine, month, computed, commission, expense, tea, advance, loan_emi, total_earnings, total_deductions, net_salary, status,  basic_salary, hra, days_shown, cash_incentive,net_payable_salary,year)values (" + data.employee_id + "," + working_days + "," + fine + "," + month + "," + salary + "," + commission + "," + expense + "," + tea + "," + advance + "," + loan + "," + total_earnings + "," + total_deduction +","+net_salary + ",'Pending'," + null + "," + null + "," + null + "," + null + "," + null + ","+moment(from_date).year()+")", (err, salariesResult) => {
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

})

            }










module.exports = getSalaryDetails