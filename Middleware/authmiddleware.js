const jwt = require('jsonwebtoken');
const Employe = require('../models/Employe');
const multer = require('multer');

const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'cafeteria', (err,decodedToken) => {
            if(err){
                res.redirect('/login');
            }
            else{
                console.log(decodedToken)
                next();
            }
        });
    }
    else{
        res.redirect('/login');
    }
};

const currentUser = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.locals.employe = null;
                next();
            } else{
                console.log(decodedToken);
                let employe = await Employe.findById(decodedToken.id);
                res.locals.employe = employe;
                // res.render('profile');
                next();
            }
        });
    }
    else{
       res.locals.employe = null;
       next();
    }
}

var Storage= multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
  });
  
  var upload = multer({
    storage:Storage
  }).single('file');

  module.exports = upload;

module.exports = {requireAuth, currentUser,upload};