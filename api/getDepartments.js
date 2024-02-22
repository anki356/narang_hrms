const database = require("../config/database");
const mysql = require("mysql")
const getDepartments = (req, res, next) => {
    let query="select * from departments"
    if(req.query.department_id){
        query+=" where id="+req.query.department_id
    }
    if(req.query.limit){
        query+=" limit "+req.query.limit
       }
       if(req.query.offset){
        query+=" Offset "+req.query.offset
      
       }
       
            database.query(query, (err, departments, fields) => {
                res.send(departments) 
                    
            })
       

}

module.exports=getDepartments