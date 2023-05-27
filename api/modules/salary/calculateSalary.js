const database = require("../../../config/database");
const moment = require('moment')
const mysql = require('mysql')
const calculateSalary = async ( from_date, to_date, commission) => {
try {
   let month=moment(from_date).month()
   let year=moment(from_date).year()
    database.query("select count (attendance.id) as attendance_count, attendance.employee_id as employee_idattendance.status='Present' and check_in_datetime>" + mysql.escape(from_date) + " and check_in_datetime<=" + mysql.escape(to_date)+" ) group by attendance.employee_id ", (err, result, fields) => {
        console.log(result)
       
            let total_days = moment(from_date).daysInMonth()
            let promiseArray=[]
            result.forEach((data,index)=>{
                
                let pr={}
                pr.pr=new Promise((resolve, reject) => {
                    pr.resolve=resolve
                    pr.reject=reject
                })
promiseArray[index]=pr.pr
                let salary=data.base_salary/total_days*data.attendance_count
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
    if(data.loan_emi!==null){
        data.loan_emi=0
    }
                     
                                 
                                   
                                        net_salary = Number(salary) + Number(commission) - Number(expense) - tea - Number(advance)-data.loan_emi
                                       
                                    
                               
                           
                            
                            
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
                                    database.query("select type from employees where id=" + data.employee_id, (err, employeeTypeResponse) => {
                                        console.log(err)
                                        if (employeeTypeResponse[0].type === 'PF') {
                                            let esi
                                            if (net_salary < 21000) {
                                                esi = basic_salary * 0.75 / 100 * 60 / 100
                                            }
                                            let pf = basic_salary * 12 / 100
                                            let net_payable_salary = net_salary - esi - pf
                                            database.query("Insert into salaries (employee_id, working_days, month, computed, commission, expense, tea, advance, loan_emi, total_earnings, total_deductions, net_salary, status, esi, pf, basic_salary, hra, days_shown, cash_incentive,net_payable_salary)values ("+data.employee_id+","+data.attendance_count+","+month+","+salary+","+commission+","+expense+","+tea+","+advance+","+loan+","+Number(salary) + Number(commission)+","+(Number(expense) + tea + Number(advance)+Number(data.loan_emi))+","+net_salary+",'Unpaid',"+esi+","+pf+","+basic_salary+","+hra+","+days+","+cash_incentive+","+net_payable_salary+")",(err,salariesResult)=>{
                                              pr.resolve(true)  
                                            })
                                            // return { "days": days, "net_salary": net_salary, "cash_incentive": cash_incentive, "basic": basic_salary, "hra": hra, "esi": esi, "pf": pf, "net_payable_salary": net_payable_salary, "advance": advance, "expense": expense, "loan": loan, "tea": tea, "working_days": attendanceCountResult[0].id_count, "computed": salary }
                                        }
                                        else {
                                            database.query("Insert into salaries (employee_id, working_days, month, computed, commission, expense, tea, advance, loan_emi, total_earnings, total_deductions, net_salary, status,  basic_salary, hra, days_shown, cash_incentive,net_payable_salary)values ("+data.employee_id+","+data.attendance_count+","+month+","+salary+","+commission+","+expense+","+tea+","+advance+","+loan+","+Number(salary) + Number(commission)+","+(Number(expense) + tea + Number(advance)+Number(data.loan_emi))+","+net_salary+",'Unpaid',"+basic_salary+","+hra+","+days+","+cash_incentive+","+net_salary+")",(err,salariesResult)=>{
                                                console.log("here",err)
                                              pr.resolve(true) 
                                            })
                                            // console.log({ "days": days, "net_salary": net_salary, "cash_incentive": cash_incentive, "basic": basic_salary, "hra": hra, "net_payable_salary": net_salary, "advance": advance, "expense": expense, "loan": loan, "tea": tea, "working_days": attendanceCountResult[0].id_count, "computed": salary })
                                            // return { "days": days, "net_salary": net_salary, "cash_incentive": cash_incentive, "basic": basic_salary, "hra": hra, "net_payable_salary": net_salary, "advance": advance, "expense": expense, "loan": loan, "tea": tea, "working_days": attendanceCountResult[0].id_count, "computed": salary }
    
                                        }
    
    
                                    })
    
    
    
                                })
                    
    
                
                
            
        
            })
            Promise.all(promiseArray).then(()=>{
                return  
            })

    })
} catch (error) {
    console.log("calculateSalary",error)
}



}

module.exports = calculateSalary