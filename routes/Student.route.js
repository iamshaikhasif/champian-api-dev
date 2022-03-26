var express = require('express')
var router = express.Router();
const Student = require("../controllers/Student.controller");
const Authorize = require("../middlewares/Authorization");
const { check } = require("express-validator");

router.post( "/register",
    [
        check("firstName", "Please Enter a Valid First Name").not().isEmpty(),
        check("lastName", "Please Enter a Valid Last Name").not().isEmpty(),
        check("gender", "Please Enter a Valid Gender").isIn(["male", "female", "other"]),
        check('dob', 'Please Enter a Valid Date of Birth').isDate(),
        check("email", "Please Enter a Valid email").isEmail(),
        check('currentAddress', 'Please Enter a Current Address').not().isEmpty(),
        check('currentState', 'Please Enter a Current State').not().isEmpty(),
        check('currentCity', 'Please Enter a Current City').not().isEmpty(),
        check('permanentAddress', 'Please Enter a Permanent Address').not().isEmpty(),
        check('permanentState', 'Please Enter a Permanent State').not().isEmpty(),
        check('permanentCity', 'Please Enter a Permanent City').not().isEmpty(),
        check('phone', 'Phone number should contains 10 digits only').isLength({ min: 10, max: 10 }),
        check('phone2', 'Phone number 2 should contains 10 digits only').isLength({ min: 10, max: 10 }),
        check("category", "Please Enter a Valid Gender").isIn([ "School", "Jr.college", "Sr.college"]),
        check('nameOfSchool', 'Please Enter a Permanent Address').not().isEmpty(),
        check('currentClass', 'Please Enter a Permanent Address').not().isEmpty(),
        check('department', 'Please Enter a Permanent Address').optional().not().isEmpty(),
        check('language', 'Please Enter Other Depart Name').optional().not().isEmpty(),
        check('nameOfProfessor', 'Please Enter Name of Professor').optional().not().isEmpty(),
        check('nameOfInstitution', 'Please Enter Name of Institution').optional().not().isEmpty(),
        check('professorDesignation', 'Please Enter Professor Designation').optional().not().isEmpty(),
        check('professorMobileNumber', 'Please Enter Professor Mobile Number').optional().not().isEmpty(),
    ],
    Authorize,
    Student.register
);

router.get('/list',
    Authorize,
    Student.getList
);

router.get('/mock-test',
    Authorize,
    Student.getMockTests
);

//router.get("/l2-data", Student.getStudentData)

module.exports = router;