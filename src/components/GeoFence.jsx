import React from "react";
import { location } from "../assets";
import RoadsList from "./RoadsList";
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

const GeoFence = () => {
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
    <div>
      <div className="roads">
        <div className="dashboard">
          <h1>Geofence</h1>
          <p>
            <img src={location} alt="location" />
            <span>Current Location :</span>Mukamira, Nyabihu
          </p>
        </div>
        <div>
          <button onClick={openModal}>Add Road</button>
        </div>
      </div>
      <div className="card-lists">
        <RoadsList />
      </div>
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
              <h1>Add Road</h1>
              <form action="">
                <label htmlFor="roadName">Road Name</label>
                <input
                  type="text"
                  id="roadName"
                  placeholder="Enter road name"
                />

                <label htmlFor="maxSpeed">Max Speed</label>
                <input
                  type="text"
                  id="maxSpeed"
                  placeholder="Enter max speed"
                />

                <label htmlFor="geoFenceGroup">GeoFence Group</label>
                <input
                  type="text"
                  id="geoFenceGroup"
                  placeholder="Enter GeoFence group"
                />
                <label htmlFor="geoFenceGroup">Latitude | Longitude</label>
                <input
                  type="text"
                  id="latitude"
                  placeholder="Latitude | Longitude"
                />
              </form>
              <button>
                <a href="/geofence">Add Road</a>
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default GeoFence;
