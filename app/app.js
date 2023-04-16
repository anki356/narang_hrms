const express = require("express");
const app = express();
const database = require("../config/database"); 
var cors = require("cors");
const path = require("path")
const router=express.Router()
 require('express-async-errors');
 const cron = require("node-cron");




    



 app.use(
   express.json({ extended: true, parameterLimit: 100000, limit: "500mb" })
 );

app.use(cors());

app.use("/",router)

 const multer = require("multer")
 const errorHandlerMiddleware=require("../errorHandler/errorHandlerMiddleware")
 const notFound=require("../errorHandler/notFound")
const verifyAuth=require("../api/modules/auth/verifyAuth")
const register=require("../api/modules/auth/register")
const getAttendance=require('../api/modules/attendance/getAttendance')
const getTotalExpenseADay=require('../api/modules/expense/getTotalExpenseADay')
const getExpenses=require('../api/modules/expense/getExpenses')
const getTotalEmployees=require('../api/modules/expense/getTotalEmployees')
const addExpenses=require('../api/modules/expense/addExpenses')
const addExpenseSubCategory=require('../api/modules/expense/addExpenseSubCategory')
const getTimings=require('../api/modules/timing/getTimings')
const getTotalSessions=require('../api/modules/timing/getTotalSessions')
const addTiming=require('../api/modules/timing/addTiming')
const updateTiming=require('../api/modules/timing/updateTiming')
const updateTimingCorrection=require('../api/modules/timing/updateTimingCorrection')
const getTotalApprovals=require('../api/modules/timing/getTotalApprovals')
const getEmployees=require('../api/modules/employees/getEmployees')
const addLoan=require('../api/modules/loan/addLoan')
const getLoans=require('../api/modules/loan/getLoans')
const getTotalLoansGranted=require('../api/modules/loan/getTotalLoansGranted')
const getTotalEmployeesTakenLoan=require('../api/modules/loan/getTotalEmployeesTakenLoan')
const getTotalPendingEmis=require('../api/modules/loan/getTotalPendingEmis')
const getAdvance=require('../api/modules/advance/getAdvance')
const addAdvance=require('../api/modules/advance/addAdvance')
const updateAdvanceStatus=require('../api/modules/advance/updateAdvanceStatus')
const updateLoanStatus=require('../api/modules/loan/updateLoanStatus')
const getFines=require('../api/modules/fines/getFines')
const addFine=require('../api/modules/fines/addFine')
const editFine=require('../api/modules/fines/editFine')
const getTotalFines=require('../api/modules/fines/getTotalFines')
const getTotalFinedEmployees=require('../api/modules/fines/getTotalFinedEmployees')
const addLeave=require('../api/modules/leaves/addLeave')
const getLeaves=require('../api/modules/leaves/getLeaves')
const updateExpenseStatus=require('../api/modules/expense/updateExpenseStatus')
const updateFineApproval=require('../api/modules/fines/updateFineApproval')
const updateLeaveStatus=require('../api/modules/leaves/updateLeaveStatus')
const updateTimingStatus=require('../api/modules/timing/updateTimingStatus')
const addTransfer=require('../api/modules/transfer/addTransfer')
const getTransfer=require('../api/modules/transfer/getTransfer')
const addTransferWithStoreId=require('../api/modules/transfer/addTransferWithStoreId')
const updateAttendance=require('../api/modules/attendance/updateAttendance')
const addInterview=require('../api/modules/interview/addInterview')
const getInterview=require('../api/modules/interview/getInterview')
const addGradesBYFI=require('../api/modules/grades/addGradesBYFI')
const getGrades=require('../api/modules/grades/getGrades')
const makeAttendanceCorrectionRequests=require('../api/modules/attendance/makeAttendanceCorrectionRequests')
const getAttendanceCorrectionRequests=require('../api/modules/attendance/getAttendanceCorrectionRequests')
const getTotalEmployeesOnLeave=require('../api/modules/leaves/getTotalEmployeesOnLeave')
const restructureLoans=require('../api/modules/loan/restructureLoans')
const addGradesByAdmins=require('../api/modules/grades/addGradesByAdmins')
const addSalary=require('../api/modules/salary/addSalary')
const addEmployee=require('../api/modules/employees/addEmployee')
const getEmployeeDetails=require('../api/modules/employees/getEmployeeDetails')
const addBonus=require('../api/modules/bonus/addBonus')
const getBonus=require('../api/modules/bonus/getBonus')


// addSalary()
// cron.schedule("0 42 16 15 * *",addSalary)
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, 'uploads/')
   },
   filename: function (req, file, cb) {
     const ext = path.extname(file.originalname);
     cb(null, file.fieldname + '-' + Date.now()+ ext)
   }
 });
 
 const upload = multer({ storage: storage });



router.post("/api/auth/login",async (req,res,next)=>{
   const verifyLogin=require('../api/modules/auth/verifyLogin') 
      
    verifyLogin(req,res,next)
     
})
router.get("/api/getAttendance",
    verifyAuth,getAttendance
      
 )
 router.post("/api/auth/register",
    verifyAuth,register
      
 )
 
router.patch("/api/updateAttendance/:id",
[verifyAuth, upload.single('download')],verifyAuth,updateAttendance
   
)
router.post("/api/addInterview",
[verifyAuth, upload.array('download')],verifyAuth,addInterview
   
)

router.get("/api/getTotalExpenseADay",
 verifyAuth,getTotalExpenseADay
   
)
router.get("/api/getExpenses",
 verifyAuth,getExpenses
   
)
router.get("/api/getLeaves",
 verifyAuth,getLeaves
   
)






router.get("/api/getTotalEmployees",
 verifyAuth,getTotalEmployees
   
)
router.post("/api/addExpenses",
 verifyAuth,addExpenses
   
)
router.post("/api/addExpenseSubCategory",
 verifyAuth,addExpenseSubCategory
   
)

router.patch("/api/updateExpenseStatus/:id",
 verifyAuth,updateExpenseStatus
   
)
router.get("/api/getTimings",
 verifyAuth,getTimings
   
)
router.get("/api/getTotalSessions",
 verifyAuth,getTotalSessions
   
)
router.post("/api/addTiming",
 verifyAuth,addTiming
   
)
router.patch("/api/updateTiming/:id",
 verifyAuth,updateTiming
   
)






router.get("/api/getTotalApprovals",
 verifyAuth,getTotalApprovals
   
)


router.get("/api/getEmployees",
 verifyAuth,getEmployees
   
)

router.get("/api/getLoans",
 verifyAuth,getLoans
   
)


router.get("/api/getTotalLoansGranted",
 verifyAuth,getTotalLoansGranted
   
)
router.get("/api/getTotalEmployeesTakenLoan",
 verifyAuth,getTotalEmployeesTakenLoan
   
)
router.get("/api/getTotalEmployeesOnLeave",
 verifyAuth,getTotalEmployeesOnLeave
   
)
router.get("/api/getTotalPendingEmis",
 verifyAuth,getTotalPendingEmis
   
)
router.get("/api/getAdvance",
 verifyAuth,getAdvance
   
)




router.get("/api/getFines",
 verifyAuth,getFines
   
)
router.patch("/api/updateFineApproval/:id",
 verifyAuth,updateFineApproval
   
)



router.get("/api/getTotalFines",
 verifyAuth,getTotalFines
   
)
router.get("/api/getTotalFinedEmployees",
 verifyAuth,getTotalFinedEmployees
   
)

router.get("/api/getTransfer",
 verifyAuth,getTransfer
   
)


router.patch("/api/updateLeaveStatus",
 verifyAuth,updateLeaveStatus
   
)
router.post("/api/addLoan",
[verifyAuth, upload.single('download')],verifyAuth,addLoan
   
)
router.post("/api/restructureLoans",
verifyAuth,restructureLoans
   
)
router.post("/api/addAdvance",
[verifyAuth, upload.single('download')],verifyAuth,addAdvance
   
)
router.post("/api/addFine",
verifyAuth,addFine
   
)
router.post("/api/addTransfer",
verifyAuth,addTransfer
   
)
router.post("/api/addTransferWithStoreId",
verifyAuth,addTransferWithStoreId
   
)
router.put("/api/updateTimingCorrection/:id",
 [verifyAuth, upload.single('download')],verifyAuth,updateTimingCorrection
   
)
router.post("/api/addLeave",
 [verifyAuth, upload.single('download')],verifyAuth,addLeave
   
)
router.patch("/api/updateAdvanceStatus/:id",
 verifyAuth,updateAdvanceStatus
   
)
router.patch("/api/updateTimingStatus/:id",
 verifyAuth,updateTimingStatus
   
)
router.patch("/api/editFine/:id",
 verifyAuth,editFine
   
)


router.patch("/api/updateLoanStatus/:id",
 verifyAuth,updateLoanStatus
   
)
router.get("/api/getInterview",
 verifyAuth,getInterview
   
)

router.post("/api/addGradesBYFI",
 verifyAuth,addGradesBYFI
   
)
router.post("/api/addGradesByAdmins",
 verifyAuth,addGradesByAdmins
   
)
router.get("/api/getGrades",
 verifyAuth,getGrades
   
)
router.post("/api/makeAttendanceCorrectionRequests",
 verifyAuth,makeAttendanceCorrectionRequests
   
)
router.get("/api/getAttendanceCorrectionRequests",
 verifyAuth,getAttendanceCorrectionRequests
   
)
router.get("/api/getEmployeeDetails",
 verifyAuth,getEmployeeDetails
   
)
router.post("/api/addEmployee",
 [verifyAuth,upload.fields([{name:'photo',maxCount: 1},{name:'document',maxCount: 2}])],verifyAuth,addEmployee
   
)
router.post('/api/addBonus',verifyAuth, addBonus)
router.get('/api/getBonus',verifyAuth, getBonus)
   


app.use(errorHandlerMiddleware)
app.use(notFound)
module.exports = app;