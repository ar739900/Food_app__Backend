const express = require('express');
const userModel = require('../model/uesrmodel');
const jwt = require('jsonwebtoken');
const JWT_KEY = 'ksgkjhsuhskjbs';
const crypto = require('crypto');

module.exports.SignUp = async function SignUp(req, res) {
    try {
        let dataObj = req.body
        let user = await userModel.create(dataObj)
        if (user) {
            res.json({
                message: 'Sign up successful',
                data: user
            });
        }
        else {
            res.json({
                message: 'Error while signing up'
            });
        }

    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
};
module.exports.LogIn = async function LogIn(req, res) {
    try {
        let data = req.body;
        if (data.email) {
            let user = await userModel.findOne({ email: data.email })
            if (user) {
                if (user.password == data.password) {
                    let uid = user['_id'];
                    let token = jwt.sign({ payload: uid }, JWT_KEY)
                    res.cookie('login', token);
                    return res.json({
                        message: 'user logged in',
                        data: data
                    })
                }
                else {
                    return res.json({
                        message: 'Wrong credentials'
                    })
                }
            }
            else {
                return res.json({
                    message: 'user not found'
                });
            }

        }
        else {
            return res.json({
                message: 'empty field'
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
};
module.exports.isAuthorised = function isAuthorised(roles) {
    return function (req, res, next) {
        if (roles.includes(req.role) == true) {
            next();
        }
        else {
            res.status(401).json({
                message: 'Admin role is required to access this section'
            });
        }
    }
};
module.exports.protectRoute = async function protectRoute(req, res, next) {
    try {
        let token;
        if (req.cookies.login) {
            token = req.cookies.login;
            console.log(token);
            let payload = jwt.verify(token, JWT_KEY);
            if (payload) {
                const user = await userModel.findById(payload.payload);
                req.role = user.role;
                req.id = user.id;
                next();
            }
            else {
                res.json({
                    message: 'invalid operation'
                });
            }
        }
        else {
            const client = req.get('User-Agent')
            if (client.includes('mozilla') == true) {
                res.redirect('/login')
            }
            res.json({
                message: 'Login required'
            });
        }
    }
    catch (err) {
        res.json({
            message: err.message
        });
    }
};
module.exports.forgotPassword = async function forgotPassword(req, res) {
    let { email } = req.body
    const user = await userModel.findOne({ email: email });
    try {
        if (user) {
            const resetToken = user.createResetToken();
            let resetPasswordLink = `${req.protocol}://${req.get('host')}/resetpassword/${user._id}`
        }
        else {
            res.json({
                message: 'Please Signup'
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
};
module.exports.resetPassword = async function resetPassword(req, res) {
    try {
        const token = req.params.token
        let { password, confirmPassword } = req.body
        const user = await userModel.findOne({ resetToken: token });
        if (user) {
            user.resetPasswordHandler = (password, confirmPassword)
            await user.save();
            res.json({
                message: 'User Password Changed Please login again'
            })
        }
        else {
            res.json({
                message: 'user not found'
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
};
module.exports.logout = function logout(req, res) {
    res.cookie('login', ' ', { maxAge: 1 });
    res.json({
        message: 'User logged out successfully'
    })
};