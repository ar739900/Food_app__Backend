const express = require('express');
const userModel = require('./model/uesrmodel');
const planModel = require('./model/planModel');
const userRouter=require('./Routers/userRouter');
const cookieParser = require('cookie-parser');
const planRouter = require ('./Routers/planRouter')
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter)
app.use("/plan",planRouter)

app.listen(3000,()=>{
    console.log('Server is running');
});