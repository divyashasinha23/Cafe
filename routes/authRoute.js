const express = require("express");
const router = express.Router();
const authcontroller = require('../Controller/authcontroller');

router.get('/signup',authcontroller.signup_get);
router.post('/signup',authcontroller.signup_post);


module.exports = router;
