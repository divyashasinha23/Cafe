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
    let errors = { email: '', password: '' };
  
    if (err.code === 11000) {
        if(err.message.includes("email_1")){
            errors.email = 'that email is already registered';
        }
        else{
         errors.employe_id = 'employe ID already registered';
    
        }
        return errors;
    }
  
    if(err.message === "incorrect email"){
      errors.email = "That email is not registered";
      return errors;
    }
  
    if(err.message === "incorrect password"){
      errors.password = "Password is incorrect";
      return errors;
    }
  
  
  if (err.message.includes('employe validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  }

module.exports.signup_get = async(req,res) => {
    res.render('signup');
}
module.exports.signup_post = async(req,res) => {
    const {email, password, employe_id,mobile_no,last_name,first_name} = req.body;
    try{
        const employe = await Employe.create({email, password, employe_id,mobile_no,last_name,first_name});
        if(employe){
            res.status(201);
            res.json({
                _id:employe._id,
                name:employe.name,
                email:employe.email,
                token: Token(employe._id)
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
    const {email, password} = req.body;
    try{
      const employe=await Employe.login(email,password);
          res.status(201);
          res.json({
            id:employe._id,
            name:employe.name,
            email:employe.email,
            token: Token(employe._id)
          });
      }
        catch(err){
            const errors = handleErrors(err);
            res.status(400).json({errors});
        }
}


