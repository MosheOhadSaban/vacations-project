import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import DynamicBox from "./Components/DynamicBox/DynamicBox";
import Header from "./Components/Header/Header";
import { io } from "socket.io-client";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "./Redux/app-state";
import { ActionType } from "./Redux/action-type";

export default function App() {
  const dispatch = useDispatch();
  const ENDPOINT = "http://localhost:8000";
  const sessionToken = useSelector((state: AppState) => state.userSessionToken);

  // establish socket connection
  useEffect(() => {
    if (sessionToken) {
      axios.defaults.headers.common["Authorization"] = sessionToken;
      let tokenArray = sessionToken.split(" ");
      let tokenString = tokenArray[1];
      const socket = io(ENDPOINT, {
        auth: {
          token: tokenString,
        },
      });

      socket.on("connect", () => {
        console.log("Client connected");
      });
      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });

      socket.on("add-new-vacation", (vacationData) => {
        console.log(vacationData);
        dispatch({
          type: ActionType.AddNewVacation,
          payload: vacationData,
        });
      });

      socket.on("delete-vacation", (vacationId) => {
        dispatch({
          type: ActionType.DeleteVacationCard,
          payload: vacationId,
        });
      });

      socket.on("update-vacation", (vacationNewData) => {
        dispatch({
          type: ActionType.SavaCardAfterEdit,
          payload: vacationNewData,
        });
      });

      socket.on("follow-vacation", (vacationToFollowData) => {
        dispatch({
          type: ActionType.FolllowVacation,
          payload: vacationToFollowData,
        });
      });

      socket.on("unfollow-vacation", (vacationIdForUnfollowing) => {
        console.log(vacationIdForUnfollowing);
        dispatch({
          type: ActionType.UnfollowVacation,
          payload: vacationIdForUnfollowing,
        });
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionToken]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <DynamicBox />
      </BrowserRouter>
    </div>
  );
}
