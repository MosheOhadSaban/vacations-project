const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

async function getAllVacations() {
  let sql = "select * from vacationsdetails";
  try {
    let vacationsDao = await connection.execute(sql);
    return vacationsDao;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(), e);
  }
}

async function getNewVacationId() {
  let sql =
    "SELECT * FROM vacationsdetails WHERE vacationId=(SELECT MAX(vacationId) FROM vacationsdetails);";
  try {
    let lastVacationId = await connection.execute(sql);
    lastVacationId = lastVacationId[0].vacationId;
    let newVacationId = lastVacationId + 1;
    return newVacationId;
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(lastVacationId),
      e
    );
  }
}

async function addVacation(vacationData, vacationId) {
  let sql =
    "INSERT INTO vacationsdetails (vacationId, title, destination, description, price, startDate, endDate, image)  values(?, ?, ?, ?, ?, ?, ?, ?)";
  let parameters = [
    vacationId,
    vacationData.title,
    vacationData.destination,
    vacationData.description,
    vacationData.price,
    vacationData.startDate,
    vacationData.endDate,
    vacationData.image,
  ];
  try {
    let newVacationDao = await connection.executeWithParameters(
      sql,
      parameters
    );
    return newVacationDao;
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(vacationData),
      e
    );
  }
}
async function deleteVacation(vacationId) {
  let sql = "delete from vacationsdetails where vacationId=?";
  let parameters = [vacationId];
  try {
    await connection.executeWithParameters(sql, parameters);
    return vacationId;
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(vacationId),
      e
    );
  }
}

async function updateVacation(vacationNewData) {
  let sql =
    "UPDATE vacationsdetails SET title = ?, destination = ?, description = ?, price = ?, startDate = ?, endDate = ?, image = ? where vacationId = ?";
  let parameters = [
    vacationNewData.title,
    vacationNewData.destination,
    vacationNewData.description,
    vacationNewData.price,
    vacationNewData.startDate,
    vacationNewData.endDate,
    vacationNewData.image,
    vacationNewData.vacationId,
  ];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(vacationNewData),
      e
    );
  }
}

module.exports = {
  getAllVacations,
  addVacation,
  deleteVacation,
  updateVacation,
  getNewVacationId,
};
