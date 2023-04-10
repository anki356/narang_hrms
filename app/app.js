
const express = require("express");
const app = express();
const router=express.Router()
app.use(express.json());
app.use("/",router)
app.use(function (err, req, res, next) {
   console.log(err);
   next(err);
 });
 require('express-async-errors');
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
app.use(errorHandlerMiddleware)
app.use(notFound)
module.exports = app;