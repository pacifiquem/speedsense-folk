import React, { useState } from "react";
import { AlertTriangle, Gauge, Wifi, WifiOff } from "lucide-react";
import { useViolations } from "../../contexts/DashboardContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { violations, dashboardStats, loading } = useViolations();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const navigate = useNavigate();

  if (loading) {
    return <div className="min-h-screen p-8">Loading...</div>;
  }

  // Pagination logic
  const totalPages = Math.ceil(violations.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentViolations = violations.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen p-8 text-gray-900 bg-gray-100">
      <h1 className="mb-8 text-3xl font-bold">Speed Monitoring Dashboard</h1>
      <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between pb-2">
            <h2 className="text-sm font-medium">Total Devices Monitored</h2>
            <Wifi className="w-4 h-4 text-gray-500" />
          </div>
          <div className="text-2xl font-bold">
            {dashboardStats.totalDevices || 0}
          </div>
          <p className="text-xs text-gray-500">
            +{dashboardStats.devicesChange || 0} from last month
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between pb-2">
            <h2 className="text-sm font-medium">Total Speed Violations</h2>
            <Gauge className="w-4 h-4 text-gray-500" />
          </div>
          <div className="text-2xl font-bold">
            {dashboardStats.totalViolations || 0}
          </div>
          <p className="text-xs text-gray-500">
            +{dashboardStats.violationsChange || 0} from yesterday
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between pb-2">
            <h2 className="text-sm font-medium">Total Device Disconnections</h2>
            <WifiOff className="w-4 h-4 text-gray-500" />
          </div>
          <div className="text-2xl font-bold">
            {dashboardStats.totalDisconnections || 0}
          </div>
          <p className="text-xs text-gray-500">
            {dashboardStats.disconnectionsChange || 0} from last week
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between pb-2">
            <h2 className="text-sm font-medium">Active Alerts</h2>
            <AlertTriangle className="w-4 h-4 text-gray-500" />
          </div>
          <div className="text-2xl font-bold">
            {dashboardStats.activeAlerts || 0}
          </div>
          <p className="text-xs text-gray-500">Requires immediate attention</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Recent Violations</h2>
        </div>
        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="text-sm font-medium text-left text-gray-500">
                <th className="pb-3">Time</th>
                <th className="pb-3">Device Owner</th>
                <th className="pb-3">Violation Type</th>
                <th className="pb-3">Road Segment</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentViolations.length > 0 ? (
                currentViolations.map((violation) => (
                  <tr key={violation.id} className="border-t border-gray-200">
                    <td className="py-3">
                      {new Date(violation.time).toLocaleString()}
                    </td>
                    <td className="py-3">{violation.device.owner}</td>
                    <td className="py-3">{violation.violationType}</td>
                    <td className="py-3">{violation.roadSegment.name}</td>
                    <td className="py-3">
                      <button
                        className="px-3 py-1 text-sm text-gray-700 transition-colors bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => navigate("/live")}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-3 text-center text-gray-500">
                    No violations found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-700"
              }`}
            >
              Previous
            </button>
            <span className="text-sm font-medium text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-700"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
