const database = require("../../../config/database");
const mysql = require("mysql")
const getTotalLeaves = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','Super Admin','Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="SELECT count (id) as count_id from leaves where((leaves.from_date between "+mysql.escape(req.query.from_date)+" and "+ mysql.escape(req.query.to_date)+" )or (leaves.to_date between "+mysql.escape(req.query.from_date)+" and "+ mysql.escape(req.query.to_date)+"))"
            if(req.query.status){
                queryString+=" and status="+ req.query.status
            }
            database.query(queryString , (err, leavesData, fields) => {
                console.log(err)
                res.send(leavesData) 
                    
            })
        }



    })

}
module.exports=getTotalLeaves