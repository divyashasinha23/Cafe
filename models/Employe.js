const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    password:{
        type: String,
        required: true
    }
});



employeeSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
});

employeeSchema.statics.login=async function(email,password){
    const employe=await this.findOne({email});
    if(employe){
    const auth=await bcrypt.compare(password,employe.password);
    if(auth)
    {
        return employe;
    }
    throw('incorrect password');
}
throw Error('incorrect email');
}






const Employe = mongoose.model('employe', employeeSchema);
module.exports = Employe;