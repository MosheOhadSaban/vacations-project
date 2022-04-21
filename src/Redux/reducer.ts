import { AppState } from "./app-state";
import { Action } from "./action";
import { ActionType } from "./action-type";
import { VacationCardModel } from "../Model/Vacation-Card";

export function reduce(
  oldAppState: AppState = new AppState(),
  action: Action
): AppState {
  const newAppState = { ...oldAppState };

  switch (action.type) {
    case ActionType.ChangeUserType:
      let userType = action.payload.userType;
      if (userType === "ADMIN") {
        newAppState.isUserTypeAdmin = true;
      } else {
        newAppState.isUserTypeAdmin = false;
      }
      break;

    case ActionType.ChangeFollowingStatus:
      let followedVacationsArray = action.payload;
      newAppState.vacations = [...oldAppState.vacations];
      for (let index = 0; index < followedVacationsArray.length; index++) {
        for (let i = 0; i < newAppState.vacations.length; i++) {
          if (
            followedVacationsArray[index].vacationId ===
            newAppState.vacations[i].vacationId
          ) {
            newAppState.vacations[i].isFollowByUser = true;
          }
        }
      }
      break;

    case ActionType.ChangeUserStatusOnlineOrOffline:
      newAppState.isUserOnline = action.payload;
      break;

    case ActionType.RemoveRegisterLoginAcsess:
      newAppState.isOnLoginOrRegisterPage = action.payload;
      break;

    case ActionType.SortCardsByFollowing:
      let vacationCardId = action.payload.vacationId;
      let isFollowingChecked = action.payload.isCheckd;
      newAppState.vacations = [...oldAppState.vacations];

      if (isFollowingChecked === true) {
        for (let index = 0; index < newAppState.vacations.length; index++) {
          if (vacationCardId === newAppState.vacations[index].vacationId) {
            newAppState.vacations[index].isFollowByUser = true;
          }
        }
      }
      if (isFollowingChecked === false) {
        for (let index = 0; index < newAppState.vacations.length; index++) {
          if (vacationCardId === newAppState.vacations[index].vacationId) {
            newAppState.vacations[index].isFollowByUser = false;
          }
        }
      }
      let tempVacationArray = newAppState.vacations.sort(function (x, y) {
        return x.isFollowByUser === y.isFollowByUser
          ? 0
          : x.isFollowByUser
          ? -1
          : 1;
      });
      newAppState.vacations = tempVacationArray;
      break;

    case ActionType.SavaCardAfterEdit:
      newAppState.vacations = [...oldAppState.vacations];
      let vacationIdForEdit = action.payload.vacationId;
      let vacationUpdatedData = action.payload;
      for (let index = 0; index < newAppState.vacations.length; index++) {
        if (vacationIdForEdit === newAppState.vacations[index].vacationId) {
          vacationUpdatedData.isFollowByUser =
            newAppState.vacations[index].isFollowByUser;
          newAppState.vacations[index] = vacationUpdatedData;
          newAppState.vacations[index].isOnEditMode = false;
        }
      }
      break;

    case ActionType.ChangeToEditMode:
      let cardIdForEdit = action.payload;
      newAppState.vacations = [...oldAppState.vacations];
      for (let index = 0; index < newAppState.vacations.length; index++) {
        if (cardIdForEdit === newAppState.vacations[index].vacationId) {
          newAppState.vacations[index].isOnEditMode = true;
        }
      }

      break;

    case ActionType.VacationsCardsDataInitialization:
      let vacationsServerData: VacationCardModel[] = action.payload;

      for (let index = 0; index < vacationsServerData.length; index++) {
        vacationsServerData[index].isFollowByUser = false;
        vacationsServerData[index].isOnEditMode = false;
      }

      newAppState.vacations = [...oldAppState.vacations];
      newAppState.vacations = vacationsServerData;
      break;

    case ActionType.OnLoginSortCardsByFollowing:
      newAppState.vacations = [...oldAppState.vacations];
      let tempSortVacationArray = newAppState.vacations.sort(function (x, y) {
        return x.isFollowByUser === y.isFollowByUser
          ? 0
          : x.isFollowByUser
          ? -1
          : 1;
      });
      newAppState.vacations = tempSortVacationArray;

      break;

    case ActionType.DeleteVacationCard:
      newAppState.vacations = [...oldAppState.vacations];
      let vactionIdToDelete = action.payload;
      vactionIdToDelete = parseInt(vactionIdToDelete);
      let filteredArray = newAppState.vacations.filter(function (vacation) {
        return vacation.vacationId !== +vactionIdToDelete;
      });
      newAppState.vacations = filteredArray;
      break;

    case ActionType.AddNewVacation:
      newAppState.vacations = [...oldAppState.vacations];
      let newVacationData: VacationCardModel = action.payload;
      newAppState.vacations.push(newVacationData);
      break;

    case ActionType.SetUserTokenStorage:
      let token = action.payload;
      newAppState.userSessionToken = token;
      break;

    case ActionType.SetVacationsChartsData:
      let vacationsChartsData = action.payload;
      newAppState.vacationsChartsData = vacationsChartsData;
      break;
    case ActionType.ChangeChartSwitchStatus:
      let isChartsSwitchUnchecked = action.payload;
      newAppState.isChartsOff = isChartsSwitchUnchecked;
      break;
    case ActionType.FolllowVacation:
      newAppState.vacationsChartsData = [...oldAppState.vacationsChartsData];
      let vacationIdForFollowing = action.payload.vacationId;
      let vacationDataToCharts = action.payload;

      let isVacationExistInChartData = false;

      for (
        let index = 0;
        index < newAppState.vacationsChartsData.length;
        index++
      ) {
        if (
          newAppState.vacationsChartsData[index].vacationId ===
          vacationIdForFollowing
        ) {
          isVacationExistInChartData = true;
        }
      }
      if (isVacationExistInChartData === false) {
        vacationDataToCharts.amount = 0;
        vacationDataToCharts.amount++;
        newAppState.vacationsChartsData.push(vacationDataToCharts);
      } else {
        for (
          let index = 0;
          index < newAppState.vacationsChartsData.length;
          index++
        ) {
          if (
            vacationIdForFollowing ===
            newAppState.vacationsChartsData[index].vacationId
          ) {
            let followersAmount: any =
              newAppState.vacationsChartsData[index].amount;
            followersAmount = followersAmount + 1;
            newAppState.vacationsChartsData[index].amount = followersAmount;
          }
        }
      }

      break;
    case ActionType.UnfollowVacation:
      newAppState.vacationsChartsData = [...oldAppState.vacationsChartsData];
      let vacationIdForUnfollowing = action.payload;
      for (
        let index = 0;
        index < newAppState.vacationsChartsData.length;
        index++
      ) {
        if (
          vacationIdForUnfollowing ===
          newAppState.vacationsChartsData[index].vacationId
        ) {
          let followersAmount = newAppState.vacationsChartsData[index].amount;
          followersAmount = followersAmount - 1;
          if (followersAmount !== 0) {
            newAppState.vacationsChartsData[index].amount = followersAmount;
            console.log(newAppState.vacationsChartsData);
          } else {
            newAppState.vacationsChartsData[index].amount = 0;
          }
        }
      }
      break;
    case ActionType.SetCurrentUserName:
      let userName = action.payload;
      newAppState.currentUserName = userName;
  }
  return newAppState;
}
