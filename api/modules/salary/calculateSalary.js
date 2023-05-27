const database = require("../../../config/database");
const moment = require('moment')
const mysql = require('mysql')
const calculateSalary = async ( from_date, to_date, commission) => {
try {
   let month=moment(from_date).month()
   let year=moment(from_date).year()
    database.query("select base_salaries.amount as base_salary, employees.min_wages_as_per_rule as min_wages,loan_repayment.amount as loan_emi,count (attendance.id) as attendance_count,sum(expenses.amount) as expense_total,sum(advance.amount) as advance_total from attendance left join expenses on expenses.employee_id=attendance.employee_id left join advance on advance.employee_id=attendance.employee_id left join loan on loan.employee_id=attendance.employee_id left join loan_repayment on loan_repayment.loan_id=loan.id left join employees on employees.id=attendance.employee_id left join base_salaries on base_salaries.employee_id=attendance.employee_id where loan_repayment.month="+month+" and loan_repayment.year="+year+" and attendance.status='Present' and check_in_datetime>" + mysql.escape(from_date) + " and check_in_datetime<=" + mysql.escape(to_date)+"  group by attendance.employee_id ", (err, result, fields) => {
        
       
            let total_days = moment(from_date).daysInMonth()
            result.forEach((data)=>{
                let salary=data.base_salary/total_days*data.id_count
                // let salary = baseSalariesResult[0].amount / total_days * 25
                
                    let tea = 10 * data.attendance_count
                    if (tea > 300) {
                        tea = 300
                    }
    
                    expense = data.expense_total
                    if (expense === null) {
                        expense = 0
                    }
                    
                        let month = moment(from_date, 'YYYY-MM-DD').month()
                        let year = moment(from_date, 'YYYY-MM-DD').year()
                        let advance
                        let net_salary
                        advance = data.advance_total
                        if (advance === null) {
                            advance = 0
                        }
                        let loan = 0
    
                     
                                 
                                    if (data.loan_emi!==null) {
                                        net_salary = Number(salary) + Number(commission) - Number(expense) - tea - Number(advance)-data.loan_emi
                                       
                                    }
                                    else {
                                        net_salary = Number(salary) + Number(commission) - Number(expense) - tea - Number(advance)
                                    }
                                    
                               
                           
                            
                            
                                console.log(err)
                                let salary_as_per_rule = data.min_wages
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
} catch (error) {
    console.log("calculateSalary",error)
}



}

module.exports = calculateSalary