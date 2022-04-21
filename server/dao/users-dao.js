let connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

async function login(userLoginInfo) {
  let sql = "SELECT * FROM users where userName =? and password =?";

  let parameters = [userLoginInfo.userName, userLoginInfo.password];

  let usersLoginResultDao;
  try {
    usersLoginResultDao = await connection.executeWithParameters(
      sql,
      parameters
    );
    return usersLoginResultDao[0];
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(userLoginInfo.userName, userLoginInfo.password),
      e
    );
  }
}

async function addUser(userRegisterInfo) {
  let sql =
    "INSERT INTO users (userId, userName, password, firstName, lastName, userType)  values(?, ?, ?, ?, ?, ?)";
  userRegisterInfo.userType = "CUSTOMER";

  let parameters = [
    userRegisterInfo.userId,
    userRegisterInfo.userName,
    userRegisterInfo.password,
    userRegisterInfo.firstName,
    userRegisterInfo.lastName,
    userRegisterInfo.userType,
  ];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(userRegisterInfo),
      e
    );
  }
}

async function isUserNameAlreadyExists(registerUser) {
  let sql = "SELECT COUNT(1) as namesCount FROM users  WHERE userName=?";
  let parameters = [registerUser];
  let checkdUserName;
  try {
    checkdUserName = await connection.executeWithParameters(sql, parameters);
    checkdUserName = checkdUserName[0].namesCount;
    return checkdUserName;
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(registerUser),
      e
    );
  }
}

module.exports = {
  login,
  addUser,
  isUserNameAlreadyExists,
};
