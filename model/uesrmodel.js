const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const db_link = 'mongodb+srv://ar739900:V4IzqDRsPY0KXF1x@cluster0.tcshfab.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(db_link)
    .then(function () {
        console.log('User Database connected');
    })
    .catch(function (err) {
        console.log(err);
    });
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function () {
            return emailValidator.validate(this.email);
        }
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    confirmPassword: {
        type: String,
        required: true,
        min: 8,
        validate: function () {
            return this.confirmPassword == this.password;
        }
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'restaurantowner', 'deliveryboy'],
        default: 'user'
    },
    profileImage: {
        type: String,
        default: 'food_app/public/index.html'
    },
    resetToken: String
});
userSchema.pre('save', function () {
    this.confirmPassword = undefined;
});
userSchema.methods.craeteResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.resetToken = resetToken;
    return resetToken
};
userSchema.methods.resetPasswordHandler = function (password, confirmPassword) {
    this.password = password
    this.confirmPassword = confirmPassword
    this.token = undefined
};

// userSchema.pre('save',async function(){
//     let salt =await bcrypt.genSalt();
//     let hashedString =await bcrypt.hash(this.password,salt);
//     this.password = hashedString;
// })
// userSchema.pre('save', function () {
//     console.log('before saving in database', this);
// });
// userSchema.post('save', function (doc) {
//     console.log('after saving in database', doc);
// });
const userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;
// (async function createUser(){
//     let user = {
//         name:'amit',
//         email:'someone@gmail.com',
//         password:'12345678',
//         confirmPassword:'12345678'
//     };
//     let data = await userModel.create(user)
//     console.log(data);
// })();

// //post
// app.post('/users/:id', (req, res) => {
//     console.log(users.params.id);
//     res.send("user id received");
//     res.send(users);
// })
// //patch
// app.patch("user/:id",(req,res)=>{

// })

// //delete
// app.delete("/user/:id", (req, res) => {
//     users = [{}]

// })