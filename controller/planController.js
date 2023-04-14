const planModel = require('../model/planModel');

module.exports.getAllPlans = async function getAllPlans(req, res) {
    try {
        let plan = await planModel.find();
        if (plan) {
            res.json({
                message: 'All plans retrieved',
                data: plan
            });
        }
        else {
            res.json({
                message: 'No plan found'
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
module.exports.getPlan = async function getPlan(req, res) {
    try {
        let id = req.id
        let plan = await planModel.findOne(id);
        if (plan) {
            res.json({
                message: 'plan retrieved',
                data: plan
            });
        }
        else {
            res.json({
                message: 'No plan found'
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
module.exports.createPlan = async function createPlan(req, res) {
    try {
        if (req.body) {
            let planObj = {
                name: req.body.name,
                duration: req.body.duration,
                price: req.body.price,
                ratingsAverage: req.body.ratingAverage,
                discount: req.body.discount
            }
            let data = await planModel.create(planObj);
            res.json({
                message: 'Plan created successfully',
                data: data
            })
        }
        else {
            res.json({
                message: 'please enter all the corrcet values'
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}
module.exports.updatePlan = async function updatePlan(req, res) {
    try {
        let id = req.params.id;
        let plan = await planModel.findById(id);
        let dataToBeUpdated = req.body;
        if (plan) {
            let keys = [];
            for (let key in dataToBeUpdated) {
                keys.push(key);
            }
            for (let i = 0; i < keys.length; i++) {
                plan[keys[i]] = dataToBeUpdated[keys[i]];
            }
            const updatedData = await plan.save();
            res.json({
                message: 'plan updated successfully',
                data: plan
            })
        }
        else {
            res.json({
                message: 'Plan not available'
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
};
module.exports.deletePlan = async function deletePlan(req, res) {
    try {
        let id = req.params.id
        let plan = await planModel.findByIdAndDelete(id);
        if (!plan) {
            res.json({
                message: 'plan Not found'
            })
        }
        res.send({
            message: 'plan deleted',
            data: plan
        });
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
};
module.exports.topPlans = async function topPlans(req, res) {
    try {
        let planCount = req.id;
        for (let i = 0; i <= planCount; i++) {

        }

    }
    catch (err) {

    }
}