var express = require('express')
var router = express.Router();
const User = require("../controllers/User.controller");
const Authorize = require("../middlewares/Authorization");
const { check } = require("express-validator");

router.post("/signup",
    [
        check("firstName", "Please Enter a Valid First Name").not().isEmpty(),
        check("lastName", "Please Enter a Valid Last Name").not().isEmpty(),
        check("email", "Please Enter a Valid email").isEmail(),
        check("gender", "Please Enter a Valid Gender").isIn(["male", "female", "other"]),
        check('mobile', 'Mobile number should contains   digits only').isLength({ min: 10, max: 10 }),
        check('dob', 'Please Enter a Valid Date of Birth').isDate(),
        check('pincode', 'Please Enter a Valid 6 digit Pincode').isLength({ min: 6, max: 6 }),
        check('address', 'Please Enter a Valid Address').not().isEmpty(),
        check('cityOrDistrict', 'Please a Enter Valid City/District').not().isEmpty(),
        // check('userType', 'Please Enter a Valid User Type').isIn(['School Student', 'Jr. College Student', 'Sr. College Student', 'Professional', 'Volunteer', 'Businessman', 'Job Seeker']),
        check('userType', 'Please Enter a Valid User Type').not().isEmpty(),
        check('pin', 'Please Enter a 4 digit PIN').isLength({ min: 4, max: 4 }),
    ],
    User.sighUp
);

router.post("/update",
    [
        check("firstName", "Please Enter a Valid First Name").optional().not().isEmpty(),
        check("lastName", "Please Enter a Valid Last Name").optional().not().isEmpty(),
        check("email", "Please Enter a Valid email").optional().isEmail(),
        check("gender", "Please Enter a Valid Gender").optional().isIn(["male", "female", "other"]),
        check('mobile', 'Mobile number should contains   digits only').optional().isLength({ min: 10, max: 10 }),
        check('dob', 'Please Enter a Valid Date of Birth').optional().isDate(),
        check('pincode', 'Please Enter a Valid 6 digit Pincode').optional().isLength({ min: 6, max: 6 }),
        check('address', 'Please Enter a Valid Address').optional().not().isEmpty(),
        check('cityOrDistrict', 'Please a Enter Valid City/District').optional().not().isEmpty(),
        check('userType', 'Please Enter a Valid User Type').optional().not().isEmpty(),
        // check('userType', 'Please Enter a Valid User Type').optional().isIn(['School Student', 'Jr. College Student', 'Sr. College Student', 'Professional', 'Volunteer', 'Businessman', 'Job Seeker']),
    ],
    Authorize,
    User.update
);

router.post("/send-otp",
    [
        check('mobile', 'Mobile number should contains   digits only').isLength({ min: 10, max: 10 }),
        // check('pin', 'Please Enter a 4 digit PIN').isLength({ min: 4, max: 4 }),
    ],
    User.sendOtp
);

router.post('/verify-otp',
    [
        check('otp', 'Otp is required').not().isEmpty(),
        check('mobile', 'Mobile number should contains   digits only').isLength({ min: 10, max: 10 }),
        // check('pin', 'Please Enter a 4 digit PIN').isLength({ min: 4, max: 4 }),
    ],
    User.verifyOtp
);

module.exports = router;