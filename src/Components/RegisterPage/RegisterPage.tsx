import Button from "@restart/ui/esm/Button";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import { UserModel } from "../../Model/User.";
import "./RegisterPage.css";

export default function RegisterPage() {
  const history = useHistory();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");

  const onFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setfirstName(event.target.value);
  };
  const onLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setlastName(event.target.value);
  };
  const onUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setuserName(event.target.value);
  };
  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setpassword(event.target.value);
  };

  const onRegisterClick = async () => {
    let userRegisterInfo: UserModel = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      password: password,
    };
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.post(
        "http://localhost:3001/users/",
        userRegisterInfo
      );
      const serverResponseMessage = response.data;
      alert(serverResponseMessage);
      history.push("/loginpage");
    } catch (e: any) {
      alert(e.response.data.error);
    }
  };

  return (
    <Container className="RegisterPage border border-5 border border-light rounded-3 shadow-lg p-3 mb-5 bg-body rounded align-items-center">
      <h2>Register</h2>
      <br />
      <Form.Group className="mb-3" controlId="formFirstName">
        <Form.Label>First Name: </Form.Label>
        <Form.Control
          type="text"
          placeholder="First Name"
          onChange={onFirstNameChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formLastName">
        <Form.Label>Last Name: </Form.Label>
        <Form.Control
          type="text"
          placeholder="Last Name"
          onChange={onLastNameChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formUserName">
        <Form.Label>User-Name: </Form.Label>
        <Form.Control
          type="text"
          placeholder="User-Name"
          onChange={onUserNameChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password: </Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={onPasswordChange}
        />
      </Form.Group>
      <Button onClick={onRegisterClick} className="btn btn-secondary">
        Register
      </Button>
    </Container>
  );
}
