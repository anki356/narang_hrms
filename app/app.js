const express = require("express");
const app = express();
const database = require("../config/database"); 
var cors = require("cors");
const path = require("path")
const router=express.Router()
 require('express-async-errors');
 const cron = require("node-cron");
const markAbsent=require("../api/modules/attendance/markAbsent")
const getSalary=require("../api/modules/salary/getSalary")

const addGrades=require('../api/modules/grades/addGrades')
const moment=require('moment')
cron.schedule("0 10 * * *",markAbsent,{
  scheduled: true,
  timezone: "Asia/Calcutta"
})
const insertAttendanceData=require("../api/newFile")

// cron.schedule("1 0 1 * *",addGrades,{
//   scheduled: true,
//   timezone: "Asia/Calcutta"
// })
// // markAbsent()
//  cron.schedule("1 0 1 * *",getSalary,{
//   scheduled: true,
//   timezone: "Asia/Calcutta"
// })   
// Salary()


 app.use(
   express.json({ extended: true, parameterLimit: 100000, limit: "500mb" })
 );

app.use(cors());

app.use("/",router)
app.use(express.static('uploads'));
 const multer = require("multer")
 const errorHandlerMiddleware=require("../errorHandler/errorHandlerMiddleware")
 const notFound=require("../errorHandler/notFound")
const verifyAuth=require("../api/modules/auth/verifyAuth")
const register=require("../api/modules/auth/register")
const getAttendance=require('../api/modules/attendance/getAttendance')
const getTotalExpenseADay=require('../api/modules/expense/getTotalExpenseADay')
const getExpenses=require('../api/modules/expense/getExpenses')
const getTotalEmployeesExpending=require('../api/modules/expense/getTotalEmployeesExpending')
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
const getAdvances=require('../api/modules/advance/getAdvances')
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
const addTransferWithlocationId=require('../api/modules/transfer/addTransferWithlocationId')
const updateAttendance=require('../api/modules/attendance/updateAttendance')
const addInterview=require('../api/modules/interview/addInterview')
const getInterview=require('../api/modules/interview/getInterview')
const addGradesBYFI=require('../api/modules/grades/addGradesBYFI')
const getGrades=require('../api/modules/grades/getGrades')
const makeAttendanceCorrectionRequests=require('../api/modules/attendance/makeAttendanceCorrectionRequests')
const getAttendanceCorrectionRequests=require('../api/modules/attendance/getAttendanceCorrectionRequests')
const getTotalEmployeesOnLeave=require('../api/modules/leaves/getTotalEmployeesOnLeave')
const restructureLoans=require('../api/modules/loan/restructureLoans')
const addSalary=require('../api/modules/salary/getSalaryDetails')
const addEmployee=require('../api/modules/employees/addEmployee')
const getEmployeeDetails=require('../api/modules/employees/getEmployeeDetails')
const addBonus=require('../api/modules/bonus/addBonus')
const getBonus=require('../api/modules/bonus/getBonus')
const markPresent=require('../api/modules/attendance/markPresent')
const changePassword=require('../api/modules/auth/changePassword')
const addRole=require('../api/modules/roles/addRole')
const getRoles=require('../api/modules/roles/getRoles')
const getGradeByEmployeeID=require('../api/modules/grades/getGradeByEmployeeID')
const getSalaryDetails=require('../api/modules/salary/getSalaryDetails')
const addSalaryDetails=require('../api/modules/salary/addSalaryDetails')
const incrementSalary=require('../api/modules/salary/incrementSalary')
const addTimingyByFI=require('../api/modules/timing/addTimingyByFI')
const updateTimingByFiByGuard=require('../api/modules/timing/updateTimingByFiByGuard')
const updateInterview=require('../api/modules/interview/updateInterview')
const calculateGradesForAll=require('../api/modules/grades/calculateGradesForAll')
const calculateGradesOtherThanSalesman=require('../api/modules/grades/calculateGradesOtherThanSalesman')
const addTimingCorrection=require('../api/modules/timing/addTimingCorrection')
const getTimingCorrectionRequests=require('../api/modules/timing/getTimingCorrectionRequests')
const getFloors=require('../api/modules/Floors/getFloors')
const getlocations=require('../api/modules/locations/getlocations')
const getAllSalary=require('../api/modules/salary/getAllSalary')
const getHierarchy=require('../api/modules/hierarchy/getHierarchy')
const getSalarySlipDetails=require("../api/modules/salary/getSalarySlipDetails")
const getTotal=require('../api/modules/attendance/getTotal')
const getTotalOutSessions=require('../api/modules/timing/getTotalOutSessions')
const uploadFile=require("../upload/uploadFile")
const getStoreIncharge=require("../api/getStoreIncharge")
const getLocationIdOfGuard=require("../api/modules/locations/getStoreIdOfGuard")
const getAllEmployees=require("../api/modules/employees/getAllEmployees")
const getEmployeesWithTotalOutSessions=require("../api/modules/timing/getEmployeesWithTotalOutSessions")
const getStoreIdOfFloorIncharge=require("../api/getStoreIdOfFloorIncharge")
const getSubcategories=require("../api/getSubcategories")
const getTotalEmployeesApproved=require("../api/modules/timing/getTotalEmployeesApproved")
const getTotalApproved=require("../api/modules/attendance/getTotalApproved")
const getPendingExpenses=require("../api/modules/expense/getPendingExpenses")
const getAttendanceCorrectionDatabyAttendanceID=require("../api/modules/attendance/getAttendanceCorrectionDatabyAttendanceID")
const getExpenseDataByExpenseId=require("../api/modules/expense/getExpenseDataByExpenseId")
const getExpenseHistory=require("../api/modules/expense/getExpenseHistory")
const getCategories=require("../api/getCategories")
const getTotalEmployees=require("../api/modules/employees/getTotalEmployees")
const getSalaryIncrement=require("../api/modules/salary/getSalaryIncrement")
const getSalaryHistory=require("../api/modules/salary/getSalaryHistory")
const getTotalLeaves=require("../api/modules/leaves/getTotalLeaves")
const getTotalAdvanceGranted=require("../api/modules/advance/getTotalAdvanceGranted")
const getTotalEmployeesGranted=require("../api/modules/advance/getTotalEmployeesGranted")
const getTotalUnpaidAdvance=require("../api/modules/advance/getTotalUnpaidAdvance")
const getTotalInterviews=require("../api/modules/interview/getTotalInterviews")
const getLeave=require("../api/modules/leaves/getLeave")
const getLoan=require("../api/modules/loan/getLoan")
const getAdvance=require("../api/modules/advance/getAdvance")
const getFine=require("../api/modules/fines/getFine")
const getEmployeesBasedOnRole=require("../api/modules/employees/getEmployeesBasedOnRole")
const getRoleData=require("../api/modules/roles/getRoleData")
const editRole=require("../api/modules/roles/editRole")
const totalEmployeesGivenBonus=require("../api/modules/bonus/totalEmployeesGivenBonus")
const totalAmountOfBonusGiven=require("../api/modules/bonus/totalAmountOfBonusGiven")
const getStoreDep=require("../api/getStoreDep")
const calculateAverageGrade=require("../api/modules/grades/calculateAverageGrade")
const isGraded=require("../api/modules/grades/isGraded")
const getTransferDetails=require("../api/modules/transfer/getTransferDetails")
const updateTransfer=require("../api/modules/transfer/updateTransfer")
const getDepartments=require("../api/getDepartments")
const getGrade=require("../api/modules/grades/getGrade")

const addGradesForFI=require("../api/modules/grades/addGradesForFI")
const getCountSalary=require("../api/modules/salary/getCountSalary")
const getLoansHistory=require("../api/modules/loan/getLoansHistory")
const getAdvanceHistory=require("../api/modules/advance/getAdvanceHistory")
const getFineHistory=require("../api/modules/fines/getFineHistory")
const getSalarySummary=require("../api/modules/salary/getSalarySummary")
const paySalary=require("../api/modules/salary/paySalary")
const editEmployee=require("../api/modules/employees/editEmployee")
const getPermissions=require("../api/getPermissions")
const postNotifications=require("../api/modules/notifications/postNotifications")
const getNotifications=require("../api/modules/Notifications/getNotifications")
const getParentRole=require("../api/modules/hierarchy/getParentRole");
const deleteNotification = require("../api/modules/Notifications/deleteNotification");
const editNotification = require("../api/modules/Notifications/editNotification");
// addSalary()
// cron.schedule("0 47 10 15 * *",addSalary)

cron.schedule("00 00 00 1 * *",()=>{
  let from_date=moment().subtract(1,'month').startOf('month').format("YYYY-MM-DD")
  let to_date=moment().subtract(1,'month').endOf('month').format("YYYY-MM-DD")
  addGrades(from_date,to_date,12000)},{
    scheduled: true,
    timezone: "Asia/Calcutta"
  }) 
  cron.schedule("00 00 00 1 * *",()=>{
    let from_date=moment().subtract(1,'month').startOf('month').format("YYYY-MM-DD")
    let to_date=moment().subtract(1,'month').endOf('month').format("YYYY-MM-DD")
    getSalaryDetails(from_date,to_date,12000)},{
      scheduled: true,
      timezone: "Asia/Calcutta"
    })  
    let from_date=moment().subtract(3,'month').startOf('month').format("YYYY-MM-DD")
    let to_date=moment().subtract(3,'month').endOf('month').format("YYYY-MM-DD")
    // getSalaryDetails(from_date,to_date,12000)
  // let from_date=moment().subtract(3,'month').startOf('month').format("YYYY-MM-DD")
  // let to_date=moment().subtract(3,'month').endOf('month').format("YYYY-MM-DD")
  // 
// addGrades(from_date,to_date,12000)
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, 'uploads/')
   },
   filename: function (req, file, cb) {
     const ext = path.extname(file.originalname);
     cb(null, file.fieldname.replace("[]",'') + '-' + Date.now()+ ext)
   }
 });
 
 const upload = multer({ storage: storage });



router.post("/api/auth/login",async (req,res,next)=>{
   const verifyLogin=require('../api/modules/auth/verifyLogin') 
      
    verifyLogin(req,res,next)
     
})
router.get("/api/getAttendance",
    verifyAuth,
    getAttendance
      
 )
router.get("/api/getAllSalary",
    verifyAuth,
    getAllSalary
      
 )
 router.post("/api/auth/register",
    verifyAuth,register
      
 )
router.get("/api/getNotifications",
    verifyAuth,
    getNotifications
      
 )
 router.post("/api/postNotifications",
    verifyAuth,postNotifications
      
 )
 
router.patch("/api/updateAttendance/:id",
verifyAuth,uploadFile,updateAttendance
   
)
router.patch("/api/rejectAttendance/:id",
verifyAuth,updateAttendance
   
)
router.post("/api/addInterview",
  [verifyAuth, upload.any('download')],verifyAuth,addInterview


   
)

router.get("/api/getTotalExpenseADay",
 verifyAuth,getTotalExpenseADay
   
)
router.get("/api/getSalarySlipDetails",
 verifyAuth,getSalarySlipDetails
   
)
router.get("/api/getGrade",
 verifyAuth,getGrade
   
)
router.get("/api/getExpenses",
 verifyAuth,getExpenses
   
)
router.get("/api/getLeaves",
 verifyAuth,getLeaves
   
)
router.get("/api/getFloors",
 verifyAuth,getFloors
   
)
router.get("/api/getlocations",
 verifyAuth,getlocations
   
)
router.get("/api/getSalarySummary",
 verifyAuth,getSalarySummary
   
)






router.get("/api/getTotalEmployeesExpending",
 verifyAuth,getTotalEmployeesExpending
   
)
router.get("/api/getHierarchy",
 verifyAuth,getHierarchy
   
)
router.get("/api/getFineHistory",
 verifyAuth,getFineHistory
   
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
router.patch("/api/editEmployee/:id",
 [verifyAuth, upload.any('download')],verifyAuth,editEmployee
   
)
router.patch("/api/paySalary/:id",
 verifyAuth,paySalary
   
)
router.get("/api/getTimings",
 verifyAuth,getTimings
   
)
router.get("/api/getTotalSessions",
 verifyAuth,getTotalSessions
   
)
router.get("/api/getLocationIdOfGuard",
 verifyAuth,getLocationIdOfGuard
   
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
router.get("/api/getAdvances",
 verifyAuth,getAdvances
   
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
router.post("/api/addGradesForFI",
 verifyAuth,addGradesForFI
   
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
router.patch("/api/editNotification/:id",verifyAuth,editNotification)
router.delete("/api/deleteNotification/:id",verifyAuth,deleteNotification)
router.post("/api/addTransfer",
verifyAuth,addTransfer
   
)
router.get("/api/getSalary",
verifyAuth,getSalary
   
)
router.post("/api/addTransferWithlocationId",
verifyAuth,addTransferWithlocationId
   
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
router.get("/api/totalAmountOfBonusGiven",
 verifyAuth,totalAmountOfBonusGiven
   
)

router.post("/api/addGradesBYFI",
 verifyAuth,addGradesBYFI
   
)
router.get("/api/getGrades",
 verifyAuth,getGrades
   
)
router.get("/api/totalEmployeesGivenBonus",
 verifyAuth,totalEmployeesGivenBonus
   
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
router.get("/api/getRoles",
 verifyAuth,getRoles
   
)
router.post("/api/addEmployee",
 [verifyAuth,upload.any()],verifyAuth,addEmployee
   
)
router.post('/api/addBonus',verifyAuth, upload.single('download'),verifyAuth, addBonus)
router.patch('/api/markPresent',verifyAuth, markPresent)
router.get('/api/getBonus',verifyAuth, getBonus)
router.patch('/api/auth/changePassword',verifyAuth, changePassword)
router.post('/api/addRole',verifyAuth, addRole)
router.get("/api/getGradeByEmployeeID",verifyAuth,getGradeByEmployeeID)
router.get("/api/getSalaryDetails",verifyAuth,getSalaryDetails)
router.post("/api/addGrades",verifyAuth,addGrades)
router.post("/api/addSalaryDetails",verifyAuth,addSalaryDetails)
router.post("/api/addTimingyByFI",verifyAuth,addTimingyByFI)
router.post("/api/incrementSalary",verifyAuth,incrementSalary)
router.patch("/api/updateTimingByFiByGuard/:id",verifyAuth,updateTimingByFiByGuard)
router.patch("/api/updateInterview/:id",verifyAuth,updateInterview)
router.get("/api/calculateGradesForAll",verifyAuth,calculateGradesForAll)
router.get("/api/calculateGradesOtherThanSalesman",verifyAuth,calculateGradesOtherThanSalesman)
router.post("/api/addTimingCorrection",verifyAuth,addTimingCorrection)
router.get("/api/getTimingCorrectionRequests",verifyAuth,getTimingCorrectionRequests)
router.get("/api/getTotal",verifyAuth,getTotal)
router.get("/api/getTotalOutSessions",verifyAuth,getTotalOutSessions)
router.get("/api/getlocationIncharge",verifyAuth,getStoreIncharge)
router.get("/api/getAllEmployees",verifyAuth,getAllEmployees)
router.get("/api/getEmployeesWithTotalOutSessions",verifyAuth,getEmployeesWithTotalOutSessions)
router.get("/api/getlocationIdOfFloorIncharge",verifyAuth,getStoreIdOfFloorIncharge)
router.get("/api/getSubcategories",verifyAuth,getSubcategories)
router.get("/api/getTotalEmployeesApproved",verifyAuth,getTotalEmployeesApproved)
router.get("/api/getTotalApproved",verifyAuth,getTotalApproved)
router.get("/api/getPendingExpenses",verifyAuth,getPendingExpenses)
router.get("/api/getAttendanceCorrectionDatabyAttendanceID",verifyAuth,getAttendanceCorrectionDatabyAttendanceID)
router.get("/api/getExpenseDataByExpenseId",verifyAuth,getExpenseDataByExpenseId)
router.get("/api/getExpenseHistory",verifyAuth,getExpenseHistory)
router.get("/api/getCategories",verifyAuth,getCategories)
router.get("/api/getTotalEmployees",verifyAuth,getTotalEmployees)
router.get("/api/getSalaryIncrement",verifyAuth,getSalaryIncrement)
router.get("/api/getSalaryHistory",verifyAuth,getSalaryHistory)
router.get("/api/getTotalLeaves",verifyAuth,getTotalLeaves)
router.get("/api/getTotalAdvanceGranted",verifyAuth,getTotalAdvanceGranted)
router.get("/api/getTotalEmployeesGranted",verifyAuth,getTotalEmployeesGranted)
router.get("/api/getTotalUnpaidAdvance",verifyAuth,getTotalUnpaidAdvance)
router.get("/api/getTotalInterviews",verifyAuth,getTotalInterviews)
router.get("/api/getLeave",verifyAuth,getLeave)
router.get("/api/getLoan",verifyAuth,getLoan)
router.get("/api/getFine",verifyAuth,getFine)
router.get("/api/getEmployeesBasedOnRole",verifyAuth,getEmployeesBasedOnRole)
router.get("/api/getRoleData",verifyAuth,getRoleData)
router.patch("/api/editRole/:id",verifyAuth,editRole)
router.get("/api/getStoreDep",verifyAuth,getStoreDep)
router.get("/api/calculateAverageGrade",verifyAuth,calculateAverageGrade)
router.get("/api/isGraded",verifyAuth,isGraded)
router.get("/api/getTransferDetails",verifyAuth,getTransferDetails)
router.patch("/api/updateTransfer/:id",verifyAuth,updateTransfer)
router.get("/api/getDepartments",verifyAuth,getDepartments)
router.get("/api/getCountSalary",verifyAuth,getCountSalary)
router.get("/api/getLoansHistory",verifyAuth,getLoansHistory)
router.get("/api/getAdvanceHistory",verifyAuth,getAdvanceHistory)
router.get("/api/getPermissions",verifyAuth,getPermissions)
router.get("/api/getParentRole",verifyAuth,getParentRole)
router.post("/api/insertAttendance",insertAttendanceData)
// markAbsent()
app.use(errorHandlerMiddleware)
app.use(notFound)
module.exports = app;