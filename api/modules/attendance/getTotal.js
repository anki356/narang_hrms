const database = require("../../../config/database");
const mysql = require("mysql");
const getTotal = (req, res, next) => {
  const role_id = req.body.result.role_id;
  database.query("Select * from roles where id=" + role_id, (err, result) => {
    database.query(
      "select role_id ,permissions.name from permission_roles left join permissions on permissions.id=permission_roles.permission_id where name='Attendance'",
      (err, allowed_roles) => {
        allowed_roles = allowed_roles.map((data) => {
          return data.role_id;
        });
        // let allowed_roles = ['Admin', 'Super Admin', 'HR Head', 'HR Assistant','Floor Incharge']

        if (allowed_roles.includes(role_id)) {
          if (result[0].role_name.split(" ")[0] === "Floor") {
            database.query(
              "select employees.id from employees left join job_details on job_details.id=employees.job_details_id where job_details.role_id=" +
                role_id,
              (err, employeesResult, fields) => {
                console.log(err);
                let queryString =
                  "Select count(attendance.id) as count_id from attendance left join employees on employees.id=attendance.employee_id left join job_details on job_details.id=employees.job_details_id where check_in_datetime>=" +
                  mysql.escape(req.query.from_date) +
                  "and check_in_datetime<" +
                  mysql.escape(req.query.to_date) +
                  " and status=" +
                  req.query.status +
                  " and job_details.head_employee_id=" +
                  employeesResult[0].id +" and employees.status=1"  
                if (req.query.role_name) {
                  queryString +=
                    " and job_details.role_id=" + req.query.role_id;
                }
                database.query(queryString, (err, attendanceResult, fields) => {
                  console.log(err, attendanceResult);
                  res.send(attendanceResult);
                });
              }
            );
          } else {
            let queryString =
              "Select count(id) as count_id from attendance where check_in_datetime>=" +
              mysql.escape(req.query.from_date) +
              "and check_in_datetime<" +
              mysql.escape(req.query.to_date) +
              " and status=" +
              req.query.status;
            if (req.query.role_name) {
              queryString += " and roles.role_name=" + req.query.role_name;
            }
            database.query(queryString, (err, attendanceResult, fields) => {
              console.log("err", err);
              res.send(attendanceResult);
            });
          }
        }
      }
    );
  });
};

module.exports = getTotal;
