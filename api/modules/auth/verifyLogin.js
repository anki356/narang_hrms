const database = require("../../../config/database");
const mysql = require("mysql")
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const verifyLogin = (req, res, next) => {


    database.connect((err) => {
        console.log(err)
        if(!err){
            database.query("SELECT * from users left join employees on employees.id=users.employee_id left join job_details on job_details.id=employees.job_details_id left join roles on roles.id=job_details.role_id  WHERE users.username = " + mysql.escape(req.body.username) +" and employees.status=1 ", (err, userResult, fields) => {
                console.log(userResult)
    
                console.log("err",err);
    
                if (userResult?.length === 0) {
    
    
                  return  res.json({
                        statusCode: 401,
                        error: "Username is in correct"
                    })
    
                }
                else {
    
                    bcrypt.compare(req.body.password, userResult[0].password, function (err, result) {
                        if (!result)  return res.json({
                            statusCode: 401,
                            error: "Password is incorrect"
                        })
                        else {
    
                            var token = jwt.sign({
                                data: {
                                    username: userResult[0].username,
                                    role_id: userResult[0].role_id
                                }
                            }, 'secret');
                            return res.json({
                                token: token,
                                username: userResult[0].username,
                                role_id: userResult[0].role_id
                            })
                        }
    
                    })
    
                }
            })
            
        }
   
    })


}
module.exports = verifyLogin