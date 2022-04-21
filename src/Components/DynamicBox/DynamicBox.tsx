import React from "react";
import CardsContainer from "../CardsContainer/CardsContainer";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import AddNewVacation from "../AddNewVacation/AddNewVacation";
// import EditCardModal from "../EditCard/EditCardModal";


export default function DynamicBox() {
  const location = useLocation();
  return (
    <div className="DynamicBox">
      <Switch location={location} key={location.key}>
        <Route path="/loginpage" component={LoginPage} exact />
        <Route path="/home" component={CardsContainer} exact />
        <Route path="/registerpage" component={RegisterPage} exact />
        <Route path="/addnewvacation" component={AddNewVacation} exact />
        {/* <Route path="/editvacation" component={EditCardModal} exact /> */}
        <Redirect from="/" to="/home" exact />
      </Switch>
    </div>
  );
}
