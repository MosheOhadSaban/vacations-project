const vacationsDao = require("../dao/vacations-dao");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
const extractUserData = require("../http-utilities/extractUserData");
const PushLogic = require("./PushLogic");

async function getAllVacations() {
  let vacationsLogic = await vacationsDao.getAllVacations();
  return vacationsLogic;
}

async function getNewVacationId() {
  let VacationIdLogic = await vacationsDao.getNewVacationId();
  return VacationIdLogic;
}

async function addVacation(vacationData, loggedInUser, vacationId) {
  if (loggedInUser.userType != "ADMIN") {
    throw new ServerError(ErrorType.USER_UNAUTHORIZED);
  }
  let newVacationLogic = await vacationsDao.addVacation(
    vacationData,
    vacationId
  );
  vacationData["vacationId"] = vacationId;
  PushLogic.broadcastExceptSender(
    "add-new-vacation",
    vacationData,
    loggedInUser.userId
  );
  if (newVacationLogic == null || newVacationLogic.length == 0) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(vacationData),
      e
    );
  }
  return newVacationLogic;
}

async function deleteVacation(vacationId, loggedInUser) {
  if (loggedInUser.userType != "ADMIN") {
    throw new ServerError(ErrorType.USER_UNAUTHORIZED);
  }
  await vacationsDao.deleteVacation(vacationId);
  PushLogic.broadcastExceptSender(
    "delete-vacation",
    vacationId,
    loggedInUser.userId
  );
}

async function updateVacation(vacationNewData, loggedInUser) {
  if (loggedInUser.userType != "ADMIN") {
    throw new ServerError(ErrorType.USER_UNAUTHORIZED);
  }
  await vacationsDao.updateVacation(vacationNewData);
  PushLogic.broadcastExceptSender(
    "update-vacation",
    vacationNewData,
    loggedInUser.userId
  );
  return vacationNewData;
}

module.exports = {
  getAllVacations,
  addVacation,
  deleteVacation,
  updateVacation,
  getNewVacationId,
};
