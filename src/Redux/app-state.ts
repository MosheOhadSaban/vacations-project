import { ChartsData } from "../Model/ChartsData";
import { VacationCardModel } from "../Model/Vacation-Card";

export class AppState {
  public successfulLoginUserInfoAppState = {};
  public vacations: VacationCardModel[] = [];
  public isUserTypeAdmin: boolean = false;
  public isUserOnline: boolean = false;
  public isOnLoginOrRegisterPage = false;
  public userSessionToken: any = sessionStorage.getItem("token");
  public vacationsChartsData: ChartsData[] = [];
  public isChartsOff = true
  public currentUserName = ""
}
