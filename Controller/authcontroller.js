const mongoose = require('mongoose');
const Employe = require('../models/Employe');
const jwt = require('jsonwebtoken');


//creating json web token
const Token = (id) => {
    return jwt.sign({id}, 'cafeteria', {
    expiresIn: '30d',
    });
};

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
            res.status(400)
            console.log(err);
        }
}
module.exports.login_get=async(req,res)=>{
    res.render('login');
}
module.exports.login_post=async(req,res)=>{
    const {email, password} = req.body;
    try{
      const employe=await Employe.login(email,password);
      const token=Token(employe._id);
      res.status(200).json({employe:employe._id});
    }
        catch(err){
            res.status(400)
            console.log(err);
        }

}


