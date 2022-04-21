const usersLogic = require("../logic/users-logic");
const express = require("express");
const router = express.Router();
const extractUserData = require("../http-utilities/extractUserData");

router.post("/login", async (request, response, next) => {
  
  let userLoginInfo = request.body;
  let successfulLoginMessage = "Successful login";
  try {
    let usersLoginResultController = await usersLogic.login(userLoginInfo);
    response.json({ usersLoginResultController, successfulLoginMessage });
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (request, response, next) => {
  let userRegisterInfo = request.body;

  try {
    await usersLogic.addUser(userRegisterInfo);
    response.json("Registration Success");
  } catch (error) {
    return next(error);
  }
});


module.exports = router;
