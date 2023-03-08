const mongoose = require('mongoose');

const db_link = 'mongodb+srv://ar739900:V4IzqDRsPY0KXF1x@cluster0.tcshfab.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(db_link)
    .then(function () {
        console.log('Plan Database connected');
    })
    .catch(function (err) {
        console.log(err);
    });
const planSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: [20, 'excceding 20 charecters']
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    averageRating: {
        type: Number
    },
    discount: {
        type: Number,
        validate: [function () {
            return this.discount < 100
        },'Discount should not exceed 100']
    }
});
const planModel = mongoose.model('planModel', planSchema);

(async function createschema() {
    let planObj = {
        name: 'Superfood',
        duration: 30,
        price:1000,
        ratingsAverage: 5,
        discount: 20
    }
    let data = await planModel.create(planObj);
    console.log(data);
    // const doc —new planModel(plan0bj);
    // await doc.save();
})();

module.exports = planModel;