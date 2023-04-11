
const express = require("express");
const app = express();

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
router.put("/api/updateTimingCorrection/:id",
 [verifyAuth, upload.single('download')],verifyAuth,updateTimingCorrection
   
)


app.use(errorHandlerMiddleware)
app.use(notFound)
module.exports = app;