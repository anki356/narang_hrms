const database = require("../../../config/database");
const mysql = require("mysql")
const moment = require('moment')
const axios = require('axios');
const addAttendance = (req, res, next) => {

    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = ['Guard']
        if (allowed_roles.includes(result[0].role_name)) {
            let day = moment().subtract(1,'d')
            let timeOfAbsent = day.set('h', 0).set('m', 0).set('s', 0)
            axios.get('http://49.205.181.193:8081/api/v2/WebAPI/GetDeviceLogs?APIKey=330718082302&FromDate=' + moment().subtract(1,'d').format("YYYY-MM-DD") + "&ToDate=" + moment().format("YYYY-MM-DD")).then((response) => {
                let log_array=[]

var new_array=response.data.map((data)=>data.EmployeeCode)
var new_array=new_array.filter((value, index, new_array) =>{
  return new_array.indexOf(value) === index;
})
new_array.forEach((data)=>{
    let obj={}
    obj.EmployeeCode=data
    obj.timing=[]
    response.data.forEach((element)=>{
    if(element.EmployeeCode===data){
        obj.timing.push(element.LogDate)
    }
    })
    log_array.push(obj)
  })
  log_array=log_array.filter((data)=>{
    return data.timing.length>1&& data.timing.length<4
  })
  log_array.forEach((data)=>{
   data.timing= data.timing.sort((a,b)=>{
    if(moment(a).diff(b)<0){
      return -1
    }
     else if(moment(a).diff(b)>0){
      return 1
     }
     else{
      return 0
     }
    })
  })
  log_array=log_array.filter((data)=>{
    return moment().set('h',5).diff(data.timing[1])>0
  })
 
  log_array.forEach((data)=>{
    if (moment().set('h',0).diff(data.timing[1])>0){
        data.shift=1
    }
    else if(moment().set('h',2).diff(data.timing[1])>0){
data.shift=1.5
    }
    else{
        data.shift=2
    }
  })
  console.log(log_array);
 
  
                let promiseArray = []
                let attendanceArray = []
                log_array.forEach((element) => {
                    let pr={}
                    pr.promiseObj = new Promise((resolve, reject) => {
                        pr.resolve = resolve
                        pr.reject = reject
                    })
                    promiseArray.push(pr.promiseObj)
                    database.query("select id from employees where employee_id =" + element.EmployeeCode , (err, response) => {
if(response.length>0){
    database.query("select id from attendance where check_in_datetime=" + mysql.escape(timeOfAbsent.format("YYYY-MM-DDTHH:mm:ss")) + " and employee_id =" + response[0].id + " and status='Absent'", (err, attendanceAbsentResult) => {
        if(attendanceAbsentResult.length>0)
                                      {
        console.log(attendanceAbsentResult[0].id)
                                    database.query("update attendance set check_in_datetime=" +mysql.escape(element.timing[0])+ " , status='Present',no_of_shifts="+element.shift+" where id=" + attendanceAbsentResult[0].id, async (err, attendanceResult, fields) => {
                                        console.log(err)
                                        attendanceArray.push(attendanceResult)
                                        let today = new Date()
                                        let date = today.getDate()
                                        let month = Number(today.getMonth()) + 1
                                        let break_point = moment().set('hour', 10).set('minute', 40).set('second', 0)
                                        let fine = moment().diff(break_point, 'minutes')
                                        fine = Number(fine) + Number(1)
                                        if (fine > 0) {
        
        
                                            database.query("Insert into fines (employee_id,amount,reason,date,recall_head,head_approval,status,payment_status,status_date) values (" + response[0].id + "," + Number(fine) + 1 + ",'Late Coming', current_timestamp(),1,1,'Approved','Unpaid',current_timestamp)", (err, fineResult) => {
        
                                                pr.resolve(true)
                                            })
        
        
        
                                        } else {
                                            pr.resolve(true)
                                        }
        
        
        
        
                                    })
                                    }
                                    else{
                                        pr.resolve(true)
                                    }
                                    // else{
                                    //     database.query("Insert into attendance (check_in_datetime,status,employee_id,no_of_shifts) values (current_timestamp(),'Present',"+req.body.employee_id+",2)",(err,attendanceResult)=>{
                                    //         console.log(err)
                                    //         res.send(attendanceResult)
                                    //     })
                                })
            
}
else{
    pr.resolve(true)
}
                  

    })

})
Promise.all(promiseArray).then(()=>{
    res.send(attendanceArray)
})
            })
        }
    })
}


module.exports = addAttendance