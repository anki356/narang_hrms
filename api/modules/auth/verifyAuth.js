const database = require("../../../config/database");
const moment = require("moment")
const mysql = require("mysql")
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const verifyAuth = (req, res, next) => {
    const token = req.headers["authorization"];
    if(token)
   {
    
   jwt.verify(token.substring(7, token.length), 'secret', function (err, decoded) {
        if (decoded !== undefined) {
            database.connect(() => {
                
                    

                        req.body.result = {
                            role_id: decoded.data.role_id
                        }
                        
                        next()
                   
        })

    }


        else {
            res.json({
                statusCode:401,
                error:"Token is incorrect"
            })
        }
    })
}
else {
    res.json({
        statusCode:401,
        error:"Token is not present"
    })
}
}

module.exports = verifyAuth