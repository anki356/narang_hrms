const express = require("express");
const app = express();
const database = require("../config/database");
var cors = require("cors");
const path = require("path");
const router = express.Router();
require("express-async-errors");
const cron = require("node-cron");
const markAbsent = require("../api/modules/attendance/markAbsent");
const getSalary = require("../api/modules/salary/getSalary");

const addGrades = require("../api/modules/grades/addGrades");
const moment = require("moment");
cron.schedule("0 10 * * *", markAbsent, {
  scheduled: true,
  timezone: "Asia/Calcutta",
});
const insertAttendanceData = require("../api/newFile");

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
const errorHandlerMiddleware = require("../errorHandler/errorHandlerMiddleware");
app.use(express.static("uploads"));
const multer = require("multer");

const notFound = require("../errorHandler/notFound");
const verifyAuth = require("../api/modules/auth/verifyAuth");
const register = require("../api/modules/auth/register");
const getAttendance = require("../api/modules/attendance/getAttendance");
const getTotalExpenseADay = require("../api/modules/expense/getTotalExpenseADay");
const getExpenses = require("../api/modules/expense/getExpenses");
const getTotalEmployeesExpending = require("../api/modules/expense/getTotalEmployeesExpending");
const addExpenses = require("../api/modules/expense/addExpenses");
const addExpenseSubCategory = require("../api/modules/expense/addExpenseSubCategory");
const getTimings = require("../api/modules/timing/getTimings");
const getTotalSessions = require("../api/modules/timing/getTotalSessions");
const addTiming = require("../api/modules/timing/addTiming");
const updateTiming = require("../api/modules/timing/updateTiming");
const updateTimingCorrection = require("../api/modules/timing/updateTimingCorrection");
const getTotalApprovals = require("../api/modules/timing/getTotalApprovals");
const getEmployees = require("../api/modules/employees/getEmployees");
const addLoan = require("../api/modules/loan/addLoan");
const getLoans = require("../api/modules/loan/getLoans");
const getTotalLoansGranted = require("../api/modules/loan/getTotalLoansGranted");
const getTotalEmployeesTakenLoan = require("../api/modules/loan/getTotalEmployeesTakenLoan");
const getTotalPendingEmis = require("../api/modules/loan/getTotalPendingEmis");
const getAdvances = require("../api/modules/advance/getAdvances");
const addAdvance = require("../api/modules/advance/addAdvance");
const updateAdvanceStatus = require("../api/modules/advance/updateAdvanceStatus");
const updateLoanStatus = require("../api/modules/loan/updateLoanStatus");
const getFines = require("../api/modules/fines/getFines");
const addFine = require("../api/modules/fines/addFine");
const editFine = require("../api/modules/fines/editFine");
const getTotalFines = require("../api/modules/fines/getTotalFines");
const getTotalFinedEmployees = require("../api/modules/fines/getTotalFinedEmployees");
const addLeave = require("../api/modules/leaves/addLeave");
const getLeaves = require("../api/modules/leaves/getLeaves");
const updateExpenseStatus = require("../api/modules/expense/updateExpenseStatus");
const updateFineApproval = require("../api/modules/fines/updateFineApproval");
const updateLeaveStatus = require("../api/modules/leaves/updateLeaveStatus");
const updateTimingStatus = require("../api/modules/timing/updateTimingStatus");
const addTransfer = require("../api/modules/transfer/addTransfer");
const getTransfer = require("../api/modules/transfer/getTransfer");
const addTransferWithlocationId = require("../api/modules/transfer/addTransferWithLocationId");
const updateAttendance = require("../api/modules/attendance/updateAttendance");
const addInterview = require("../api/modules/interview/addInterview");
const getInterview = require("../api/modules/interview/getInterview");
const addGradesBYFI = require("../api/modules/grades/addGradesBYFI");
const getGrades = require("../api/modules/grades/getGrades");
const makeAttendanceCorrectionRequests = require("../api/modules/attendance/makeAttendanceCorrectionRequests");
const getAttendanceCorrectionRequests = require("../api/modules/attendance/getAttendanceCorrectionRequests");
const getTotalEmployeesOnLeave = require("../api/modules/leaves/getTotalEmployeesOnLeave");
const restructureLoans = require("../api/modules/loan/restructureLoans");
const addSalary = require("../api/modules/salary/getSalaryDetails");
const addEmployee = require("../api/modules/employees/addEmployee");
const getEmployeeDetails = require("../api/modules/employees/getEmployeeDetails");
const addBonus = require("../api/modules/bonus/addBonus");
const getBonus = require("../api/modules/bonus/getBonus");
const markPresent = require("../api/modules/attendance/markPresent");
const changePassword = require("../api/modules/auth/changePassword");
const addRole = require("../api/modules/roles/addRole");
const getRoles = require("../api/modules/roles/getRoles");
const getGradeByEmployeeID = require("../api/modules/grades/getGradeByEmployeeID");
const getSalaryDetails = require("../api/modules/salary/getSalaryDetails");
const addSalaryDetails = require("../api/modules/salary/addSalaryDetails");
const incrementSalary = require('../api/modules/salary/incrementSalary')
const addTimingyByFI = require("../api/modules/timing/addTimingyByFI");
const updateTimingByFiByGuard = require("../api/modules/timing/updateTimingByFiByGuard");
const updateInterview = require("../api/modules/interview/updateInterview");
const calculateGradesForAll = require("../api/modules/grades/calculateGradesForAll");
const calculateGradesOtherThanSalesman = require("../api/modules/grades/calculateGradesOtherThanSalesman");
const addTimingCorrection = require("../api/modules/timing/addTimingCorrection");
const getTimingCorrectionRequests = require("../api/modules/timing/getTimingCorrectionRequests");
const getFloors = require("../api/modules/Floors/getFloors");
const getlocations = require("../api/modules/locations/getLocations");
const getAllSalary = require("../api/modules/salary/getAllSalary");
const getHierarchy = require("../api/modules/hierarchy/getHierarchy");
const getSalarySlipDetails = require("../api/modules/salary/getSalarySlipDetails");
const getTotal = require("../api/modules/attendance/getTotal");
const getTotalOutSessions = require("../api/modules/timing/getTotalOutSessions");
const uploadFile = require("../upload/uploadFile");
const getStoreIncharge = require("../api/getStoreIncharge");
const getLocationIdOfGuard = require("../api/modules/locations/getStoreIdOfGuard");
const getAllEmployees = require("../api/modules/employees/getAllEmployees");
const getEmployeesWithTotalOutSessions = require("../api/modules/timing/getEmployeesWithTotalOutSessions");
const getStoreIdOfFloorIncharge = require("../api/getStoreIdOfFloorIncharge");
const getSubcategories = require("../api/getSubcategories");
const getTotalEmployeesApproved = require("../api/modules/timing/getTotalEmployeesApproved");
const getTotalApproved = require("../api/modules/attendance/getTotalApproved");
const getPendingExpenses = require("../api/modules/expense/getPendingExpenses");
const getAttendanceCorrectionDatabyAttendanceID = require("../api/modules/attendance/getAttendanceCorrectionDatabyAttendanceID");
const getExpenseDataByExpenseId = require("../api/modules/expense/getExpenseDataByExpenseId");
const getExpenseHistory = require("../api/modules/expense/getExpenseHistory");
const getCategories = require("../api/getCategories");
const getTotalEmployees = require("../api/modules/employees/getTotalEmployees");
const getSalaryIncrement = require("../api/modules/salary/getSalaryIncrement");
const getSalaryHistory = require("../api/modules/salary/getSalaryHistory");
const getTotalLeaves = require("../api/modules/leaves/getTotalLeaves");
const getTotalAdvanceGranted = require("../api/modules/advance/getTotalAdvanceGranted");
const getTotalEmployeesGranted = require("../api/modules/advance/getTotalEmployeesGranted");
const getTotalUnpaidAdvance = require("../api/modules/advance/getTotalUnpaidAdvance");
const getTotalInterviews = require("../api/modules/interview/getTotalInterviews");
const getLeave = require("../api/modules/leaves/getLeave");
const getLoan = require("../api/modules/loan/getLoan");
const getAdvance = require("../api/modules/advance/getAdvance");
const getFine = require("../api/modules/fines/getFine");
const getEmployeesBasedOnRole = require("../api/modules/employees/getEmployeesBasedOnRole");
const getRoleData = require("../api/modules/roles/getRoleData");
const editRole = require("../api/modules/roles/editRole");
const totalEmployeesGivenBonus = require("../api/modules/bonus/totalEmployeesGivenBonus");
const totalAmountOfBonusGiven = require("../api/modules/bonus/totalAmountOfBonusGiven");
const getStoreDep = require("../api/getStoreDep");
const calculateAverageGrade = require("../api/modules/grades/calculateAverageGrade");
const isGraded = require("../api/modules/grades/isGraded");
const getTransferDetails = require("../api/modules/transfer/getTransferDetails");
const updateTransfer = require("../api/modules/transfer/updateTransfer");
const getDepartments = require("../api/getDepartments");
const getGrade = require("../api/modules/grades/getGrade");
const getPendingInModules=require("../api/getPendingInModules")
const addGradesForFI = require("../api/modules/grades/addGradesForFI");
const getCountSalary = require("../api/modules/salary/getCountSalary");
const getLoansHistory = require("../api/modules/loan/getLoansHistory");
const getAdvanceHistory = require("../api/modules/advance/getAdvanceHistory");
const getFineHistory = require("../api/modules/fines/getFineHistory");
const getSalarySummary = require("../api/modules/salary/getSalarySummary");
const paySalary = require("../api/modules/salary/paySalary");
const editEmployee = require("../api/modules/employees/editEmployee");
const getPermissions = require("../api/getPermissions");
const postNotifications = require("../api/modules/notifications/postNotifications")
const getNotifications = require("../api/modules/Notifications/getNotifications");
const getParentRole = require("../api/modules/hierarchy/getParentRole");
const deleteNotification = require("../api/modules/Notifications/deleteNotification");
const editNotification = require("../api/modules/Notifications/editNotification");
const deleteEmployee = require("../api/modules/employees/deleteEmployee");
const getLastGrade = require("../api/modules/grades/getLastGrade");
const editGrade  = require("../api/modules/grades/editGrades");
const markPresentManually = require("../api/modules/attendance/markPresentManually");

// addSalary()
// cron.schedule("0 47 10 15 * *",addSalary)

cron.schedule(
  "00 00 00 1 * *",
  () => {
    let from_date = moment()
      .subtract(1, "month")
      .startOf("month")
      .format("YYYY-MM-DD");
    let to_date = moment()
      .subtract(1, "month")
      .endOf("month").add(1,'d')
      .format("YYYY-MM-DD");
    addGrades(from_date, to_date, 12000);
  },
  {
    scheduled: true,
    timezone: "Asia/Calcutta",
  }
);
cron.schedule(
  "00 00 00 1 * *",
  () => {
    let from_date = moment()
      .subtract(1, "month")
      .startOf("month")
      .format("YYYY-MM-DD");
    let to_date = moment()
      .subtract(1, "month")
      .endOf("month").add(1,'d')
      .format("YYYY-MM-DD");
    getSalaryDetails(from_date, to_date, 12000);
  },
  {
    scheduled: true,
    timezone: "Asia/Calcutta",
  }
);
let from_date = moment()
  .subtract(3, "month")
  .startOf("month")
  .format("YYYY-MM-DD");
let to_date = moment().subtract(3, "month").endOf("month").format("YYYY-MM-DD");
// getSalaryDetails(from_date,to_date,5000)
// let from_date=moment().subtract(3,'month').startOf('month').format("YYYY-MM-DD")
// let to_date=moment().subtract(3,'month').endOf('month').format("YYYY-MM-DD")
//
// addGrades(from_date,to_date,12000)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname.replace("[]", "") + "-" + Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

router.post("/auth/login", async (req, res, next) => {
  const verifyLogin = require("../api/modules/auth/verifyLogin");

  verifyLogin(req, res, next);
});
router.get("/getAttendance", verifyAuth, getAttendance);

router.get("/home", (req, res) => {
  return res.send("hello");
});


router.get("/getAllSalary", verifyAuth, getAllSalary);
router.get("/home", (req, res) => {
  database.query("Select * from roles", (err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(result);
    res.json(result);
  });
});
router.post("/auth/register", verifyAuth, register);
router.get("/getNotifications", verifyAuth, getNotifications);
router.post("/postNotifications",
  verifyAuth, postNotifications

)
router.get("/getPendingInModules",verifyAuth,getPendingInModules)
router.patch("/updateAttendance/:id", verifyAuth, uploadFile, updateAttendance);
router.patch("/rejectAttendance/:id", verifyAuth, updateAttendance);
router.post(
  "/addInterview",
  [verifyAuth, upload.any("download")],
  verifyAuth,
  addInterview
);

router.get("/getTotalExpenseADay", verifyAuth, getTotalExpenseADay);
router.get("/getSalarySlipDetails", verifyAuth, getSalarySlipDetails);
router.get("/getGrade", verifyAuth, getGrade);
router.get("/getExpenses", verifyAuth, getExpenses);
router.get("/getLeaves", verifyAuth, getLeaves);
router.get("/getFloors", verifyAuth, getFloors);
router.get("/getlocations", verifyAuth, getlocations);
router.get("/getSalarySummary", verifyAuth, getSalarySummary);

router.get(
  "/getTotalEmployeesExpending",
  verifyAuth,
  getTotalEmployeesExpending
);
router.get("/getHierarchy", verifyAuth, getHierarchy);
router.get("/getFineHistory", verifyAuth, getFineHistory);

router.post("/addExpenses", verifyAuth, addExpenses);
router.post("/addExpenseSubCategory", verifyAuth, addExpenseSubCategory);

router.patch("/updateExpenseStatus/:id", verifyAuth, updateExpenseStatus);
router.patch(
  "/editEmployee/:id",
  [verifyAuth, upload.any("download")],
  verifyAuth,
  editEmployee
);
router.patch("/paySalary/:id", verifyAuth, paySalary);
router.get("/getTimings", verifyAuth, getTimings);
router.get("/getTotalSessions", verifyAuth, getTotalSessions);
router.get("/getLocationIdOfGuard", verifyAuth, getLocationIdOfGuard);
router.post("/addTiming", verifyAuth, addTiming);
router.patch("/updateTiming/:id", verifyAuth, updateTiming);

router.get("/getTotalApprovals", verifyAuth, getTotalApprovals);

router.get("/getEmployees", verifyAuth, getEmployees);

router.get("/getLoans", verifyAuth, getLoans);

router.get("/getTotalLoansGranted", verifyAuth, getTotalLoansGranted);
router.get(
  "/getTotalEmployeesTakenLoan",
  verifyAuth,
  getTotalEmployeesTakenLoan
);
router.get("/getTotalEmployeesOnLeave", verifyAuth, getTotalEmployeesOnLeave);
router.get("/getTotalPendingEmis", verifyAuth, getTotalPendingEmis);
router.get("/getAdvances", verifyAuth, getAdvances);
router.get("/getAdvance", verifyAuth, getAdvance);

router.get("/getFines", verifyAuth, getFines);
router.patch("/updateFineApproval/:id", verifyAuth, updateFineApproval);

router.get("/getTotalFines", verifyAuth, getTotalFines);
router.post("/addGradesForFI", verifyAuth, addGradesForFI);
router.get("/getTotalFinedEmployees", verifyAuth, getTotalFinedEmployees);

router.get("/getTransfer", verifyAuth, getTransfer);

router.patch("/updateLeaveStatus", verifyAuth, updateLeaveStatus);
router.post(
  "/addLoan",
  [verifyAuth, upload.single("download")],
  verifyAuth,
  addLoan
);
router.post("/restructureLoans", verifyAuth, restructureLoans);
router.post(
  "/addAdvance",
  [verifyAuth, upload.single("download")],
  verifyAuth,
  addAdvance
);
router.post("/addFine", verifyAuth, addFine);
router.patch("/editNotification/:id", verifyAuth, editNotification);
router.delete("/deleteNotification/:id", verifyAuth, deleteNotification);
router.post("/addTransfer", verifyAuth, addTransfer);
router.get("/getSalary", verifyAuth, getSalary);
router.post(
  "/addTransferWithlocationId",
  verifyAuth,
  addTransferWithlocationId
);
router.put(
  "/updateTimingCorrection/:id",
  [verifyAuth, upload.single("download")],
  verifyAuth,
  updateTimingCorrection
);
router.post(
  "/addLeave",
  [verifyAuth, upload.single("download")],
  verifyAuth,
  addLeave
);
router.patch("/updateAdvanceStatus/:id", verifyAuth, updateAdvanceStatus);
router.patch("/updateTimingStatus/:id", verifyAuth, updateTimingStatus);
router.patch("/editFine/:id", verifyAuth, editFine);

router.patch("/updateLoanStatus/:id", verifyAuth, updateLoanStatus);
router.get("/getInterview", verifyAuth, getInterview);
router.get("/totalAmountOfBonusGiven", verifyAuth, totalAmountOfBonusGiven);

router.post("/addGradesBYFI", verifyAuth, addGradesBYFI);
router.get("/getGrades", verifyAuth, getGrades);
router.get("/totalEmployeesGivenBonus", verifyAuth, totalEmployeesGivenBonus);

router.post(
  "/makeAttendanceCorrectionRequests",
  verifyAuth,
  makeAttendanceCorrectionRequests
);
router.get(
  "/getAttendanceCorrectionRequests",
  verifyAuth,
  getAttendanceCorrectionRequests
);
router.get("/getEmployeeDetails", verifyAuth, getEmployeeDetails);
router.get("/getRoles", verifyAuth, getRoles);
router.post(
  "/addEmployee",
  [verifyAuth, upload.any()],
  verifyAuth,
  addEmployee
);
router.post(
  "/addBonus",
  verifyAuth,
  upload.single("download"),
  verifyAuth,
  addBonus
);
router.patch("/markPresent", verifyAuth, markPresent);
router.get("/getBonus", verifyAuth, getBonus);
router.get("/getLastGrade", verifyAuth, getLastGrade);

router.patch("/auth/changePassword", verifyAuth, changePassword);
router.patch("/editGrade/:id",verifyAuth,editGrade);
router.post("/addRole", verifyAuth, addRole);
router.get("/getGradeByEmployeeID", verifyAuth, getGradeByEmployeeID);
router.get("/getSalaryDetails", verifyAuth, getSalaryDetails);
router.post("/addGrades", verifyAuth, addGrades);
router.post("/addSalaryDetails", verifyAuth, addSalaryDetails);
router.post("/addTimingyByFI", verifyAuth, addTimingyByFI);
router.post("/incrementSalary", verifyAuth, incrementSalary)
router.patch(
  "/updateTimingByFiByGuard/:id",
  verifyAuth,
  updateTimingByFiByGuard
);
router.patch("/updateInterview/:id", verifyAuth, updateInterview);
router.get("/calculateGradesForAll", verifyAuth, calculateGradesForAll);
router.get(
  "/calculateGradesOtherThanSalesman",
  verifyAuth,
  calculateGradesOtherThanSalesman
);
router.post("/addTimingCorrection", verifyAuth, addTimingCorrection);
router.get(
  "/getTimingCorrectionRequests",
  verifyAuth,
  getTimingCorrectionRequests
);
router.get("/getTotal", verifyAuth, getTotal);
router.get("/getTotalOutSessions", verifyAuth, getTotalOutSessions);
router.get("/getlocationIncharge", verifyAuth, getStoreIncharge);
router.get("/getAllEmployees", verifyAuth, getAllEmployees);
router.get(
  "/getEmployeesWithTotalOutSessions",
  verifyAuth,
  getEmployeesWithTotalOutSessions
);
router.get(
  "/getlocationIdOfFloorIncharge",
  verifyAuth,
  getStoreIdOfFloorIncharge
);
router.get("/getSubcategories", verifyAuth, getSubcategories);
router.get("/getTotalEmployeesApproved", verifyAuth, getTotalEmployeesApproved);
router.get("/getTotalApproved", verifyAuth, getTotalApproved);
router.get("/getPendingExpenses", verifyAuth, getPendingExpenses);
router.get(
  "/getAttendanceCorrectionDatabyAttendanceID",
  verifyAuth,
  getAttendanceCorrectionDatabyAttendanceID
);
router.get("/getExpenseDataByExpenseId", verifyAuth, getExpenseDataByExpenseId);
router.get("/getExpenseHistory", verifyAuth, getExpenseHistory);
router.get("/getCategories", verifyAuth, getCategories);
router.get("/getTotalEmployees", verifyAuth, getTotalEmployees);
router.get("/getSalaryIncrement", verifyAuth, getSalaryIncrement);
router.get("/getSalaryHistory", verifyAuth, getSalaryHistory);
router.get("/getTotalLeaves", verifyAuth, getTotalLeaves);
router.get("/getTotalAdvanceGranted", verifyAuth, getTotalAdvanceGranted);
router.get("/getTotalEmployeesGranted", verifyAuth, getTotalEmployeesGranted);
router.get("/getTotalUnpaidAdvance", verifyAuth, getTotalUnpaidAdvance);
router.get("/getTotalInterviews", verifyAuth, getTotalInterviews);
router.get("/getLeave", verifyAuth, getLeave);
router.get("/getLoan", verifyAuth, getLoan);
router.get("/getFine", verifyAuth, getFine);
router.get("/getEmployeesBasedOnRole", verifyAuth, getEmployeesBasedOnRole);
router.get("/getRoleData", verifyAuth, getRoleData);
router.patch("/editRole/:id", verifyAuth, editRole);
router.get("/getStoreDep", verifyAuth, getStoreDep);
router.get("/calculateAverageGrade", verifyAuth, calculateAverageGrade);
router.get("/isGraded", verifyAuth, isGraded);
router.get("/getTransferDetails", verifyAuth, getTransferDetails);
router.patch("/updateTransfer/:id", verifyAuth, updateTransfer);
router.get("/getDepartments", verifyAuth, getDepartments);
router.get("/getCountSalary", verifyAuth, getCountSalary);
router.get("/getLoansHistory", verifyAuth, getLoansHistory);
router.get("/getAdvanceHistory", verifyAuth, getAdvanceHistory);
router.get("/getPermissions", verifyAuth, getPermissions);
router.get("/getParentRole", verifyAuth, getParentRole);
router.post("/insertAttendance", insertAttendanceData);
router.patch("/deleteEmployee/:id", verifyAuth, deleteEmployee);
router.post("/markPresentManually", verifyAuth, markPresentManually);

// markAbsent()
app.use("/api", router);

app.use(errorHandlerMiddleware);
app.use(notFound);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
