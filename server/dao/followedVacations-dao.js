let connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

async function getUserFollowedVacationsId(loggedInUser) {
  let sql = "select * from followedvacations where userId=?";
  let parameters = [loggedInUser.userId];
  try {
    let followedVacationsId = await connection.executeWithParameters(
      sql,
      parameters
    );
    return followedVacationsId;
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(loggedInUser.userId),
      e
    );
  }
}

async function followVacation(loggedInUser, vacationIdForFollowing) {
  let followId = Math.floor(100000000 + Math.random() * 900000000);
  let sql =
    "INSERT INTO followedvacations (followId, vacationId, userId) values(?, ?, ?)";
  let parameters = [followId, vacationIdForFollowing, loggedInUser.userId];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(loggedInUser, vacationIdForFollowing.vacationId),
      e
    );
  }
}

async function unfollowVacation(loggedInUser, vacationIdForUnfollowing) {
  let sql = "delete from followedvacations where vacationId=? and userId=?";
  let parameters = [vacationIdForUnfollowing, loggedInUser.userId];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(loggedInUser, vacationIdForFollowing.vacationId),
      e
    );
  }
}
async function isUserAlreadyFollowVacation(
  loggedInUser,
  vacationIdForFollowing
) {
  let sql =
    "SELECT COUNT(1) as namesCount FROM followedvacations  WHERE vacationId=? and userId=?";
  let parameters = [vacationIdForFollowing, loggedInUser.userId];
  let checkdVacationInfo;
  try {
    checkdVacationInfo = await connection.executeWithParameters(
      sql,
      parameters
    );
    checkdVacationInfo = checkdVacationInfo[0].namesCount;
    return checkdVacationInfo;
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(loggedInUser.userId, vacationIdForFollowing),
      e
    );
  }
}

async function getFollowedVacationsChartsData() {
  let sql =
    "SELECT v.title, v.vacationId, count(fv.userId) AS amount   FROM followedvacations fv INNER JOIN vacationsdetails v ON v.vacationId = fv.vacationId GROUP BY v.title";
  let followedVacationsChartsDataDao;
  try {
    followedVacationsChartsDataDao = await connection.execute(sql);
    // console.log(followedVacationsChartsDataDao);
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(followedVacationsChartsDataDao),
      e
    );
  }

  return followedVacationsChartsDataDao;
}

module.exports = {
  getUserFollowedVacationsId,
  followVacation,
  unfollowVacation,
  isUserAlreadyFollowVacation,
  getFollowedVacationsChartsData,
};
