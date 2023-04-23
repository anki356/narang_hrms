const database = require("../../../config/database");
const moment=require('moment')
const mysql=require('mysql')
const getSalaryDetails = async(req,res,next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id,async (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Assistant','HR Head','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
        
      
          await  database.query("select count (id) as id_count from attendance where employee_id="+req.query.employee_id+" and status='Present'",(err,attendanceCountResult,fields)=>{
                
            database.query("select amount from base_salaries where employee_id="+req.query.employee_id,(err,baserSalariesResult,fields)=>{
                let total_days=moment().daysInMonth()
                
                // let salary=baserSalariesResult[0].amount/total_days*attendanceCountResult[0].id_count
                let salary=baserSalariesResult[0].amount/total_days*25
                database.query("select sum(amount) as expense_total from expenses where employee_id="+req.query.employee_id,(err,expenseResult,fields)=>{
                    let tea=10*attendanceCountResult[0].id_count
                    if(tea>300){
tea=300
                    }
                    
                    expense=expenseResult[0].expense_total
                    if(expense===null){
                        expense=0
                    }
                database.query("select sum(amount) as advance_total from advance where employee_id="+req.query.employee_id+" and date>="+req.query.from_date+" and date<="+req.query.to_date,(err,advanceResult,fields)=>{
                   
                    let month=moment(req.query.from_date,'YYYY-MM-DD').month()
                    let year=moment(req.query.from_date,'YYYY-MM-DD').year()
                    let advance
                    let net_salary
                    advance=advanceResult[0].advance_total
                    if(advance===null){
                        advance=0
                    }
                    let loan=0
                    
                    database.query("select id from loan where employee_id="+req.query.employee_id,(err,loanResult,fields)=>{
                        
                        if(loanResult.length>0){

                        loan=loanRepaymentResult[0].amount
                    database.query("select amount from loan_repayment where loan_id="+loanResult[0].id+" and month="+month+" and year="+year,(err,loanRepaymentResult,fields)=>{
               
                         net_salary=salary+req.query.commission-expense-tea-advance-loanRepaymentResult[0].amount
                    })//number
                }
                else{
                    net_salary=Number(salary)+Number(req.query.commission)-Number(expense)-tea-Number(advance)
                }
               
                        database.query("select min_wages_as_per_rule from employees where id= "+req.query.employee_id,(err,minWagesResult,fields)=>{
                            console.log(err)
                            let salary_as_per_rule=minWagesResult[0].min_wages_as_per_rule
                            let per_day_salary=salary_as_per_rule/total_days
                            let days
                          for(let i=total_days;i>0;i--){
                              if((per_day_salary*i)-net_salary<per_day_salary){
                               days=i
                               break;
                              }
                          }
                          let cash_incentive=per_day_salary*days-net_salary
                          database.query("Select value from settings where name in ('hra','basic')",(err,settingsResult)=>{
                            console.log(err)
let basic_salary=Number(settingsResult[1].value)*net_salary/100
let hra=Number(settingsResult[0].value)*net_salary/100
database.query("select type from employees where id="+req.query.employee_id,(err,employeeTypeResponse)=>{
    console.log(err)
    if(employeeTypeResponse[0].type==='PF'){
        let esi
        if(net_salary<21000){
        esi= basic_salary*0.75/100*60/100
        }
        let pf=basic_salary*12/100
        let net_payable_salary=net_salary-esi-pf
        res.json({"days":days,"net_salary":net_salary,"cash_incentive":cash_incentive,"basic":basic_salary,"hra":hra,"esi":esi,"pf":pf,"net_payable_salary":net_payable_salary,"advance":advance,"expense":expense,"loan":loan,"tea":tea,"working_days":attendanceCountResult[0].id_count,"computed":salary})
    }
    else{
        res.json({"days":days,"net_salary":net_salary,"cash_incentive":cash_incentive,"basic":basic_salary,"hra":hra,"net_payable_salary":net_salary,"advance":advance,"expense":expense,"loan":loan,"tea":tea,"working_days":attendanceCountResult[0].id_count,"computed":salary})
    }

   
})


                             
                          })
                        })

            })
            })  
        })
            })
               
            })  
        

        
        
    }
    })
   


}

module.exports=getSalaryDetails