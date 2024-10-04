import React, { useState } from "react";
import Modal from "react-modal";
import Geofence from "../ui/Geofence";
import { useGeofence } from "../../contexts/GeofenceContext";

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
  }

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
    <div className="p-8">
      {/* Search and Add New Road section */}
      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Search roads..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3 px-4 py-2 text-black bg-gray-300 rounded-lg"
        />
        <button
          className="px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          onClick={() => setIsRoadModalOpen(true)}
        >
          Add New Road
        </button>
      </div>

      {/* Roads Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-white bg-gray-900 border border-gray-700">
          <thead>
            <tr className="text-lg bg-gray-800">
              <th className="px-6 py-4">Road Name</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoads.map((road) => (
              <React.Fragment key={road.id}>
                <tr className="bg-gray-800 border-b border-gray-700">
                  <td className="px-6 py-4 text-lg">{road.name}</td>
                  <td className="px-6 py-4">
                    <button
                      className="px-4 py-2 mr-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
                      onClick={() => handleAddRoadSegmentSelect(road.id)}
                    >
                      Add Segment
                    </button>
                    <button
                      className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700"
                      onClick={() => toggleSegments(road.id)}
                    >
                      {selectedRoadId === road.id
                        ? "Hide Segments"
                        : "View Segments"}
                    </button>
                  </td>
                </tr>

                {/* Road Segments */}
                {selectedRoadId === road.id && (
                  <tr className="bg-gray-700">
                    <td colSpan="2" className="px-6 py-4">
                      <ul className="space-y-4">
                        {road.segments.length > 0 ? (
                          road.segments.map((segment, index) => (
                            <li
                              key={index}
                              className="px-4 py-2 bg-gray-800 rounded-lg"
                            >
                              Speed Limit: {segment.speedLimit} KM/H |
                              Coordinates: {JSON.stringify(segment.coordinates)}
                            </li>
                          ))
                        ) : (
                          <li className="px-4 py-2">
                            No segments available for this road.
                          </li>
                        )}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding a New Road */}
      <Modal
        isOpen={isRoadModalOpen}
        onRequestClose={() => setIsRoadModalOpen(false)}
        className="max-w-md p-6 mx-auto mt-10 text-white bg-gray-800 rounded-lg"
      >
        <h2 className="mb-4 text-2xl">Add a New Road</h2>
        <input
          type="text"
          value={newRoadName}
          onChange={(e) => setNewRoadName(e.target.value)}
          placeholder="Enter road name"
          className="w-full px-3 py-2 mb-4 text-black rounded-lg"
        />
        <button
          className="px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          onClick={handleAddRoad}
        >
          Add Road
        </button>
      </Modal>

      {/* Modal for Adding a Road Segment */}
      <Modal
        isOpen={isSegmentModalOpen}
        onRequestClose={handleCloseSegmentModal}
        className="w-full h-[90vh] max-w-5xl p-6 mx-auto mt-10 text-white bg-gray-900"
      >
        <Geofence
          road={roads.filter((road) => road.id == selectedRoadId)[0]}
          location="Rwanda, Kicukiro, Nyarugunga"
          onClose={handleCloseSegmentModal}
        />
      </Modal>
    </div>
  );
};

export default RoadsPage;
