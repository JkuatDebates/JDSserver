require('dotenv').config();
const express=require('express');
const cors=require('cors');
const corsOptions=require('./config/corsOptions');
const mongoose=require('mongoose');
const connectDB=require('./config/dbConn');
const app=express();
const PORT=process.env.PORT|| 3500;

connectDB();//.then(()=>console.log("DB connected"));

//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));

//routes
app.use('/motions',require('./routes/api/motions.route'));

app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));