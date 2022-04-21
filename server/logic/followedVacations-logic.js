const followedVacationsDao = require("../dao/followedVacations-dao");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
const PushLogic = require("./PushLogic");

async function getUserFollowedVacationsId(loggedInUser) {
  let followedVacationsIdLogic =
    await followedVacationsDao.getUserFollowedVacationsId(loggedInUser);
  return followedVacationsIdLogic;
}

async function followVacation(
  loggedInUser,
  vacationIdForFollowing,
  vacationNameForFollowing
) {
  let vacationToFollowData = {
    title: vacationNameForFollowing,
    vacationId: vacationIdForFollowing,
  };
  let isUserAlreadyFollowVacation =
    await followedVacationsDao.isUserAlreadyFollowVacation(
      loggedInUser,
      vacationIdForFollowing
    );
  if (isUserAlreadyFollowVacation == 1) {
    throw new ServerError(ErrorType.VACATION_ALREADY_FOLLOWED);
  }
  await followedVacationsDao.followVacation(
    loggedInUser,
    vacationIdForFollowing
  );
  PushLogic.broadcastExceptSender(
    "follow-vacation",
    vacationToFollowData,
    loggedInUser.userId
  );
}

async function unfollowVacation(loggedInUser, vacationIdForUnfollowing) {
  await followedVacationsDao.unfollowVacation(
    loggedInUser,
    vacationIdForUnfollowing
  );
  vacationIdForUnfollowing = parseInt(vacationIdForUnfollowing);
  PushLogic.broadcastExceptSender(
    "unfollow-vacation",
    vacationIdForUnfollowing,
    loggedInUser.userId
  );
}

async function getFollowedVacationsChartsData() {
  let followedVacationsChartsDataLogic =
    await followedVacationsDao.getFollowedVacationsChartsData();
  return followedVacationsChartsDataLogic;
}

module.exports = {
  getUserFollowedVacationsId,
  followVacation,
  unfollowVacation,
  getFollowedVacationsChartsData,
};
