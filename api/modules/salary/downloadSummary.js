const database = require("../../../config/database");
const moment = require('moment')
const mysql = require('mysql')
const ejs = require('ejs');
var path = require('path');
const pdf = require('html-pdf');
const fs = require('fs');
const downloadSummary = async ( req,res,next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id,async (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
         
            try {
                ejs.renderFile(path.join(__dirname, './views/', "template.ejs"), {name: "John Doe"}, (err, data) => {
                    if (err) {
                          res.send(err);
                    } else {
                        let options = {
                            "height": "11.25in",
                            "width": "8.5in",
                            "header": {
                                "height": "20mm"
                            },
                            "footer": {
                                "height": "20mm",
                            },
                        };
                        pdf.create(data, options).toFile(path.join(__dirname, './views/',"report.pdf"), function (err, data) {
                            if (err) {
                                res.send(err);
                            } else {
                                res.sendFile(path.join(__dirname, './views/',"report.pdf"));
                            }
                        });
                    };
                })
               
            } catch (err) {
                console.log("Error processing request: " + err);
            }
            };
            
           
            
})

        }

   




module.exports = downloadSummary