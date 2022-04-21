const usersDao = require("../dao/users-dao");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../config.json");
const saltRight = "sdkjfhdskajh";
const saltLeft = "--mnlcfs;@!$ ";
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
const validateUser = require("../http-utilities/validateUserData");

async function login(userLoginInfo) {
  validateUser.validateUserDataLogin(userLoginInfo);
  userLoginInfo.password = crypto
    .createHash("md5")
    .update(saltLeft + userLoginInfo.password + saltRight)
    .digest("hex");

  let usersLoginResultLogic = await usersDao.login(userLoginInfo);
  if (usersLoginResultLogic == null || usersLoginResultLogic.length == 0) {
    throw new ServerError(ErrorType.UNAUTHORIZED);
  }
  const token = jwt.sign(
    {
      userId: usersLoginResultLogic.userId,
      userType: usersLoginResultLogic.userType,
      userName: usersLoginResultLogic.userName,
    },
    config.secret
  );
  return {
    token: token,
  };
}

async function addUser(userRegisterInfo) {
  validateUser.validateUserDataRegister(userRegisterInfo);
  userRegisterInfo.password = crypto
    .createHash("md5")
    .update(saltLeft + userRegisterInfo.password + saltRight)
    .digest("hex");

  let isUserNameAlreadyExsit = await usersDao.isUserNameAlreadyExists(
    userRegisterInfo.userName
  );
  if (isUserNameAlreadyExsit == 1) {
    throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
  }
  await usersDao.addUser(userRegisterInfo);
}

module.exports = {
  login,
  addUser,
};
