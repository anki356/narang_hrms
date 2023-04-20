const database = require("../../../config/database");
const mysql = require("mysql")
const addLoan = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = ['HR Head']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("Insert into file_upload (type,name) values ('loan_document_image'," + mysql.escape(req.file.filename) + ")", (err, fileResult, fields) => {
                database.query("Insert Into loan (employee_id,amount,tenure,approval_status,file_upload_id,date,recall_head,head_approval) values(" + req.body.employee_id + "," + mysql.escape(req.body.amount) + "," + mysql.escape(req.body.tenure) + "," + mysql.escape(req.body.approval_status) + "," + fileResult.insertId + ",current_timestamp()," + req.body.recall_head + "," + req.body.head_approval + ")", async(err, loanResult, fields) => {
                    console.log(err)
                    loanResult.loan_repaymentData = []
                    
                    for (let i = 0; i < req.body.tenure; i++) {
                        let month=Number(req.body.month)+i                 

if(month<12){
    console.log(req.body.amount_array[i])
    await    database.query("Insert Into loan_repayment (loan_id,date,month,year,status,amount) values(" + loanResult.insertId +","+new Date(req.body.date).getDate()+","+month +","+new Date(req.body.date).getFullYear()  + ",'Unpaid',"+req.body.amount_array[i]+")", (err, loanRepaymentResult, fields) => {
        console.log(err)
            loanResult.loan_repaymentData.push(loanRepaymentResult)
        })
        
    }
    else{
        month_new=month%12
        let year=new Date(req.body.date).getFullYear()+(month/12)
        await    database.query("Insert Into loan_repayment (loan_id,date,month,year,status,amount) values(" + loanResult.insertId +","+new Date(req.body.date).getDate()+","+month_new +","+year  + ",'Unpaid',"+req.body.amount_array[i]+")", (err, loanRepaymentResult, fields) => {
            console.log(err)
                loanResult.loan_repaymentData.push(loanRepaymentResult)
            })
            

    }
}
res.send(loanResult)         
                    

                })
            })
        }


    })

}

module.exports = addLoan