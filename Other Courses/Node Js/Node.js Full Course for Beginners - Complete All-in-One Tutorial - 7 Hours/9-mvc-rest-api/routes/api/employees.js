const express = require("express");
const employeesController = require("../../controllers/employeesController");

const router = express.Router();

router
  .route("/")
  .get(employeesController.getAllEmployees)
  .post(employeesController.createNewEmployee)
  .put(employeesController.updateEmployee)
  .delete(employeesController.deleteEmployee);

router.route("/:id")
  .get(employeesController.getEmployee)

module.exports = router;
