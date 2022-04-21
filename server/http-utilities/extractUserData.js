const jwt_decode = require("jwt-decode");

function extractFromToken(request) {
  let authorizationString = request.headers["authorization"];
  // Removing the bearer prefix, leaving the clean token
  let token = authorizationString.substring("Bearer ".length);
  let userData = jwt_decode(token);
  return userData;
}




module.exports = {
  extractFromToken,
};
