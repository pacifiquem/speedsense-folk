import React, { useState } from "react";
import {
  Dashboard,
  Live,
  Geofence,
  Devices,
  Assistant,
} from "../components/app";
import Sidebar from "../components/ui/Sidebar";
import { GeofenceProvider } from "../contexts/GeofenceContext";

const Application = () => {
  const [selectedComponent, setSelectedComponent] = useState("dashboard");

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="home-container">
      <div>
        <Sidebar
          selectedComponent={selectedComponent}
          onSelectComponent={handleComponentChange}
        />
      </div>
      <div className="component">
        {selectedComponent === "dashboard" && <Dashboard />}
        {selectedComponent === "live" && <Live />}
        {selectedComponent === "devices" && <Devices />}
        {selectedComponent === "geofence" && (
          <GeofenceProvider>
            {" "}
            <Geofence />{" "}
          </GeofenceProvider>
        )}
        {selectedComponent === "Assistant" && <Assistant />}
      </div>
    </div>
  );
};

export default Application;
