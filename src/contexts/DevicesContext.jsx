import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "../utils/axios.util";
import showToast from "../utils/errorToasts.util";

const DevicesContext = createContext();

const DevicesProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);

  // Fetch all devices
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get("/devices/all");
        setDevices(response.data);
      } catch (error) {
        showToast("Failed to fetch devices", "error");
        console.error("Failed to fetch devices:", error);
      }
    };
    fetchDevices();
  }, []);

  // Add a new device
  const addDevice = async (deviceData) => {
    try {
      const response = await axios.post("/devices/new", {
        owner: deviceData.owner,
        installedIn: deviceData.installedIn,
      });
      setDevices([...devices, response.data]);
      showToast("Device added successfully", "success");
    } catch (error) {
      showToast("Failed to add device", "error");
      console.error("Failed to add device:", error);
    }
  };

  return (
    <DevicesContext.Provider value={{ devices, addDevice }}>
      {children}
    </DevicesContext.Provider>
  );
};

const useDevices = () => useContext(DevicesContext);

export { useDevices, DevicesProvider };
