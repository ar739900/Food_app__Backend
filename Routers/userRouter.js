const express = require('express');
const userRouter = express.Router();
const {getUser,updateUser,deleteUser,getAllUser}=require('../controller/userController');
const {SignUp,LogIn,forgotPassword,resetPassword,logout,protectRoute,isAuthorised}=require('../controller/authController');

userRouter
.route('/signup')
.post(SignUp);

userRouter
.route('/login')
.post(LogIn);

userRouter
.route('/forgotpassword')
.post(forgotPassword);

userRouter
.route('/resetpassword/:token')
.post(resetPassword);

userRouter
.route('/logout')
.get(logout)

userRouter
.route("/:id")
.patch(updateUser)
.delete(deleteUser);

userRouter.use(protectRoute);
userRouter
.route("/userprofile")
.get(getUser);

userRouter.use (isAuthorised(['admin']))
userRouter
.route("/")
.get(getAllUser);

module.exports = userRouter;