const express = require("express");
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const colors = require('colors');
const Menu = require('./data/menu');
const menuRoute = require('./routes/menuRoute');
const authRoute = require('./routes/authRoute');
const cookieParser =require('cookie-parser');
const {requireAuth, currentUser} = require('./Middleware/authmiddleware');
const path = require('path');
var multer = require('multer');
var fs = require('fs'); 




dotenv.config();

connectDB()
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.json());

app.use(cookieParser());

//view engine
app.set('view engine', 'ejs');

app.get('*', currentUser);
app.get('/', (req,res) => {
    res.render('home');
});
app.get('/profile', requireAuth, (req,res) => {
    res.render('profile');
})
app.get('/orderconfirm', requireAuth, (req,res) =>{
    res.render('home');
})

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req,file,cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
var upload = multer({storage: storage});

app.use(authRoute);

app.use('api/menu',menuRoute);

app.get('/menu', (req,res) => {
    res.json(Menu);
})

PORT = process.env.PORT;

app.listen(PORT, ()=> console.log(`Server started at port ${PORT}`));