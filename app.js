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
const { checkout } = require("./routes/authRoute");

const publishable_key='pk_test_51I6rKrEqE6krtzrwGHckDwmOJhmlb3mOpIJtD6w9DU2d879zRE7CSxtnJ66Qgr0BOBiSBdYGFLYqME74F2g6Akcg00dBKy1rAr';
const secret_key='sk_test_51I6rKrEqE6krtzrwnyOZRJwLpK5idhekgzbXuX2BrEYZOhcqMqjDPDINVWmFIzCBKwvM5YAOGsucHXQesyjxMhHs00wixXeSXo';
const stripe =require('stripe')(secret_key);

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

    res.render('cart',{
        key:publishable_key
    });
})
app.post('/payment',requireAuth,(req,res)=>{
    stripe.customers.create({ 
        email: req.body.email, 
        name: req.body.first_name, 
        address: { 
            line1: 'TC 9/4 Old MES colony', 
            postal_code: '110092', 
            city: 'New Delhi', 
            state: 'Delhi', 
            country: 'India', 
        } 
    }) 
    .then((customer) => { 

        return stripe.charges.create({ 
            amount: 7000,    // Charing Rs 25 
            description: 'Web Development Product', 
            currency: 'USD', 
            customer: customer.id 
        }); 
    }) 
    .then((charge) => { 
        console.log("success")
        res.send("Success") // If no error occurs 
    }) 
    .catch((err) => { 
        res.send(err)    // If some error occurs 
    }); 
})
// app.get('*', currentUser);
// app.get('/profile', requireAuth, (req,res) => {
//     res.render('profile');
// });
app.use(authRoute);

app.use('api/menu',menuRoute);

app.get('/menu', (req,res) => {
    res.json(Menu);
})

PORT = process.env.PORT;

app.listen(PORT, ()=> console.log(`Server started at port ${PORT}`));