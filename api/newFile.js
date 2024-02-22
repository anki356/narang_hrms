const database=require("../config/database")
const insertAttendanceData = (req,res,next) => {
    // Prepare the SQL query
    const query = 'INSERT INTO attendance (check_in_datetime, status, employee_id) VALUES ?';
  
    // Transform the JSON data into a 2D array
    const values = req.body.map((record) => [
      record.check_in_datetime,
      record.status,
      record.employee_id,
    ]);
  
    // Execute the batch insert query
    database.query(query, [values], (err, result) => {
      if (err) {
        console.error('Error inserting attendance data:', err);
      } else {
        console.log('Attendance data inserted successfully');
      }
    });
  };
 module.exports=insertAttendanceData 