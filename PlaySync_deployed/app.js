require('dotenv').config();

const express=require('express');
const path=require('path');
const cookieParser=require('cookie-parser');
const connectMongo=require('./connection');
const {authenicateUser}=require('./middlewares/auth');
const seedScheduleData=require('./services/seedschedule');




const staticRouter=require('./routes/staticRouter');
const userRouter=require('./routes/user');



const app=express();
const PORT=process.env.PORT;


//CONNECTION
connectMongo('mongodb://localhost:27017/playsync');


seedScheduleData('mahindra-university','badminton',['7:00AM-8:00AM','8:00AM - 9:00AM','5:00PM-6:00PM','6:00PM-7:00PM','7:00PM-8:00PM','8:00PM-9:00PM'], 4);
seedScheduleData('bitsh-university','football',['7:00AM-8:00AM','8:00AM - 9:00AM','5:00PM-6:00PM','6:00PM-7:00PM','7:00PM-8:00PM','8:00PM-9:00PM'], 11);



//VIEW
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

//ROUTES
app.use('/',authenicateUser,staticRouter);
app.use('/user',authenicateUser,userRouter);




//RUN
app.listen(PORT,()=>{
    console.log('PlaySync Server is up and running! PORT: '+PORT);
});