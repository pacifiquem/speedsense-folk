import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "../utils/axios.util";
import showToast from "../utils/errorToasts.util";

const ViolationsContext = createContext();

const ViolationsProvider = ({ children }) => {
  const [violations, setViolations] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch all violations (optionally filtered by type)
  useEffect(() => {
    const fetchViolations = async () => {
      try {
        const response = await axios.get("/violations");
        setViolations(response.data);
      } catch (error) {
        showToast("Failed to fetch violations", "error");
        console.error("Failed to fetch violations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchViolations();
  }, []);

  // Fetch dashboard stats
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await axios.get("/violations/dashboard/stats");
        setDashboardStats(response.data);
      } catch (error) {
        showToast("Failed to fetch dashboard stats", "error");
        console.error("Failed to fetch dashboard stats:", error);
      }
    };
    fetchDashboardStats();
  }, []);

  // Add a new violation
  const addViolation = async (violationData) => {
    try {
      const response = await axios.post("/violations", violationData);
      setViolations([...violations, response.data.violation]);
      showToast("Violation added successfully", "success");
    } catch (error) {
      showToast("Failed to add violation", "error");
      console.error("Failed to add violation:", error);
    }
  };

  // Update a violation by ID
  const updateViolation = async (id, updatedData) => {
    try {
      const response = await axios.put(`/violations/${id}`, updatedData);
      setViolations(
        violations.map((violation) =>
          violation.id === id ? response.data.violation : violation
        )
      );
      showToast("Violation updated successfully", "success");
    } catch (error) {
      showToast("Failed to update violation", "error");
      console.error("Failed to update violation:", error);
    }
  };

  // Delete a violation by ID
  const deleteViolation = async (id) => {
    try {
      await axios.delete(`/violations/${id}`);
      setViolations(violations.filter((violation) => violation.id !== id));
      showToast("Violation deleted successfully", "success");
    } catch (error) {
      showToast("Failed to delete violation", "error");
      console.error("Failed to delete violation:", error);
    }
  };

  return (
    <ViolationsContext.Provider
      value={{
        violations,
        dashboardStats,
        addViolation,
        updateViolation,
        deleteViolation,
        loading,
      }}
    >
      {children}
    </ViolationsContext.Provider>
  );
};

const useViolations = () => useContext(ViolationsContext);

export { useViolations, ViolationsProvider };
