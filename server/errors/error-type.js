let ErrorType = {
  GENERAL_ERROR: {
    id: 1,
    httpCode: 600,
    message:
      "An error has occurred in the system, please contact the system administrator",
    isShowStackTrace: true,
  },
  USER_NAME_ALREADY_EXIST: {
    id: 2,
    httpCode: 601,
    message: "User name already exist",
    isShowStackTrace: false,
  },
  UNAUTHORIZED: {
    id: 3,
    httpCode: 401,
    message: "Login failed, invalid user name or password",
    isShowStackTrace: false,
  },
  INVALID_USER_NAME: {
    id: 4,
    httpCode: 602,
    message: "User name is invalid!",
    isShowStackTrace: false,
  },
  INVALID_PASSWORD: {
    id: 5,
    httpCode: 603,
    message: "Password is invalid",
    isShowStackTrace: false,
  },
  MISSING_USER_INFO: {
    id: 6,
    httpCode: 604,
    message:
      "Missing user information, Check that all your registry fields are valid",
    isShowStackTrace: false,
  },
  USER_UNAUTHORIZED: {
    id: 7,
    httpCode: 605,
    message: "User is not authorized",
    isShowStackTrace: true, //// inform the admin that someone tried to hack to the system
  },
  UNAUTHORIZED_PAST_USER: {
    id: 8,
    httpCode: 606,
    message: "This user no longer exists in the system",
    isShowStackTrace: true, // inform the admin that someone tried to hack to the system
  },
  VACATION_ALREADY_FOLLOWED: {
    id: 9,
    httpCode: 607,
    message: "You already following this vacation",
    isShowStackTrace: true, // we have a bug
  },
  SOCKET_ERROR : {
    id: 10,
    httpCode: 608,
    message: "Must call .init(server) before you can call .getio()",
    isShowStackTrace: true,
  }
};

module.exports = ErrorType;
