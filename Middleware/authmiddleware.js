const jwt = require('jsonwebtoken');

const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'cafeteria', (err,decodedtoken) => {
            if(err){
                res.redirect('/login');
            }
            else{
                console.log(decodedToken)
            }
        });
    }
    else{
        res.redirect('/login');
    }
}

module.exports = requireAuth;