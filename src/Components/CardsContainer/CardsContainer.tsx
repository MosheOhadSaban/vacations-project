import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../Redux/app-state";
import VacationCard from "../VacationCard/VacationCard";
import "./CardsContainer.css";
import axios from "axios";
import { ActionType } from "../../Redux/action-type";
import { useEffect } from "react";
import { DataArray } from "../../Model/Data";
import jwt_decode from "jwt-decode";
import BarCharts from "../Charts/BarCharts";


export default function CardsContainer() {
  const dispatch = useDispatch();
  const isUserAdmin = useSelector((state: AppState) => state.isUserTypeAdmin);
  const isUserOnline = useSelector((state: AppState) => state.isUserOnline);
  const isChartsOff = useSelector((state: AppState) => state.isChartsOff);

  useEffect(() => {
    let token: any = sessionStorage.getItem("token");
    const getVacatiosCardsData = async () => {
      try {
        const response = await axios.get<DataArray>(
          "http://localhost:3001/vacations/"
        );
        dispatch({
          type: ActionType.VacationsCardsDataInitialization,
          payload: response.data,
        });
      } catch (e) {
        alert("Failed to extract data from server");
      }
    };

    const isUserOnline = () => {
      if (token !== null) {
        return true;
      }
      return false;
    };
    const getUserDataFromSeverAndChangeUserStatusToOnline = async () => {
      let decodedToken:any = jwt_decode(token);
      axios.defaults.headers.common["Authorization"] = token;
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = await axios.get<DataArray>(
          "http://localhost:3001/followVacations/"
        );
        dispatch({
          type: ActionType.ChangeUserStatusOnlineOrOffline,
          payload: true,
        });
        dispatch({
          type: ActionType.ChangeUserType,
          payload: decodedToken,
        });
        dispatch({
          type: ActionType.RemoveRegisterLoginAcsess,
          payload: false,
        });
        dispatch({
          type: ActionType.ChangeFollowingStatus,
          payload: response.data,
        });
        dispatch({
          type: ActionType.OnLoginSortCardsByFollowing,
        });
        dispatch({
          type: ActionType.SetCurrentUserName,
          payload:decodedToken.userName
        });
        const getFollowedVacatiosChartsData = async () => {
          const response = await axios.get(
            "http://localhost:3001/followVacations/charts"
          );
          dispatch({
            type: ActionType.SetVacationsChartsData,
            payload: response.data,
          });
        };
        getFollowedVacatiosChartsData();
      } catch (error) {
        alert("Failed to extract followed vacations from server");
      }
    };
    getVacatiosCardsData();
    if (isUserOnline() === true) {
      getUserDataFromSeverAndChangeUserStatusToOnline();
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const vacationsCards = useSelector((state: AppState) => state.vacations);

  return (
    <Container fluid className="CardsContainer">
      {isUserOnline === true &&
        isUserAdmin === true &&
        isChartsOff === false && <BarCharts />}

      <Row md="auto">
        {vacationsCards.map((vacation, index) => (
          <Col key={index}>
            <VacationCard
              key={index}
              title={vacation.title}
              destination={vacation.destination}
              description={vacation.description}
              price={vacation.price}
              startDate={vacation.startDate}
              endDate={vacation.endDate}
              vacationId={vacation.vacationId}
              image={vacation.image}
              isOnEditMode={vacation.isOnEditMode}
              isFollowByUser={vacation.isFollowByUser}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
