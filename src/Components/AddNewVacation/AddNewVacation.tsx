import Modal from "react-bootstrap/Modal";
import React, { ChangeEvent, useState } from "react";
import { ModalTitle, ModalBody, Button } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import "./AddNewVacation.css";
import { useHistory } from "react-router-dom";
import { VacationCardModel } from "../../Model/Vacation-Card";
import axios from "axios";
// import { useDispatch } from "react-redux";
// import { ActionType } from "../../Redux/action-type";

export default function AddNewVacation(props: VacationCardModel) {
  // const dispatch = useDispatch();
  const history = useHistory();
  const onCancelCliclk = () => {
    history.push("/home");
  };

  const [vacationTitle, setVacationTitle] = useState("");
  const [vacationDestination, SetVacationDestination] = useState("");
  const [vacationDescription, setVacationDescription] = useState("");
  const [vacationPrice, setVacationPrice] = useState(0);
  const [vacationStartDate, setVacationStartDate] = useState("");
  const [vacationEndDate, setVacationEndDate] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [newImage, setNewImage] = useState("");

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
      const response = await axios.post(
        "http://localhost:3001/files/upload",
        formData
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const onAddVacationClick = async () => {
    let vacationData: VacationCardModel = {
      title: vacationTitle,
      destination: vacationDestination,
      description: vacationDescription,
      price: vacationPrice,
      startDate: revrseDateFormat(vacationStartDate),
      endDate: revrseDateFormat(vacationEndDate),
      image: newImage,
      isFollowByUser: false,
      isOnEditMode: false,
    };
    if (
      vacationData.title === "" ||
      vacationData.destination === "" ||
      vacationData.description === "" ||
      vacationData.price === null ||
      vacationData.startDate === "" ||
      vacationData.endDate === ""
    ) {
      alert("Please make sure the fields contain content");
    } else {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = await axios.post("http://localhost:3001/vacations/", {
          vacationData,
        });
        const serverResponseMessage = response.data;
        alert(serverResponseMessage);
        history.push("/home");
      } catch (e: any) {
        alert(e.response.data.error);
      }
    }
  };

  return (
    <div className="AddNewVacation">
      <Modal show={true}>
        <ModalHeader>
          <ModalTitle as="h4">
            Please Enter New Vacation Details To Complete The Action
          </ModalTitle>
          <Button variant="danger" onClick={onCancelCliclk}>
            X
          </Button>
        </ModalHeader>
        <ModalBody>
          <label className="title-label">Title</label>
          <input
            className="title-input"
            type="text"
            placeholder="Title"
            value={props.title}
            onChange={onVacationTitleChange}
          />

          <br />
          <br />
          <label className="dest-label">Destination</label>
          <input
            className="dest-input"
            type="text"
            placeholder="Destination"
            value={props.destination}
            onChange={onVacationDestinationChange}
          />
          <br />
          <br />
          <label className="desc-label">Description</label>
          <textarea
            className="desc-input"
            placeholder="Description"
            value={props.description}
            onChange={onVacationDescriptionChange}
          />
          <br />
          <br />
          <label className="price-label">Price</label>
          <input
            className="price-input"
            type="number"
            placeholder="Price"
            value={props.price}
            onChange={onVacationPriceChange}
          />
          <br />
          <br />
          <label className="start-date-label">Start-Date:</label>
          <input
            className="start-date-input"
            type="date"
            placeholder="Start-Date"
            value={props.startDate}
            onChange={onVacationStartDateChange}
          />
          <br />
          <br />
          <label className="end-date-label">End-Date:</label>
          <input
            className="end-date-input"
            type="date"
            placeholder="End-Date"
            value={props.endDate}
            onChange={onVacationEndDateChange}
          />
          <br />
          <br />
          <label className="choose-file-label">Imgae file</label>
          <input
            className="choose-file-input"
            type="file"
            onChange={saveFile}
            id="image"
            value={props.image}
          />
          <br />
          <input
            className="submit-image-btn btn btn-primary"
            type="submit"
            onClick={uploadFile}
          />

          <Button className="add-vacation-btn" variant="secondary" onClick={onAddVacationClick}>
            Add
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
}
