const database = require("../config/database");
const mysql = require("mysql")
const getCategories = (req, res, next) => {
    
            database.query("select * from expenses_categories", (err, expensesCategoriesData, fields) => {
                console.log(err)
                res.send(expensesCategoriesData) 
                    
            })
       

}

module.exports=getCategories