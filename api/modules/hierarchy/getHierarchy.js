const database = require("../../../config/database");
const mysql = require("mysql")
const getHierarchy =(req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id,async (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head', 'Admin', 'Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
         function fetchTreeData(callback) {
                let query = 'SELECT *,locations.name as location_name,  role_a.role_name as child_name,role_b.role_name as parent_name FROM hierarchy left join roles as role_a on role_a.id=hierarchy.child_role_id left join roles as role_b on role_b.id=hierarchy.parent_role_id left join locations on role_a.location_id=locations.id where role_a.location_id='+req.query.location_id;
                if(req.query.department_id){
                  query+=" and role_a.department_id="+req.query.department_id
                }
                database.query(query, (err, rows) => {
                  if (err) throw err;
                  callback(rows);
                });
              }
              async function fetchEmployeeData(value) {
                return new Promise((resolve, reject) => {
                  const query =
                    "select * from employees left join job_details on job_details.id=employees.job_details_id where role_id="+value;
                  database.query(query, (err, rows) => {
                    if (err) reject(err);
                    resolve(rows);
                  });
                });
              }
              fetchTreeData(async(treeData) => {
                const treeArray = await traverseTree(treeData);
       
//                 var promiseArray=[]
//                 treeArray.forEach((data,index)=>{
//                     let promise={}
//                     promise.pr=new Promise((resolve,reject)=>{
//                         promise.resolve=resolve
//                         promise.reject=reject
//                     })
//                     promiseArray[index]=promise.pr
                    
// data['employees']=fetchEmployeeData(data.value)
// promise.resolve(true)
//                     })
//                 })
//                 Promise.all(promiseArray).then(()=>{

                    res.json(treeArray);
                // })

              });
              
              async function traverseTree(nodes, parent_role_id = null) {
                const result = [];
                const filteredNodes = nodes.filter((node) => node.parent_role_id === parent_role_id);
              
                for (const node of filteredNodes) {
                 
                  const newNode = {
                    value: node.child_role_id,
                    role_name: node.child_name,
                    children: await traverseTree(nodes, node.child_role_id),
                    employees: await fetchEmployeeData(node.child_role_id),
                    location_name:node.location_name
                  };
                  
                  // Perform desired operations on the node
                  
                  result.push(newNode);
                }
                
                return result;
              }
             
            
             
              
              
              
              
              
              
                 
              
              
        }
    })
}

module.exports = getHierarchy