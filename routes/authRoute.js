const express = require("express");
const router = express.Router();
const authcontroller = require('../Controller/authcontroller');
const { requireAuth, currentUser } = require("../Middleware/authmiddleware");


router.get('/signup',authcontroller.signup_get);
router.post('/signup',authcontroller.signup_post);
router.get('/login',authcontroller.login_get);
router.post('/login',authcontroller.login_post);
router.route('/profile').get(requireAuth, currentUser);




module.exports = router;
