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
import { DevicesProvider } from "../contexts/DevicesContext";
import { ViolationsProvider } from "../contexts/DashboardContext";

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
      <div className="w-full h-full">
        {selectedComponent === "dashboard" && (
          <ViolationsProvider>
            <Dashboard />
          </ViolationsProvider>
        )}
        {selectedComponent === "live" && <Live />}
        {selectedComponent === "devices" && (
          <DevicesProvider>
            <Devices />
          </DevicesProvider>
        )}
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
