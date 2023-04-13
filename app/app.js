const express = require("express");
const app = express();
const database = require("../config/database"); 
var cors = require("cors");
const path = require("path")
const router=express.Router()
 require('express-async-errors');


// app.use(function (err, req, res, next) {
//    console.log(err);
//    next(err);
//  });


    



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
const getAttendanceByEmployeeID=require("../api/modules/attendance/getAttendanceByEmployeeID")
const getAttendanceByDesignation=require("../api/modules/attendance/getAttendanceByDesignation")
const getAttendance=require('../api/modules/attendance/getAttendance')
const getAttendanceByFloor=require('../api/modules/attendance/getAttendanceByFloor')
const getTotalExpenseADay=require('../api/modules/expense/getTotalExpenseADay')
const getExpenses=require('../api/modules/expense/getExpenses')
const getExpensesByEmployeeId=require('../api/modules/expense/getExpensesByEmployeeId')
const getExpensesByDesignation=require('../api/modules/expense/getExpensesByDesignation')
const getTotalEmployees=require('../api/modules/expense/getTotalEmployees')
const addExpenses=require('../api/modules/expense/addExpenses')
const addExpenseSubCategory=require('../api/modules/expense/addExpenseSubCategory')
const getExpesesByFloorId=require('../api/modules/expense/getExpesesByFloorId')
const getTimings=require('../api/modules/timing/getTimings')
const getTotalSessions=require('../api/modules/timing/getTotalSessions')
const addTiming=require('../api/modules/timing/addTiming')
const updateTiming=require('../api/modules/timing/updateTiming')
const getTimingsByEmployeeId=require('../api/modules/timing/getTimingsByEmployeeId')
const getAttendanceByEmployeeName=require('../api/modules/attendance/getAttendanceByEmployeeName')
const getExpensesByEmployeeName=require('../api/modules/expense/getExpensesByEmployeeName')
const getTimingsByEmployeeName=require('../api/modules/timing/getTimingsByEmployeeName')
const updateTimingCorrection=require('../api/modules/timing/updateTimingCorrection')
const getTimingByFloor=require('../api/modules/timing/getTimingByFloor')
const getApprovals=require('../api/modules/timing/getApprovals')
const getApprovalsByEmployeeId=require('../api/modules/timing/getApprovalsByEmployeeId')
const getApprovalsByEmployeeName=require('../api/modules/timing/getApprovalsByEmployeeName')
const getApprovalsByDesignation=require('../api/modules/timing/getApprovalsByDesignation')
const getTotalApprovals=require('../api/modules/timing/getTotalApprovals')
const getEmployees=require('../api/modules/employees/getEmployees')
const addLoan=require('../api/modules/loan/addLoan')
const getLoans=require('../api/modules/loan/getLoans')
const getLoansByEmployeeId=require('../api/modules/loan/getLoansByEmployeeId')
const getLoansByEmployeeName=require('../api/modules/loan/getLoansByEmployeeName')
const getLoansByFloorName=require('../api/modules/loan/getLoansByFloorName')
const getTotalLoansGranted=require('../api/modules/loan/getTotalLoansGranted')
const getTotalEmployeesTakenLoan=require('../api/modules/loan/getTotalEmployeesTakenLoan')
const getTotalPendingEmis=require('../api/modules/loan/getTotalPendingEmis')
const getAdvance=require('../api/modules/advance/getAdvance')
const getAdvanceByEmployeeid=require('../api/modules/advance/getAdvanceByEmployeeid')
const getAdvanceByEmployeeName=require('../api/modules/advance/getAdvanceByEmployeeName')
const getAdvanceByFloor=require('../api/modules/advance/getAdvanceByFloor')
const addAdvance=require('../api/modules/advance/addAdvance')
const updateAdvanceStatus=require('../api/modules/advance/updateAdvanceStatus')
const updateLoanStatus=require('../api/modules/loan/updateLoanStatus')
const getFines=require('../api/modules/fines/getFines')
const getFinesByEmployeeId=require('../api/modules/fines/getFinesByEmployeeId')
const getFinesByEmployeeName=require('../api/modules/fines/getFinesByEmployeeName')
const getFinesByDate=require('../api/modules/fines/getFinesByDate')
const getFinesByFloor=require('../api/modules/fines/getFinesByFloor')
const addFine=require('../api/modules/fines/addFine')
const editFine=require('../api/modules/fines/editFine')
const deleteFine=require('../api/modules/fines/deleteFine')
const getTotalFines=require('../api/modules/fines/getTotalFines')
const getTotalFinedEmployees=require('../api/modules/fines/getTotalFinedEmployees')
const addLeave=require('../api/modules/leaves/addLeave')
const getLeaves=require('../api/modules/leaves/getLeaves')
const getLeavesByEmployeeId=require('../api/modules/leaves/getLeavesByEmployeeId')
const getLeavesByDesignation=require('../api/modules/leaves/getLeavesByDesignation')
const getLeavesByEmployeeName=require('../api/modules/leaves/getLeavesByEmployeeName')
const getTotalEmployeesOnLeave=require('../api/modules/leaves/getTotalEmployeesOnLeave')
const getLeavesByStatus=require('../api/modules/leaves/getLeavesByStatus')
const updateExpenseStatus=require('../api/modules/expense/updateExpenseStatus')
const updateFineApproval=require('../api/modules/fines/updateFineApproval')
const updateLeaveStatus=require('../api/modules/leaves/updateLeaveStatus')
const updateTimingStatus=require('../api/modules/timing/updateTimingStatus')
 


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
 router.get("/api/getAttendanceByEmployeeID",
 verifyAuth,getAttendanceByEmployeeID
   
)
router.get("/api/getAttendanceByDesignation",
 verifyAuth,getAttendanceByDesignation
   
)
router.get("/api/getAttendanceByFloor",
 verifyAuth,getAttendanceByFloor
   
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
router.get("/api/getExpensesByEmployeeId",
 verifyAuth,getExpensesByEmployeeId
   
)
router.get("/api/getExpensesByDesignation",
 verifyAuth,getExpensesByDesignation
   
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
router.get("/api/getExpesesByFloorId",
 verifyAuth,getExpesesByFloorId
   
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
router.get("/api/getTimingsByEmployeeId",
 verifyAuth,getTimingsByEmployeeId
   
)
router.get("/api/getAttendanceByEmployeeName",
 verifyAuth,getAttendanceByEmployeeName
   
)
router.get("/api/getExpensesByEmployeeName",
 verifyAuth,getExpensesByEmployeeName
   
)
router.get("/api/getTimingsByEmployeeName",
 verifyAuth,getTimingsByEmployeeName
   
)
router.get("/api/getTimingByFloor",
 verifyAuth,getTimingByFloor
   
)
router.get("/api/getApprovals",
 verifyAuth,getApprovals
   
)
router.get("/api/getApprovalsByEmployeeId",
 verifyAuth,getApprovalsByEmployeeId
   
)
router.get("/api/getApprovalsByEmployeeName",
 verifyAuth,getApprovalsByEmployeeName
   
)
router.get("/api/getApprovalsByDesignation",
 verifyAuth,getApprovalsByDesignation
   
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
router.get("/api/getLeavesByDesignation",
 verifyAuth,getLeavesByDesignation
   
)
router.get("/api/getLoansByEmployeeId",
 verifyAuth,getLoansByEmployeeId
   
)
router.get("/api/getLoansByEmployeeName",
 verifyAuth,getLoansByEmployeeName
   
)
router.get("/api/getLoansByFloorName",
 verifyAuth,getLoansByFloorName
   
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
router.get("/api/getAdvanceByEmployeeid",
 verifyAuth,getAdvanceByEmployeeid
   
)
router.get("/api/getAdvance",
 verifyAuth,getAdvance
   
)
router.get("/api/getLeavesByEmployeeId",
 verifyAuth,getLeavesByEmployeeId
   
)
router.get("/api/getAdvanceByEmployeeName",
 verifyAuth,getAdvanceByEmployeeName
   
)
router.get("/api/getAdvanceByFloor",
 verifyAuth,getAdvanceByFloor
   
)
router.get("/api/getFines",
 verifyAuth,getFines
   
)
router.patch("/api/updateFineApproval/:id",
 verifyAuth,updateFineApproval
   
)
router.get("/api/getFinesByDate",
 verifyAuth,getFinesByDate
   
)
router.get("/api/getFinesByEmployeeId",
 verifyAuth,getFinesByEmployeeId
   
)
router.get("/api/getFinesByEmployeeName",
 verifyAuth,getFinesByEmployeeName
   
)
router.get("/api/getFinesByFloor",
 verifyAuth,getFinesByFloor
   
)
router.get("/api/getTotalFines",
 verifyAuth,getTotalFines
   
)
router.get("/api/getTotalFinedEmployees",
 verifyAuth,getTotalFinedEmployees
   
)
router.get("/api/getLeavesByEmployeeName",
 verifyAuth,getLeavesByEmployeeName
   
)
router.get("/api/getLeavesByStatus",
 verifyAuth,getLeavesByStatus
   
)
router.patch("/api/updateLeaveStatus",
 verifyAuth,updateLeaveStatus
   
)
router.post("/api/addLoan",
[verifyAuth, upload.single('download')],verifyAuth,addLoan
   
)
router.post("/api/addAdvance",
[verifyAuth, upload.single('download')],verifyAuth,addAdvance
   
)
router.post("/api/addFine",
verifyAuth,addFine
   
)
router.delete("/api/deleteFine/:id",
verifyAuth,deleteFine
   
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

app.use(errorHandlerMiddleware)
app.use(notFound)
module.exports = app;