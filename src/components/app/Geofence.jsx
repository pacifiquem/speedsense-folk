import React, { useState } from "react";
import Modal from "react-modal";
import Geofence from "../ui/Geofence";
import { useGeofence } from "../../contexts/GeofenceContext";
import { X } from "lucide-react";

Modal.setAppElement("#root");

const RoadsPage = () => {
  const { roads, addRoad } = useGeofence();
  const [newRoadName, setNewRoadName] = useState("");
  const [selectedRoadId, setSelectedRoadId] = useState(null);
  const [isRoadModalOpen, setIsRoadModalOpen] = useState(false);
  const [isSegmentModalOpen, setIsSegmentModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddRoad = () => {
    addRoad(newRoadName);
    setIsRoadModalOpen(false);
  };

  const handleAddRoadSegmentSelect = (roadId) => {
    setSelectedRoadId(roadId);
    setIsSegmentModalOpen(true);
  };

  const toggleSegments = (roadId) => {
    setSelectedRoadId(selectedRoadId === roadId ? null : roadId);
  };

  const handleCloseSegmentModal = () => {
    setIsSegmentModalOpen(false);
  };

  const filteredRoads = roads.filter((road) =>
    road.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full p-6 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Geofence Management</h1>
      {/* Search and Add New Road section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search roads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          onClick={() => setIsRoadModalOpen(true)}
        >
          Add New Road
        </button>
      </div>

      {/* Roads Table */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left border-b">No.</th>
            <th className="px-4 py-2 text-left border-b">Road Name</th>
            <th className="px-4 py-2 text-left border-b">
              Average Speed Limit
            </th>
            <th className="px-4 py-2 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRoads.map((road) => (
            <React.Fragment key={road.id}>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{road.id}</td>
                <td className="px-4 py-2 border-b">{road.name}</td>
                <td className="px-4 py-2 border-b">
                  {road.segments && road.segments.length > 0
                    ? road.segments.reduce(
                        (acc, segment) => acc + segment.speedLimit,
                        0
                      ) / road.segments.length
                    : 0}{" "}
                  KM/Hr
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    className="px-4 py-2 mr-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    onClick={() => handleAddRoadSegmentSelect(road.id)}
                  >
                    Add Segment
                  </button>
                  <button
                    className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    onClick={() => toggleSegments(road.id)}
                  >
                    {selectedRoadId === road.id
                      ? "Hide Segments"
                      : "View Segments"}
                  </button>
                </td>
              </tr>

              {/* Road Segments Subtable */}
              {selectedRoadId === road.id && (
                <tr>
                  <td colSpan="4" className="px-6 py-4 bg-gray-50">
                    <table className="min-w-full bg-white border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-4 py-2 text-left border-b">
                            Segment No.
                          </th>
                          <th className="px-4 py-2 text-left border-b">
                            Segment Name
                          </th>
                          <th className="px-4 py-2 text-left border-b">
                            Speed Limit (KM/H)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {road.segments && road.segments.length > 0 ? (
                          road.segments.map((segment, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-4 py-2 border-b">
                                {index + 1}
                              </td>
                              <td className="px-4 py-2 border-b">
                                {segment.name}
                              </td>
                              <td className="px-4 py-2 border-b">
                                {segment.speedLimit} KM/Hr
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="3"
                              className="px-4 py-2 text-center text-gray-500"
                            >
                              No segments available for this road.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding a New Road */}
      <Modal
        isOpen={isRoadModalOpen}
        onRequestClose={() => setIsRoadModalOpen(false)}
        className="p-6 mx-auto mt-10 bg-white rounded-lg shadow-xl w-96"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Add New Road</h2>
          <button
            onClick={() => setIsRoadModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <input
          type="text"
          value={newRoadName}
          onChange={(e) => setNewRoadName(e.target.value)}
          placeholder="Enter road name"
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={handleAddRoad}
        >
          Add Road
        </button>
      </Modal>

      {/* Modal for Adding a Road Segment */}
      <Modal
        isOpen={isSegmentModalOpen}
        onRequestClose={handleCloseSegmentModal}
        className="w-full h-[90vh] max-w-5xl p-6 mx-auto mt-10 bg-gray-900 text-white rounded-lg shadow-xl"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <Geofence
          road={roads.find((road) => road.id === selectedRoadId)}
          location="Rwanda, Kicukiro, Nyarugunga"
          onClose={handleCloseSegmentModal}
        />
      </Modal>
    </div>
  );
};

export default RoadsPage;
