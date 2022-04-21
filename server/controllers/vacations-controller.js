const express = require("express");
const router = express.Router();
const vacationsLogic = require("../logic/vacations-logic");
const extractUserData = require("../http-utilities/extractUserData");

// get all vacations on homepage load
router.get("/", async (request, response, next) => {
  try {
    let vacationsController = await vacationsLogic.getAllVacations();
    response.json(vacationsController);
  } catch (error) {
    return next(error);
  }
});

// add new Vacation
router.post("/", async (request, response, next) => {
  let vacationData = request.body.vacationData;
  let loggedInUser = extractUserData.extractFromToken(request);
  try {
    let vacationId = await vacationsLogic.getNewVacationId();
    await vacationsLogic.addVacation(vacationData, loggedInUser, vacationId);
    response.json("Vacation added successfully");
  } catch (error) {
    return next(error);
  }
});
// delete vacation
router.delete("/:id", async (request, response, next) => {
  let loggedInUser = extractUserData.extractFromToken(request);
  let vacationId = request.params.id;
  try {
    await vacationsLogic.deleteVacation(vacationId, loggedInUser);
    response.json("The selected vacation has been successfully deleted");
  } catch (error) {
    return next(error);
  }
});
// update vacation
router.put("/", async (request, response, next) => {
  let loggedInUser = extractUserData.extractFromToken(request);
  let vacationNewData = request.body;
  try {
    await vacationsLogic.updateVacation(vacationNewData, loggedInUser);
    response.json("The vacation has been successfully updated");
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
