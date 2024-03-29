const database = require("../../../config/database");
const getEmployeeDetails = (req, res, next) => {
  const role_id = req.body.result.role_id;
  database.query("Select * from roles where id=" + role_id, (err, result) => {
    if (err) console.log(err);
    let allowed_roles = [
      "HR Assistant",
      "HR Head",
      "Admin",
      "Super Admin",
      "Floor Incharge",
      "Guard",
    ];
    if (allowed_roles.includes(result[0].role_name)) {
      let queryString =
        "SELECT departments.name as department_name,weekoffs.week_off, bank_details.name as bank_name,roles.role_name as role_name, base_salaries.*,file_upload.name as photo,floors.name as floor_name,employees.employee_id as empID, job_details.*,bank_details.*,locations.name as location_name,locations.id as location_id, floors.id as floor_id,store_departments.name as store_department_name,employees.*,users.username from employees left join bank_details on bank_details.id=employees.bank_details_id left join job_details on job_details.id=employees.job_details_id  left join floors on floors.id =job_details.floor_id left join locations on locations.id =job_details.location_id left join roles on roles.id=job_details.role_id left join store_departments on store_departments.id=job_details.store_department_id left join file_upload on file_upload.id=employees.photo_id left join base_salaries on base_salaries.employee_id =employees.id left join weekoffs on weekoffs.employee_id=employees.id left join departments on departments.id=job_details.department_id left join users on users.employee_id=employees.id";
      if (req.query.id) {
        queryString += " where employees.id=" + req.query.id +" and employees.status=1"  ;
      }
      if (req.query.employee_query) {
        queryString +=
          " where (employees.employee_id like '%" +
          req.query.employee_query +  
          "%'or employees.name like '%" +
          req.query.employee_query +
          "%')" +" and employees.status=1" ;
      }
      console.log(queryString);
      database.query(queryString, (err, employeesResult, fields) => {
        console.log(err,employeesResult);
        if(employeesResult.length>0){

          database.query(
            "select documents.*,file_upload.*,file_upload.name as file_name from documents left join file_upload on file_upload.id=documents.file_id where employee_id=" +employeesResult[0].id,
            (err, documentResult) => {
              database.query(
                "select loan.*,loan.amount as loan_amount,loan.status as loan_status from loan  where employee_id=" +
                employeesResult[0].id+" and status='Approved'",
                (err, loanResult) => {
                  console.log(err)
                  database.query(
                    "select advance.*,advance.status as advance_status from advance where employee_id=" +
                    employeesResult[0].id,
                    (err, advanceResult) => {
                      if (result[0].role_name !== "HR Assistant") {
                        database.query(
                          "select salaries.* from salaries where employee_id=" +
                          employeesResult[0].id,
                          (err, salariesResult) => {
                            database.query(
                              "select * from salaries_increment where employee_id=" +
                              employeesResult[0].id,
                              (err, salariesIncrementResult) => {
                                database.query(
                                  "select employees.name as head_employee_name from job_details left join employees on job_details.head_employee_id=employees.id where job_details.id=" +
                                    employeesResult[0].job_details_id,
                                  (err, headEmployeesResult) => {
                                    console.log(headEmployeesResult);
                                    database.query(
                                      "select employees.name as hired_by_employee_name,employees_a.name as supervisor_name from job_details left join employees on job_details.hired_by_employee_id=employees.id left join employees as employees_a on employees_a.id=job_details.supervisor_id where job_details.id=" +
                                        employeesResult[0].job_details_id,
                                      (err, hiredByEmployeeResult) => {
                                        console.log(hiredByEmployeeResult);
                                        res.json({
                                          employeesResult: employeesResult,
                                          documentResult: documentResult,
                                          salariesResult: salariesResult,
                                          salariesIncrementResult:
                                            salariesIncrementResult,
                                          loanResult: loanResult,
                                          advanceResult: advanceResult,
                                          headEmployeesResult:
                                            headEmployeesResult,
                                          hiredByEmployeeResult:
                                            hiredByEmployeeResult,
                                        });
                                      }
                                    );
                                  }
                                );
                              }
                            );
                          }
                        );
                      } else {
                        database.query(
                          "select employees.name as head_employee_name from job_details left join employees on job_details.head_employee_id=employees.id where job_details.id=" +
                            employeesResult[0].job_details_id,
                          (err, headEmployeesResult) => {
                            console.log(err);
                            database.query(
                              "select employees.name as hired_by_employee_name from job_details left join employees on job_details.hired_by_employee_id=employees.id where job_details.id=" +
                                employeesResult[0].job_details_id,
                              (err, hiredByEmployeeResult) => {
                                console.log(err);
                                res.json({
                                  employeesResult: employeesResult,
                                  documentResult: documentResult,
                                  loanResult: loanResult,
                                  advanceResult: advanceResult,
                                  headEmployeesResult: headEmployeesResult,
                                  hiredByEmployeeResult: hiredByEmployeeResult,
                                });
                              }
                            );
                          }
                        );
                      }
                    }
                  );
                }
              );
            }
          );
        }
        else{
          res.send(employeesResult)
        }
      });
    }
  });
};

module.exports = getEmployeeDetails;
