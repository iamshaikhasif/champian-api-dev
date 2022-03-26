const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const Student = require("../models/Student.model");
const { response, removeEmptyKeyFromObject } = require("../helper")
const ObjectId = require('mongoose').Types.ObjectId;
const { category } = require("../enums/Student.enum")
const { examLink, mockTestLinks } = require("../const")
const Excel = require('exceljs');
const moment = require("moment");


const mapReqToModel = (req) => {
    return {
        firstName : req.firstName,
        lastName : req.lastName,
        gender : req.gender,
        dob : req.dob,
        email : req.email,
        pincode : req.pincode,
        currentAddress : req.currentAddress,
        currentState : req.currentState,
        currentCity : req.currentCity,
        currentPincode : req.currentPincode,
        permanentAddress : req.permanentAddress,
        permanentState : req.permanentState,
        permanentCity : req.permanentCity,
        permanentPincode : req.permanentPincode,
        phone : req.phone,
        phone2 : req.phone2,
        category : req.category,
        nameOfSchool : req.nameOfSchool,
        currentClass : req.currentClass,
        department : req.department,
        language : req.language,
        nameOfProfessor : req.nameOfProfessor,
        nameOfInstitution : req.nameOfInstitution,
        professorDesignation : req.professorDesignation,
        professorMobileNumber : req.professorMobileNumber,
        professorEmail : req.professorEmail,
    }
}

const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const studentData = mapReqToModel(req.body)
    studentData.category = category[studentData.category]

    try{
        student = await  new Student({...studentData, userID : ObjectId(req.user.id)}).save();
        response(res, 200, 1, "Student Successfully Registered", {student})
    }catch(e){
        response(res, 500, 0, "Student Not Registered")
    }

    // getEnrollmentNo();

}

const getList = async (req, res) => {
    const userID = req.user.id
    const listOfRegisteredStudent = await Student.find({userID: ObjectId(userID)}, ["firstName","lastName","enrollmentNumber","examLink", "category", "phone", "dob", "password", "sequentialId", "currentClass", "language"])
    let studentsList = []
    if (listOfRegisteredStudent) {
        let index = 0;
        for await (const student of listOfRegisteredStudent) {
            try {
                const standard = parseInt(student.currentClass)
                let assignedExamLink = ""
                let activeLink = 0;
                const startTime = moment("2021-12-12 10:50", 'YYYY-MM-DD HH:mm');
                const endTime = moment("2021-12-12 12:40", 'YYYY-MM-DD HH:mm');
    
                switch(true){
                    case standard >= 8 && standard <= 10: 
                        assignedExamLink = examLink[student.currentClass][student.language]
                        break;
                    case standard >10 && standard <= 12:
                        assignedExamLink = examLink["jr"][student.sequentialId%10]
                        break;
                    case standard >12 && standard <= 16 || (student.currentClass == "1s" || student.currentClass == "2n" || student.currentClass == "3r" || student.currentClass == "4t"):
                        assignedExamLink = examLink["sr"][student.sequentialId%2]
                        break;
                    default : assignedExamLink = "TestExamLink"
                }
                student.examLink = assignedExamLink

                const currentTime = moment().add(330, 'm');

                if(student.category == "SR"){
                    activeLink = 1
                    // if(currentTime.diff(startTime) >= 0 && endTime.diff(currentTime) >=0){
                    //     activeLink = 1
                    // }
                }else{
                    activeLink = 1
                }
    
                studentsList.push({...student._doc, enrollmentNumber: student.enrollmentNumber, password: student.password, activeLink})
            } catch (error) {
                console.log(error);
            }
        }
        // console.log(studentsList);
        response(res, 200, 1, "List of Registered Students", {listOfRegisteredStudent:studentsList});
    }else{
        response(res, 500, 0, "List of Registered Students fetch Error", {});
    }

}

const fetchStudentList = () => {
    
}

const getStudentData = async (req, res) => {
    await exTest();
    response(res, 200, 1, "Sheet created", {});
}

const exTest = async () => {

    const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("My Sheet");
await workbook.xlsx.writeFile('export.xlsx');
  
  //load a copy of export.xlsx
  const newWorkbook = new Excel.Workbook();
  await newWorkbook.xlsx.readFile('export.xlsx');
  
  const newworksheet = newWorkbook.getWorksheet('My Sheet');
  newworksheet.columns = [
    { header: "First Name", key: "firstName", width: 32},
    { header: "Last Name", key: "lastName", width: 32},
    { header: "Enrollment Number", key: "enrollmentNumber", width: 32},
    { header: "Exam Link", key: "examLink", width: 32},
    { header: "Password", key: "password", width: 15},
    { header: "Category", key: "category", width: 15},
    { header: "Phone", key: "phone", width: 20},
    { header: "Date of Birth", key: "dob", width: 15},
    { header: "Current Class", key: "currentClass", width: 10},
    { header: "Language", key: "language", width: 32},
    { header: "Current Address", key: "currentAddress", width: 32},
    { header: "Current City", key: "currentCity", width: 32},
    { header: "Current Pincode", key: "currentPincode", width: 15},
    { header: "Current State", key: "currentState", width: 32},
    { header: "Department", key: "department", width: 10},
    { header: "Email", key: "email", width: 32},
    { header: "Gender", key: "gender", width: 15},
    { header: "Mobile", key: "mobile", width: 32},
    { header: "Name Of Institution", key: "nameOfInstitution", width: 32},
    { header: "Name Of Professor", key: "nameOfProfessor", width: 32},
    { header: "Name Of School", key: "nameOfSchool", width: 32},
    { header: "Other", key: "other", width: 32},
    { header: "Permanent Address", key: "permanentAddress", width: 32},
    { header: "Permanent City", key: "permanentCity", width: 32},
    { header: "permanent Pincode", key: "permanentPincode", width: 32},
    { header: "Permanent State", key: "permanentState", width: 32},
    { header: "Phone 2", key: "phone2", width: 15},
    { header: "Professor Designation", key: "professorDesignation", width: 32},
    { header: "Professor Email", key: "professorEmail", width: 32},
    { header: "Professor Mobile Number", key: "professorMobileNumber", width: 32},
  ];
  
  const listOfRegisteredStudent = await Student.find({})
    let index = 0;
    for await (const student of listOfRegisteredStudent) {
        try {
            index ++;
            const standard = parseInt(student.currentClass)
            let assignedExamLink = "";

            switch(true){
                case standard >= 8 && standard <= 10: 
                    assignedExamLink = examLink[student.currentClass][student.language]
                    break;
                case standard >10 && standard <= 12:
                    assignedExamLink = examLink["jr"][student.sequentialId%10]
                    break;
                case standard >12 && standard <= 16 || (student.currentClass == "1s" || student.currentClass == "2n" || student.currentClass == "3r" || student.currentClass == "4t"):
                    assignedExamLink = examLink["sr"][student.sequentialId%2]
                    break;
                default : assignedExamLink = "TestExamLink"
            }
            student.examLink = assignedExamLink
            await newworksheet.addRow({
                firstName: student.firstName, 
                lastName: student.lastName, 
                enrollmentNumber: student.enrollmentNumber, 
                examLink: assignedExamLink, 
                password: student.password, 
                category: student.category, 
                phone: student.phone, 
                dob: student.dob, 
                currentClass: student.currentClass, 
                language: student.language, 
                currentAddress: student.currentAddress, 
                currentCity: student.currentCity, 
                currentPincode:	student.currentPincode,
                currentState: student.currentState,
                department: student.department,
                email: student.email,
                gender:	student.gender,
                mobile: student.mobile,
                nameOfInstitution: student.nameOfInstitution,
                nameOfProfessor: student.nameOfProfessor,
                nameOfSchool: student.nameOfSchool,
                other: student.other,
                permanentAddress: student.permanentAddress,
                permanentCity: student.permanentCity,
                permanentPincode: student.permanentPincode,
                permanentState: student.permanentState,
                phone2: student.phone2,
                professorDesignation: student.professorDesignation,
                professorEmail: student.professorEmail,
                professorMobileNumber: student.professorMobileNumber
            });
        } catch (error) {

            console.log(index, error);
        }
    }

  await newWorkbook.xlsx.writeFile('export.xlsx');

  
  console.log("File is written");
  
  }
const getMockTests = (req, res) => {
    response(res, 200, 1, "List of Mock Tests", mockTestLinks);
}
   

module.exports = {
    register,
    getList,
    getStudentData,
    getMockTests
  };  