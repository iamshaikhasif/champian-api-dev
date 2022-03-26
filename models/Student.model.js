const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const StudentSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true, enum: ["male", "female", "other"] },
    dob: { type: String, required: true },
    email: { type: String, required: true },
    currentAddress: { type: String, required: true },
    currentState: { type: String, required: true },
    currentCity: { type: String, required: true },
    currentPincode: { type: String },
    permanentAddress: { type: String, required: true },
    permanentState: { type: String, required: true },
    permanentCity: { type: String, required: true },
    permanentPincode: { type: String },
    phone: { type: String, required: true },
    phone2: { type: String, required: true },
    category: { type: String, required: true, enum: ["SC", "JR", "SR"] },
    nameOfSchool: { type: String, required: true },
    currentClass: { type: String, required: true },
    department: { type: String },
    language: { type: String },
    nameOfProfessor: { type: String },
    nameOfInstitution: { type: String },
    professorDesignation: { type: String },
    professorMobileNumber: { type: String },
    professorEmail: { type: String},
    sequentialId:{ type:Number},
    userID:{ type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    examLink: { type: String, required: true, default: "TestExamLink" }

}, {timestamps: true});

StudentSchema.plugin(AutoIncrement, {inc_field: 'sequentialId'});

StudentSchema.virtual('enrollmentNumber').get( function() { 

    let formattedName = this.firstName.replace(/[^a-zA-Z]/g, "");

    switch(formattedName.length) {
        case 2:
            formattedName = formattedName + "00"
          break;
        case 3:
            formattedName = formattedName + "0"
          break;
        default:
            formattedName = formattedName.substring(0,4)
          // code block
      }

    const dateOfBirth = this.dob.split("/")
    let count = this.sequentialId + "";
    for (let index = 5 - count.length ; index <= 5; index++) {
        count = "0" + count
    }
    return "AMP" + this.category + this.currentClass + formattedName + dateOfBirth[2] + dateOfBirth[1] + count + "@ampindia.org";
});
  
StudentSchema.virtual('password').get( function(v) {
    let name = this.firstName
    name = name.replace(/[^a-zA-Z]/g, "");

    if (name.length == 2) {
        name = name + "0"
    }else{
        name = name.substring(0,3)
    }
    let phone = this.phone.substring(6);
    
    return "A$fkwrm" + name + phone;
});

// export model user with StudentSchema
module.exports = mongoose.model("student", StudentSchema);