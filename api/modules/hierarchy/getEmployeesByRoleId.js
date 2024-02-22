const database = require("../../../config/database");
const mysql = require("mysql")
const getHierarchy =(req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id,async (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head', 'Admin', 'Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
         function fetchTreeData(callback) {
                let query =" select file_upload.name as photo,employees.name as employee_name,employees.id ,departments.id as department_id,locations.id as location_id,roles.role_name as role_name, job_details.head_employee_id  from employees left join job_details on job_details.id=employees.job_details_id left join file_upload on file_upload.id=employees.photo_id  left join locations on locations.id=job_details.location_id  left join roles on job_details.role_id=roles.id left join departments on departments.id=job_details.department_id where employees.status=1";
                
                if(req.query.location_id){
                  query+=" where role_location_a.location_id="+req.query.location_id;
                }
                if(req.query.department_id){
                  query+=" where role_a.department_id="+req.query.department_id
                }
                database.query(query, (err, rows) => {
                  if (err) throw err;
                  callback(rows);
                });
              }
              // async function fetchEmployeeData(value) {
              //   return new Promise((resolve, reject) => {
                 
              //     database.query("select role_id,location_id from roles_locations where id="+value,(err,roleLocationData)=>{
              //       console.log(err)
              //       const query =  "select file_upload.name as photo,employees.name as employee_name,employees.id , job_details.head_employee_id  from employees left join job_details on job_details.id=employees.job_details_id left join file_upload on file_upload.id=employees.photo_id where role_id="+ roleLocationData[0].role_id+" and location_id="+roleLocationData[0].location_id+" and employees.status=1";

              //       database.query(query, (err, rows) => {
              //         if (err) console.log(err);
              //         resolve(rows);
              //       });
              //     })
                   
              //   });
              // }
              fetchTreeData(async(treeData) => {
                const treeArray = await traverseTree(treeData);
       
             

                    res.json(treeArray);
               

              });
              
              async function traverseTree(nodes, head_employee_id = null) {
                const result = [];
                const filteredNodes = nodes.filter((node) => node.head_employee_id === head_employee_id);
              
                for (const node of filteredNodes) {
                  const newNode = {
                    value: node.id,
                    employee_name: node.employee_name,
                    children: await traverseTree(nodes, node.id),
                    location_id: node.location_id,
                    department_id: node.department_id,
                    role_name:node.role_name
                  };
              
                  result.push(newNode);
                }
              
                return result;
              }
              
             
            
             
              
              
              
              
              
              
                 
              
              
        }
    })
}

module.exports = getHierarchy