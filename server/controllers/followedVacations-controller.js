const followedVacationsLogic = require("../logic/followedVacations-logic");
const express = require("express");
const router = express.Router();
const extractUserData = require("../http-utilities/extractUserData");

router.get("/", async (request, response, next) => {
  let loggedInUser = extractUserData.extractFromToken(request);
  try {
    let followedVacationsIdController =
      await followedVacationsLogic.getUserFollowedVacationsId(loggedInUser);
    if (followedVacationsIdController !== null) {
      response.json(followedVacationsIdController);
    } else {
      response.json(null); // if the user follow after 0 vacation we get null
    }
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (request, response, next) => {
  let loggedInUser = extractUserData.extractFromToken(request);
  let vacationIdForFollowing = request.body.vacationId;
  let vacationNameForFollowing = request.body.vacationTitle
  try {
    await followedVacationsLogic.followVacation(
      loggedInUser,
      vacationIdForFollowing,
      vacationNameForFollowing,
    );
    response.json("You are now following this vacation");
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (request, response, next) => {
  let loggedInUser = extractUserData.extractFromToken(request);
  let vacationIdForUnfollowing = request.params.id;
  try {
    await followedVacationsLogic.unfollowVacation(
      loggedInUser,
      vacationIdForUnfollowing
    );
    response.json("You are no longer following this vacation");
  } catch (error) {
    return next(error);
  }
});

router.get("/charts", async (request, response, next) => {
  try {
    let followedVacationsChartsDataController =
      await followedVacationsLogic.getFollowedVacationsChartsData();
    response.json(followedVacationsChartsDataController);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
