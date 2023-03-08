const express = require('express');
const userModel = require('./model/uesrmodel_db');
const userRouter=require('./Routers/userRouter');
const cookieParser = require('cookie-parser');
const planModel = require ('./model/planmodel')
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter)

app.listen(3000,()=>{
    console.log('Server is running');
});