const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const staticRoutes = require('./routes/staticRoutes');
const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog');
const checkForAuthenticationCookie = require('./middleware/auth');
const cookieParser = require('cookie-parser');

mongoose.connect("mongodb://localhost:27017/blogify").then(()=>{
    console.log("Database connected successfully")
}).catch((err)=>{
    console.log("Database connection failed",err)
});

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


app.use(express.static(path.resolve('./public')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(checkForAuthenticationCookie("token"));

app.use('/user',userRoutes);
app.use('/', staticRoutes);
app.use("/blog",blogRoutes);

app.listen(port,()=>{console.log(`Server is running on port ${port}`)});