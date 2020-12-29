const express = require("express");
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const colors = require('colors');
const Menu = require('./data/menu');
const menuRoute = require('./routes/menuRoute');



dotenv.config();

connectDB()
const app = express();
app.use(express.json());

app.get('/', (req,res) => {
    res.send("Server is running");
});

app.use('api/menu',menuRoute);

app.get('/menu', (req,res) => {
    res.json(Menu);
})

PORT = process.env.PORT;

app.listen(PORT, ()=> console.log(`Server started at port ${PORT}`));