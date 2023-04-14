const userModel = require('../model/uesrmodel')

module.exports.getUser = async function getUser(req, res) {
    let id = req.id;
    let user = await userModel.findById(id);
    if (user) {
        res.json(user);
    }
    else {
        res.json({
            message: 'User not found'
        })
    }
};
module.exports.updateUser = async function updateUser(req, res) {
    try {
        let id = req.params.id;
        let user = await userModel.findById(id);
        let dataToBeUpdated = req.body;
        if (user) {
            let keys = [];
            for (let key in dataToBeUpdated) {
                keys.push(key);
            }
            for (let i = 0; i < keys.length; i++) {
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }
            const updatedData = await user.save();
            res.json({
                message: 'data updated successfully',
                data: user
            })
        }
        else {
            res.json({
                message: 'User not found'
            });
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
};
module.exports.deleteUser = async function deleteUser(req, res) {
    try {
        let id = req.params.id
        let user = await userModel.findByIdAndDelete(id);
        if (!user) {
            res.json({
                message: 'User Not found'
            })
        }
        res.send({
            message: 'user deleted',
            data: user
        });
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
};
module.exports.getAllUser = async function getAllUser(req, res) {
    try {
        let users = await userModel.find();
        if (users) {
            res.json({
                message: "User retrived",
                data: users
            });
        }
        else {
            res.json({
                message: 'No user found'
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
};