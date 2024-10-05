"use client";

import { useState } from "react";
import { PlusCircle, X } from "lucide-react";
import { useDevices } from "../../contexts/DevicesContext";

export default function DeviceManagement() {
  const { devices, addDevice } = useDevices();
  const [searchTerm, setSearchTerm] = useState("");
  const [newDevice, setNewDevice] = useState({
    owner: "",
    installedIn: { vehicleType: "", vehiclePlate: "" },
  });
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);

  const filteredDevices = devices.filter(
    (device) =>
      device.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.installedIn.vehicleType
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      device.installedIn.vehiclePlate
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const handleAddDevice = () => {
    addDevice(newDevice);
    setNewDevice({
      owner: "",
      installedIn: { vehicleType: "", vehiclePlate: "" },
      status: "up",
    });
    setIsAddDeviceOpen(false);
  };

  return (
    <div className="w-full h-full p-6 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Device Management</h1>
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search devices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => setIsAddDeviceOpen(true)}
          className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <PlusCircle className="inline-block w-4 h-4 mr-2" /> Add Device
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left border-b">ID</th>
            <th className="px-4 py-2 text-left border-b">Owner</th>
            <th className="px-4 py-2 text-left border-b">Vehicle Type</th>
            <th className="px-4 py-2 text-left border-b">Vehicle Plate</th>
            <th className="px-4 py-2 text-left border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredDevices.map((device) => (
            <tr key={device.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{device.id}</td>
              <td className="px-4 py-2 border-b">{device.owner}</td>
              <td className="px-4 py-2 border-b">
                {device.installedIn.vehicleType}
              </td>
              <td className="px-4 py-2 border-b">
                {device.installedIn.vehiclePlate}
              </td>
              <td className="px-4 py-2 border-b">{device.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isAddDeviceOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg w-96">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Add New Device</h2>
              <button
                onClick={() => setIsAddDeviceOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="owner"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Owner
                </label>
                <input
                  id="owner"
                  type="text"
                  value={newDevice.owner}
                  onChange={(e) =>
                    setNewDevice({ ...newDevice, owner: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="vehicleType"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Vehicle Type
                </label>
                <input
                  id="vehicleType"
                  type="text"
                  value={newDevice.installedIn.vehicleType}
                  onChange={(e) =>
                    setNewDevice({
                      ...newDevice,
                      installedIn: {
                        ...newDevice.installedIn,
                        vehicleType: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="vehiclePlate"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Vehicle Plate
                </label>
                <input
                  id="vehiclePlate"
                  type="text"
                  value={newDevice.installedIn.vehiclePlate}
                  onChange={(e) =>
                    setNewDevice({
                      ...newDevice,
                      installedIn: {
                        ...newDevice.installedIn,
                        vehiclePlate: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              onClick={handleAddDevice}
              className="w-full px-4 py-2 mt-6 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Device
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
