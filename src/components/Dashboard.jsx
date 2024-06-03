import React from "react";
import { location, bar1, bar2, bar3, card1, card2, card3 } from "../assets";
import Table from "./Table";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const columns = [
  { key: "locationName", title: "Location Name" },
  { key: "locationId", title: "Location ID" },
  { key: "totalOverspeedingCases", title: "Total Overspeeding Cases" },
  { key: "totalAccidents", title: "Total Accidents" },
];

const data = [
  {
    locationName: "Downtown",
    locationId: "DT001",
    totalOverspeedingCases: 12,
    totalAccidents: 5,
  },
  {
    locationName: "Highway",
    locationId: "HWY002",
    totalOverspeedingCases: 8,
    totalAccidents: 3,
  },
  {
    locationName: "Suburb",
    locationId: "SUB003",
    totalOverspeedingCases: 5,
    totalAccidents: 2,
  },
  {
    locationName: "Industrial Area",
    locationId: "IND004",
    totalOverspeedingCases: 7,
    totalAccidents: 4,
  },
  {
    locationName: "Downtown",
    locationId: "DT001",
    totalOverspeedingCases: 12,
    totalAccidents: 5,
  },
  {
    locationName: "Suburb",
    locationId: "SUB003",
    totalOverspeedingCases: 5,
    totalAccidents: 2,
  },
  {
    locationName: "Residential Zone",
    locationId: "RES005",
    totalOverspeedingCases: 3,
    totalAccidents: 1,
  },
  {
    locationName: "Suburb",
    locationId: "SUB003",
    totalOverspeedingCases: 5,
    totalAccidents: 2,
  },
  {
    locationName: "Industrial Area",
    locationId: "IND004",
    totalOverspeedingCases: 7,
    totalAccidents: 4,
  },
  {
    locationName: "Mukamira - Nyabihu",
    locationId: "3444",
    totalOverspeedingCases: 1,
    totalAccidents: 0,
  },
];

const Dashboard = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div
      className="dashboard"
      style={{ fontFamily: "Inter", fontSize: "16px" }}
    >
      <div className="roads">
        <div className="dashboard">
          <h1>Dashboard</h1>
          <p>
            <img src={location} alt="location" />
            <span>Current Location :</span>Mukamira, Nyabihu
          </p>
        </div>
        <div>
          <button onClick={openModal}>Add New Device</button>
        </div>
      </div>
      <div className="cards">
        <div className="card">
          <div>
            <div className="card-text">
              <img src={bar1} alt="icon" />
              <div>
                <p>Over-speeding Cases</p>
                <h1>20</h1>
              </div>
            </div>
            <img src={card1} alt="icon" />
          </div>
          <p className="text">In the past hour</p>
        </div>
        <div className="card">
          <div>
            <div className="card-text">
              <img src={bar2} alt="icon" />
              <div>
                <p>Devices Disconnected</p>
                <h1>0</h1>
              </div>
            </div>
            <img src={card2} alt="icon" />
          </div>
          <p className="text">In the past hour</p>
        </div>
        <div className="card">
          <div>
            <div className="card-text">
              <img src={bar3} alt="icon" />
              <div>
                <p>Accidents</p>
                <h1>2</h1>
              </div>
            </div>
            <img src={card3} alt="icon" />
          </div>
          <p className="text">In the past hour</p>
        </div>
      </div>
      <h4 style={{ margin: "40px 0 20px 0" }}>Summary of the current area</h4>
      <Table columns={columns} data={data} />
      <div className="add-road-model">
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button
            onClick={closeModal}
            style={{
              padding: "5px 10px",
              fontSize: "16px",
              fontWeight: "lighter",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              marginLeft: "90%",
            }}
          >
            X
          </button>
          <div
            className="login-container"
            style={{
              marginTop: "-70px",
            }}
          >
            <div className="login-layout">
              <h1>Add New Device</h1>
              <form action="">
                <label htmlFor="roadName">Plate Number</label>
                <input
                  type="text"
                  id="roadName"
                  placeholder="Enter plate number"
                />

                <label htmlFor="maxSpeed">Owner</label>
                <input type="text" id="maxSpeed" placeholder="Enter Owner" />

                <label htmlFor="geoFenceGroup">License Number</label>
                <input
                  type="text"
                  id="licenseNumber"
                  placeholder="Enter License Number"
                />
                <label htmlFor="geoFenceGroup">Device ID</label>
                <input
                  type="text"
                  id="deviceId"
                  placeholder="Enter Device ID"
                />
              </form>
              <button>
                <a href="/geofence">Add Device</a>
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
