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
    res.render('/signup');
}
module.exports.signup_post = async(req,res) => {
    const {email, password, employe_id,mobile_no,last_name,first_name} = req.body;
    try{
        const employee = await Employe.create({email, password, employe_id,mobile_no,last_name,first_name});
        if(employee){
            res.status(201);
            res.json({
                _id:employee._id,
                name:employee.name,
                email:employee.email,
                token: Token(employee._id)
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