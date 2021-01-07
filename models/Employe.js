const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {isEmail} = require('validator');

const employeeSchema = new mongoose.Schema({
   first_name:{
       type:String,
       required:true
   },
   last_name:{
       type:String,
       required:true
   },
   employe_id:{
       type:String,
       required:[true, 'Employe ID is Required'],
       unique:true
    },
    mobile_no:{
        type:Number,
        required:true

    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique:true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, 'Please enter a password'],
    },
});





employeeSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
});

employeeSchema.statics.login = async function(employe_id, password){
    const employe = await this.findOne({employe_id});
    if (employe){
  const auth = await bcrypt.compare(password, employe.password);
  if(auth){
      return employe;
  }
  throw Error('incorrect password');
    }
    throw Error('incorrect Employe ID');
}


const Employe = mongoose.model('employe', employeeSchema);
module.exports = Employe;