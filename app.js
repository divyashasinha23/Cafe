const express = require("express");
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const colors = require('colors');
const menuRoute = require('./routes/menuRoute');
const authRoute = require('./routes/authRoute');
const cartRoute = require('./routes/cartRoute');
const cookieParser =require('cookie-parser');
const {requireAuth, currentUser} = require('./Middleware/authmiddleware');
const path = require('path');
var multer = require('multer');
var fs = require('fs'); 
var Employe = require('./models/Employe');
const upload = require('./Middleware/authmiddleware');

dotenv.config();

connectDB()
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.json());

app.use(cookieParser());

//view engine
app.set('view engine', 'ejs');

//Stripe key generation
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
const stripe = require('stripe')(stripeSecretKey);


app.get('*', currentUser);
app.get('/', (req,res) =>{
    fs.readFile('menu.JSON', function(error, data){
        if(error) {
            console.log(error);
        } else{
            res.render('home', {
                stripePublicKey:stripePublicKey,
                menu: JSON.parse(data)
            });
        }
    })
})


app.get('/profile', requireAuth, (req,res) => {
    res.render('profile');
})

})
// app.get('/orderconfirm',requireAuth, (req,res) => {
//     fs.readFile('menu.JSON', function(error, data){
//         if(error) {
//             console.log(error);
//         } else{
//             res.render('cart', {
//                 stripePublicKey:stripePublicKey,
//                 menu: JSON.parse(data)
//             });
//         }
//     })
// });
app.post('/orderconfirm', function(req,res){
    fs.readFile('menu.json',function(error,data){
        if(error)
        {
            res.status(500).end();
            console.log(error);
        }else{
            const menuJson=JSON.parse(data)
            const menuArray=menuJson.Beverages.concat(menuJson.Snacks).concat(menuJson.Dessert)
            let total=0
            req.body.menu.forEach(function(menu){
                const menuJson= menuArray.find(function(i){
                    return i.id == menu.id
                })
                total= total + menuJson.price * menu.quantity
            })
            stripe.charges.create({
                amount:total,
                source:req.body.stripeTokenId,
                currency:'ind'
            }).then(function(){
                console.log("charge successful")
                res.json({message:'successfully ordered'})
            }).catch(function(){
                console.log('charge fail')
                res.status(500).end()
            })
        }
    })
})

//upload image

// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads');
//     },
//     filename: (req,file,cb) => {
//         cb(null, file.fieldname + '-' + Date.now());
//     }
// });
// var upload = multer({storage: storage});
if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
  
 
  

  app.post('/upload', upload, function(req, res, next) {
    var imageFile=req.file.filename;
   var success =req.file.filename+ " uploaded successfully";
  
   var imageDetails= new uploadModel({
    imagename:imageFile
   });
   imageDetails.save(function(err,doc){
  if(err) throw err;
  
  imageData.exec(function(err,data){
  if(err) throw err;
  res.render('upload-file', { title: 'Upload File', records:data,   success:success });
  });
  
   });
  
    });
    app.get('/upload',function(req, res, next) {
        imageData.exec(function(err,data){
          if(err) throw err;
      res.render('upload-file', { title: 'Upload File', records:data, success:'' });
        });
      });
      
  





const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

//Upload route
app.post('/upload', upload.single('image'), (req, res, next) => {
    try {
          res.render('image');
        }
     catch (error) {
        console.error(error);
    }
});



app.use(authRoute);

PORT = process.env.PORT;

//app.listen(PORT, ()=> console.log(`Server started at port ${PORT}`))
app.listen(Port, function() {
    console.log(`Our app is running on http://localhost:  ${PORT}`);
});
