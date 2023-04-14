const express = require('express');
const planRouter = express.Router();
const { protectRoute, isAuthorised } = require("../controller/authController")
const { getAllPlans, getPlan, createPlan, updatePlan, deletePlan, topPlans } = require('../controller/planController');

planRouter
  .route("/allplan")
  .get(getAllPlans)

planRouter.use(protectRoute)
planRouter
  .route("/plan/:id")
  .get(getPlans)

planRouter
  .route('/topplan/:id')
  .get(topPlan)

planRouter.use(isAuthorised(['admin', 'restaurantowner']))
planRouter
  .route("/crudplan")
  .post(createPlan)

planRouter
  .route("/crudplan/:id")
  .patch(updatePlan)
  .delete(deletePlan)



module.exports = planRouter;