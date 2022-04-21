import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Card, CloseButton, Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { VacationCardModel } from "../../Model/Vacation-Card";
import { ActionType } from "../../Redux/action-type";
import { AppState } from "../../Redux/app-state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./VacationCard.css";
import { ChartsData } from "../../Model/ChartsData";

export default function VacationCard(props: VacationCardModel) {
  const dispatch = useDispatch();
  const isUserAdmin = useSelector((state: AppState) => state.isUserTypeAdmin);
  const isUserOnline = useSelector((state: AppState) => state.isUserOnline);
  const vacationsArray = useSelector((state: AppState) => state.vacations);
  const vacationsFollowersDataArray = useSelector(
    (state: AppState) => state.vacationsChartsData
  );
  const [vacationFollowersNumber, setVacationFollowersNumber] = useState(0);
  let data: ChartsData = {
    title: props.title,
    amount: 0,
    vacationId: props.vacationId,
  };
  const [vacationFollowersData, setVacationFollowersData] = useState(data);



  const isFollow = () => {
    for (let index = 0; index < vacationsArray.length; index++) {
      if (
        props.vacationId === vacationsArray[index].vacationId &&
        vacationsArray[index].isFollowByUser === true
      ) {

        return true;
      } else if (
        props.vacationId === vacationsArray[index].vacationId &&
        vacationsArray[index].isFollowByUser === false
      )
        return false;
    }
  };
  useEffect(() => {
    for (let index = 0; index < vacationsFollowersDataArray.length; index++) {
      if (vacationsFollowersDataArray[index].vacationId === props.vacationId) {
        let followersAmount = vacationsFollowersDataArray[index].amount;
        setVacationFollowersNumber(followersAmount);
        setVacationFollowersData(vacationsFollowersDataArray[index]);
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vacationsFollowersDataArray]);

  const onEditClick = () => {
    dispatch({
      type: ActionType.ChangeToEditMode,
      payload: props.vacationId,
    });
  };

  const onFollowCahnge = async (event: ChangeEvent<HTMLInputElement>) => {
    let vacationId = props.vacationId;
    let vacationTitle = props.title;
    if (isFollow() !== true) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = await axios.post(
          "http://localhost:3001/followVacations/",
          { vacationId, vacationTitle }
        );
        dispatch({
          type: ActionType.SortCardsByFollowing,
          payload: {
            vacationId: props.vacationId,
            isCheckd: true,
          },
        });
        console.log(vacationFollowersData)
        dispatch({
          type: ActionType.FolllowVacation,
          payload: vacationFollowersData,
        });
      } catch (e: any) {
        alert(e.response.data.error);
      }
    } else {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = await axios.delete(
          `http://localhost:3001/followVacations/${vacationId}`
        );
        dispatch({
          type: ActionType.SortCardsByFollowing,
          payload: {
            vacationId: props.vacationId,
            isCheckd: false,
          },
        });
        console.log(vacationFollowersData)
        dispatch({
          type: ActionType.UnfollowVacation,
          payload: vacationFollowersData.vacationId,
        });
      } catch (e: any) {
        alert(e.response.data.error);
      }
    }
  };

  const onDeleteCardClick = async () => {
    let vacationId = props.vacationId;
    try {
      const response = await axios.delete(
        `http://localhost:3001/vacations/${vacationId}`
      );
      const serverResponseMessage = response.data;
      alert(serverResponseMessage);
      dispatch({
        type: ActionType.DeleteVacationCard,
        payload: vacationId,
      });
    } catch (e: any) {
      alert(e.response.data.error);
    }
  };
  const onSaveClick = async () => {
    let editedVacationCardObject: VacationCardModel = {
      title: vacationTitle,
      destination: vacationDestination,
      description: vacationDescription,
      price: vacationPrice,
      startDate: vacationStartDate,
      endDate: vacationEndDate,
      image: newImage,
      vacationId: props.vacationId,
    };
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.put(
        `http://localhost:3001/vacations/`,
        editedVacationCardObject
      );
      const serverResponseMessage = response.data;
      alert(serverResponseMessage);
      dispatch({
        type: ActionType.SavaCardAfterEdit,
        payload: editedVacationCardObject,
      });
    } catch (e: any) {
      alert(e.response.data.error);
    }
  };
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [newImage, setNewImage] = useState("");

  const [vacationTitle, setVacationTitle] = useState(props.title);
  const [vacationDestination, SetVacationDestination] = useState(
    props.destination
  );
  const [vacationDescription, setVacationDescription] = useState(
    props.description
  );
  const [vacationPrice, setVacationPrice] = useState(props.price);
  const [vacationStartDate, setVacationStartDate] = useState(props.startDate);
  const [vacationEndDate, setVacationEndDate] = useState(props.endDate);

  const onVacationTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVacationTitle(event.target.value);
  };
  const onVacationDestinationChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    SetVacationDestination(event.target.value);
  };
  const onVacationDescriptionChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setVacationDescription(event.target.value);
  };
  const onVacationPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVacationPrice(+event.target.value);
  };
  const onVacationStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVacationStartDate(event.target.value);
  };
  const onVacationEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVacationEndDate(event.target.value);
  };

  const revrseDateFormat = (date: string): string => {
    date = date.split("-").reverse().join("-");
    return date;
  };

  let saveFile = (e: React.ChangeEvent<any>) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    setNewImage(`http://127.0.0.1:3001/${e.target.files[0].name}`);
  };

  const uploadFile = async () => {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    setNewImage(`http://127.0.0.1:3001/${fileName}`);
    try {
      const res = await axios.post(
        "http://localhost:3001/files/upload",
        formData
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="VacationCard card text-dark bg-light">
      {props.isOnEditMode === false && (
        <Card.Body>
          {isUserAdmin && isUserOnline && (
            <CloseButton
              aria-label="Hide"
              className="deleteCardBtn"
              onClick={onDeleteCardClick}
            />
          )}
          {isUserOnline && !isUserAdmin && isFollow() === false && (
            <>
              <label className="unchecked-follow-box">
                +Follow{" "}
                <input
                  type="checkbox"
                  onChange={onFollowCahnge}
                  onClick={isFollow}
                  hidden
                  checked={false}
                />
              </label>
              <div className="followers-count-icon-div">
                <FontAwesomeIcon
                  icon={faStar}
                  size="3x"
                  className="followers-count-icon"
                ></FontAwesomeIcon>
                <div className="followers-count-icon-value">
                  {vacationFollowersNumber}
                </div>
              </div>
              <br />
            </>
          )}
          {isUserOnline && !isUserAdmin && isFollow() === true && (
            <>
              <label className="checked-follow-box">
                Following
                <input
                  type="checkbox"
                  onChange={onFollowCahnge}
                  onClick={isFollow}
                  hidden
                  checked
                />
              </label>
              <div className="followers-count-icon-div">
                <FontAwesomeIcon
                  icon={faStar}
                  size="3x"
                  className="followers-count-icon"
                ></FontAwesomeIcon>
                <div className="followers-count-icon-value">
                  {vacationFollowersNumber}
                </div>
              </div>
              <br />
            </>
          )}

          {isUserOnline && isUserAdmin && (
            <button
              className="edit-btn btn btn-outline-dark"
              onClick={onEditClick}
            >
              EDIT
            </button>
          )}
          <Card.Img className="card-img-top" variant="top" src={props.image} />
          <Card.Title>{props.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {props.destination}
          </Card.Subtitle>
          <Accordion>
            <Accordion.Header>Description</Accordion.Header>
            <Accordion.Body>{props.description}</Accordion.Body>
            <Accordion.Body>
              {revrseDateFormat(props.startDate)} -{" "}
              {revrseDateFormat(props.endDate)}
            </Accordion.Body>
          </Accordion>
          <Card.Text>{props.price}$</Card.Text>
        </Card.Body>
      )}
      {props.isOnEditMode === true && (
        <Card.Body>
          <Card.Title>Edit Mode:</Card.Title>
          <div className="title-div">
            <label className="title-label">
              Title:
              <input
                type="text"
                value={vacationTitle}
                onChange={onVacationTitleChange}
                className="title-input"
              />
            </label>
          </div>
          <div className="dist-div">
            <label className="dist-label">
              Destination:
              <input
                type="text"
                value={vacationDestination}
                onChange={onVacationDestinationChange}
                className="dist-input"
              />
            </label>
          </div>
          <div className="desc-div">
            <label className="desc-label">
              Description:
              <textarea
                value={vacationDescription}
                onChange={onVacationDescriptionChange}
                className="desc-input"
              />
            </label>
          </div>

          <label className="start-date-label">
            Start-Date:
            <input
              type="date"
              value={vacationStartDate}
              onChange={onVacationStartDateChange}
              className="start-date-input"
            />
          </label>
          <label className="end-date-label">
            End-Date:
            <input
              type="date"
              value={vacationEndDate}
              onChange={onVacationEndDateChange}
              className="end-date-input"
            />
          </label>
          <div className="price">
            <label className="price-label">
              Price:
              <input
                className="price-input"
                type="number"
                value={vacationPrice}
                onChange={onVacationPriceChange}
              />
            </label>
          </div>
          <div>
            <label className="choose-file-label">
              Image-file:
              <input
                className="choose-file-input"
                type="file"
                onChange={saveFile}
              />
            </label>
          </div>

          <input
            className="submit-image-btn btn btn-primary"
            type="submit"
            onClick={uploadFile}
          />
          <button
            type="button"
            className="save-image-btn btn btn-success"
            onClick={onSaveClick}
          >
            Save
          </button>
        </Card.Body>
      )}
    </div>
  );
}
