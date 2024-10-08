import React from "react";
import { useAuth } from "../../contexts/AuthContext";

import {
  DivideCircleIcon,
  LayoutDashboardIcon,
  MapIcon,
  VideoIcon,
  GaugeIcon,
  ChartAreaIcon,
  MessageCircle,
} from "lucide-react";

const Sidebar = ({ selectedComponent, onSelectComponent }) => {
  const { user } = useAuth();

  return (
    <>
      <div className="h-[100vh] bg-black text-white border-r border-gray-800 p-4">
        <div className="flex items-center mb-12 space-x-2">
          <GaugeIcon className="w-8 h-8" />
          <span className="text-xl font-bold">SpeedSense</span>
        </div>

        <div className="side-links-container">
          <ul className="space-y-4">
            <li
              className={`flex items-center space-x-2 cursor-pointer hover:text-gray-300 ${
                selectedComponent === "dashboard" ? "text-gray-300" : ""
              }`}
              onClick={() => onSelectComponent("dashboard")}
            >
              <LayoutDashboardIcon className="w-5 h-5" />
              <span>Dashboard</span>
            </li>
            <li
              className={`flex items-center space-x-2 cursor-pointer hover:text-gray-300 ${
                selectedComponent === "geofence" ? "text-gray-300" : ""
              }`}
              onClick={() => onSelectComponent("geofence")}
            >
              <MapIcon className="w-5 h-5" />
              <span>Geofence</span>
            </li>
            <li
              className={`flex items-center space-x-2 cursor-pointer hover:text-gray-300 ${
                selectedComponent === "devices" ? "text-gray-300" : ""
              }`}
              onClick={() => onSelectComponent("devices")}
            >
              <DivideCircleIcon className="w-5 h-5" />
              <span>Devices</span>
            </li>
            <li
              className={`flex items-center space-x-2 cursor-pointer hover:text-gray-300 ${
                selectedComponent === "live" ? "text-gray-300" : ""
              }`}
              onClick={() => onSelectComponent("live")}
            >
              <VideoIcon className="w-5 h-5" />
              <span>Live</span>
            </li>
          </ul>
        </div>

        <div className="absolute bottom-8">
          <div className="text-center text-gray-400">
            <h3>{user?.email || "admin@rnp.gov.rw"}</h3>
            <p className="text-sm">{user?.name || "CP John Bosco Kabera"}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
