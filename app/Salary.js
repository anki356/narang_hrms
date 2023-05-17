const addSalaryDetails = require("../api/modules/salary/addSalaryDetails")
const calculateSalary = require("../api/modules/salary/calculateSalary")
const database = require("../config/database");
const moment = require('moment')
const Salary = () => {
    database.query("Select id from employees", async (err, result) => {

        // console.log("query result,", result);
        console.log("query result first result,", result[0]);
        // var results = await Promise.all(arr.map(async (item): Promise<number> => {
        //     await callAsynchronousOperation(item);
        //     return item + 1;
        // }));
        const results = await Promise.all(result.map( async (data) => {
            let month = new Date().getMonth()
            let year = new Date().getFullYear()
            let from_date = moment([year, month - 1])
            let end_date = moment(from_date).endOf('month')
            const salary = await calculateSalary(data.id, from_date.format("YYYY-MM-DD"), end_date.format("YYYY-MM-DD"), 1000)
        return salary
        }));

        console.log("set of ids", results);
        // let pr={}
        // pr.pr=new Promise((resolve,reject)=>{
        //   pr.resolve=resolve
        //   pr.reject=reject
        // })
        // let promiseArray=[]
        // let resultArray=[]
        // result.forEach(async (data)=>{
        // let pr={}
        // pr.pr=new Promise((resolve,reject)=>{
        //   pr.resolve=resolve
        //   pr.reject=reject
        // })
        // promiseArray.push(pr)
        //             let month=new Date().getMonth()
        //             let year=new Date().getFullYear()
        //            let from_date= moment([year,month-1])
        //            let end_date=moment(from_date).endOf('month')
        //    let result=await calculateSalary(data.id,from_date.format("YYYY-MM-DD"),end_date.format("YYYY-MM-DD"),1000)
        //     console.log("result",result)



        //         })
    })
}
module.exports = Salary
