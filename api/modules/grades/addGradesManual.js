const database=require("../../../config/database")
const addGradesManual=()=>{
database.query("select * from employees",(err,Result)=>{
    let promiseArray=[]
    Result.forEach((data)=>{
        let pr={}
        pr.promiseObj = new Promise((resolve, reject) => {
            pr.resolve = resolve
            pr.reject = reject
        })
        promiseArray.push(pr.promiseObj)
        database.query("Insert Into grades (employee_id,grade_1st,grade_2nd,grade_3rd,grade_4th,month,year,date) values ("+data.id+","+0+"," +0+","+0+","+0+","+new Date().getMonth()+","+new Date().getFullYear()+",current_timestamp())", (err, gradesData, fields) => {
            let from_date=moment().startOf('month')
            let to_date=moment().add(1,'d')
           pr.resolve(true)
          
            
            
       
        })
        
    })
    Promise.all(promiseArray).then(()=>{
        return
    })
})
}
module.exports= addGradesManual