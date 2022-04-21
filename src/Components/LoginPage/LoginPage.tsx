/* eslint-disable jsx-a11y/anchor-is-valid */

import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { UserLoginInfo } from "../../Model/UserLoginInfo";
import { ActionType } from "../../Redux/action-type";
import jwt_decode from "jwt-decode";
import "./LoginPage.css";

export default function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const onRegisterPageClick = () => {
    history.push("/registerpage");
  };

  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoginInputsInvalid, setIsLoginInputsInvalid] = useState(false);
  let userLoginInfo: UserLoginInfo = {
    userName: userName,
    password: userPassword,
  };

  const onUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const onUserPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserPassword(event.target.value);
  };

  let isUserLoginInputsValid = (): boolean => {
    //
    if (userName === "") {
      setIsLoginInputsInvalid(true);
      return false;
    } else if (userPassword === "") {
      setIsLoginInputsInvalid(true);
      return false;
    }
    return true;
  };

  const loginRequest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/users/login",
        userLoginInfo
      );
      const serverResponse = response.data.usersLoginResultController;
      const serverResponseMessage = response.data.successfulLoginMessage;
      let decodedToken: any = jwt_decode(serverResponse.token);
      let token = "Bearer " + serverResponse.token;
      sessionStorage.setItem("token", token); // add function that count time after some time remove token and logout
      axios.defaults.headers.common["Authorization"] = token;
      alert(serverResponseMessage);
      history.push("/home");
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
        type: ActionType.SetUserTokenStorage,
        payload: token,
      });
      dispatch({
        type: ActionType.SetCurrentUserName,
        payload:decodedToken.userName
        ,
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
    } catch (e: any) {
      alert(e.response.data.error);
    }
  };

  const onLoginClick = () => {
    setIsLoginInputsInvalid(false);
    if (isUserLoginInputsValid()) {
      loginRequest();
    }
    // getFollowedVacatiosChartsData();
  };

  return (
    <Container className="LoginPage border border-5 border border-light rounded-3 shadow-lg p-3 mb-5 bg-body rounded align-items-center">
      <h3 className="login-header">Login:</h3>
      <Form.Group className="mb-3">
        <Form.Label className="user-name-label">User Name: </Form.Label>
        <Form.Control
          type="text"
          className="user-name-input"
          onChange={onUserNameChange}
        />
      </Form.Group>
      <Form.Group></Form.Group>
      <Form.Label className="password-label">Password: </Form.Label>
      <Form.Control
        type="password"
        className="password-input"
        onChange={onUserPasswordChange}
      />
      <br />
      <button className="btn btn-success" onClick={onLoginClick}>
        Login
      </button>
      <br />
      <a href="#" className="register-link" onClick={onRegisterPageClick}>Register now!</a>
      <br />
      {isLoginInputsInvalid && (
        <p className="invalid-message">
          You must make sure that all the fields are filled!
        </p>
      )}
    </Container>
  );
}
