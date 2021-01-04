const mongoose = require('mongoose');
const Employe = require('../models/Employe');
const jwt = require('jsonwebtoken');


//creating json web token
const Token = (id) => {
    return jwt.sign({id}, 'cafeteria', {
    expiresIn: '30d',
    });
};
//error handling
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { employe_id: '', password: '' };
  
    if (err.code === 11000) {
        if(err.message.includes("email_1")){
            errors.email = 'that email is already registered';
        }
        else{
         errors.employe_id = 'employe ID already registered';
    
        }
        return errors;
    }
  
    if(err.message === "incorrect Employe ID"){
      errors.employe_id = "Employe ID not registered";
     
    }
  
    if(err.message === "incorrect password"){
      errors.password = "Password is incorrect";
      
    }
  
  
  if (err.message === 'employe validation failed') {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
      return errors;
    });
  }
  return errors;
  }

module.exports.signup_get = async(req,res) => {
    res.render('signup');
}
module.exports.signup_post = async(req,res) => {
    const {email, password, employe_id,mobile_no,last_name,first_name} = req.body;
    try{
        const employe = await Employe.create({email, password, employe_id,mobile_no,last_name,first_name});
        const  token = Token(employe._id);
        res.cookie('jwt', token, { httpOnly: true });
        if(employe){
            res.status(201);
            res.json({
                _id:employe._id,
                first_name:employe.first_name,
                last_name: employe.last_name,
                mobile_no:employe.mobile_no,
                password:employe,password,
                employe_id: employe.employe_id,
                email:employe.email,
            });  
        }
        else{
            res.status(400);
            throw new Error ('Invalid details');
        }
    }

        catch(err){
            const errors = handleErrors(err);
            res.status(400).json({errors});
        }
}
module.exports.login_get= async(req,res)=>{
    res.render('login');
}
module.exports.login_post=async(req,res)=>{
    const {employe_id, password} = req.body;
    try{
      const employe=await Employe.login(employe_id,password);
      const token = Token(employe._id);
      res.cookie('jwt', token, { httpOnly: true});
       res.status(201).json({
         _id : employe._id,
         password: employe.password,
         employe_id: employe.employe_id
       });  
      }
        catch(err){
            const errors = handleErrors(err);
            res.status(400).json({errors});
        }
}
module.exports.getEmploye = async(req,res) => {
  try{
  const employe = await Employe.findById(req.user._id);
  if (employe) {
    res.json({
      _id: employe._id,
      name: employe.first_name,
      email: employe.email,
      employe_id: employe.employe_id,
    });
  } else {
    res.status(404);
    throw new Error('user not found');
  }
}
catch(err){
 console.log(err);
}
};

