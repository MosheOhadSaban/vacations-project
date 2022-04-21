import React, { ChangeEvent, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { ActionType } from "../../Redux/action-type";
import { AppState } from "../../Redux/app-state";

// import Charts from "../Charts/Charts";
import "./Header.css";

export default function Header() {
  const isUserAdmin = useSelector((state: AppState) => state.isUserTypeAdmin);
  const isUserIsOnline = useSelector((state: AppState) => state.isUserOnline);
  const isUserOnRegisterOrLoginPage = useSelector(
    (state: AppState) => state.isOnLoginOrRegisterPage
  );
  const userName = useSelector((state: AppState) => state.currentUserName);
  const history = useHistory();
  const dispatch = useDispatch();
  const [isChartsSwitchUnchecked, setIsChartsSwitchUnchacked] = useState(false);
  const onChartsSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChartsSwitchUnchacked(event.target.checked);
    dispatch({
      type: ActionType.ChangeChartSwitchStatus,
      payload: isChartsSwitchUnchecked,
    });
  };

  const onLoginRegisterClick = () => {
    dispatch({ type: ActionType.RemoveRegisterLoginAcsess, payload: true });
    history.push("/loginPage");
  };
  const onHomeCliclk = () => {
    dispatch({ type: ActionType.RemoveRegisterLoginAcsess, payload: false });
    history.push("/home");
  };
  const addNewCardPage = () => {
    history.push("/addnewvacation");
  };
  const onUserLogout = () => {
    history.push("/home");
    window.location.reload();
    window.sessionStorage.clear();
  };

  return (
    <Container fluid className="Header ">
      <br />
      <Navbar expand="lg" variant="light" bg="light" fixed="top">
        <h3 className="title">Last Minutes Deals</h3>
        <Nav className="me-auto">
          <Nav.Link
            className="home-link border border-dark rounded"
            href="#home"
            onClick={onHomeCliclk}
          >
            Home
          </Nav.Link>
          {!isUserOnRegisterOrLoginPage && !isUserIsOnline && (
            <Nav.Link
              className="login-register-link border border-dark rounded"
              href="#features"
              onClick={onLoginRegisterClick}
            >
              Login/Register
            </Nav.Link>
          )}
          {isUserIsOnline && (
            <Nav.Link
              className="logout-link border border-dark rounded"
              href="#features"
              onClick={onUserLogout}
            >
              Logout
            </Nav.Link>
          )}
          {isUserAdmin && (
            <>
              <Nav.Link
                className=" add-vacation-link border border-dark rounded"
                href="#features"
                onClick={addNewCardPage}
              >
                Add New Vacation
              </Nav.Link>
              <Navbar.Text className="charts-switch-title">
                Charts-Switch
              </Navbar.Text>
              <div className="charts-switch custom-control custom-switch custom-switch-lg ">
                <label className="switch">
                  <input type="checkbox" onChange={onChartsSwitchChange} />
                  <span className="slider round"></span>
                </label>
              </div>
            </>
          )}
          {isUserIsOnline && (
            
            <Navbar.Text className="user-status">
              Signed in as: <a href="#login">{userName}</a>
            </Navbar.Text>
         
          )}
        </Nav>
      </Navbar>
    </Container>
  );
}
