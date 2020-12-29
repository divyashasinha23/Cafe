const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
   first_name:{
       type:String,
       requied:true
   },
   last_name:{
       type:String,
       required:true
   },
   employe_id:{
       type:String,
       required:true
    },
    mobile_no:{
        type:Number,
        required:true
    },
    email:{
        type: String,
        required: true
    },
});

const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;