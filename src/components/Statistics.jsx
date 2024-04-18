import React from "react";
import "chart.js/auto";
import { location } from "../assets";
import { Line, Bar, Pie } from "react-chartjs-2";
import Table from "./Table";

const dataAccidentsByHour = {
  labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
  datasets: [
    {
      label: "Accidents By Hour",
      data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 10)),
      borderColor: "rgb(31,126,161)",
      backgroundColor: "rgb(78,203,113)",
    },
  ],
};

const dataAccidentsByLocation = {
  labels: [
    "Location 1",
    "Location 2",
    "Location 3",
    "Location 4",
    "Location 5",
  ],
  datasets: [
    {
      label: "Accidents By Location",
      data: [25, 30, 20, 35, 15],
      backgroundColor: "rgb(78,203,113)",
    },
  ],
};

const dataOverspeedingByLocation = {
  labels: [
    "Location 1",
    "Location 2",
    "Location 3",
    "Location 4",
    "Location 5",
  ],
  datasets: [
    {
      label: "Overspeeding by location",
      data: [10, 15, 8, 20, 12],
      backgroundColor: [
        "rgb(31,126,161)",
        "rgb(349,103,114)",
        "rgb(185,133,255)",
        "rgb(78,203,113)",
        "rgb(246,189,181)",
      ],
    },
  ],
};

const columns = [
  { key: "locationName", title: "Location Name" },
  { key: "locationId", title: "Location ID" },
  { key: "totalOverspeedingCases", title: "Total Overspeeding Cases" },
  { key: "totalAccidents", title: "Total Accidents" },
];

const data = [
  {
    locationName: "Downtown",
    locationId: "DT001",
    totalOverspeedingCases: 12,
    totalAccidents: 5,
  },
  {
    locationName: "Highway",
    locationId: "HWY002",
    totalOverspeedingCases: 8,
    totalAccidents: 3,
  },
  {
    locationName: "Suburb",
    locationId: "SUB003",
    totalOverspeedingCases: 5,
    totalAccidents: 2,
  },
  {
    locationName: "Industrial Area",
    locationId: "IND004",
    totalOverspeedingCases: 7,
    totalAccidents: 4,
  },
  {
    locationName: "Downtown",
    locationId: "DT001",
    totalOverspeedingCases: 12,
    totalAccidents: 5,
  },
  {
    locationName: "Suburb",
    locationId: "SUB003",
    totalOverspeedingCases: 5,
    totalAccidents: 2,
  },
  {
    locationName: "Residential Zone",
    locationId: "RES005",
    totalOverspeedingCases: 3,
    totalAccidents: 1,
  },
  {
    locationName: "Suburb",
    locationId: "SUB003",
    totalOverspeedingCases: 5,
    totalAccidents: 2,
  },
  {
    locationName: "Industrial Area",
    locationId: "IND004",
    totalOverspeedingCases: 7,
    totalAccidents: 4,
  },
];

const Statistics = () => {
  return (
    <div
      className="dashboard"
      style={{ fontFamily: "Inter", fontSize: "16px" }}
    >
      <h1>Statistics</h1>
      <p>
        <img src={location} alt="location" />
        <span>Current Location:</span> Mukamira, Nyabihu
      </p>
      <div
        className="charts-container"
        style={{ display: "flex", gap: "30px" }}
      >
        <div
          style={{
            flex: "2",
            flexDirection: "column",
          }}
        >
          <div
            className="chart-wrapper"
            style={{ flex: "1", maxWidth: "70vw", marginBottom: "20px" }}
          >
            <h4>Accidents Throughout the Day</h4>
            <Line data={dataAccidentsByHour} width={500} height={250} />
          </div>
          <div
            className="chart-wrapper"
            style={{ flex: "1", maxWidth: "70vw" }}
          >
            <h4>Accidents Across Different Locations</h4>
            <Bar data={dataAccidentsByLocation} width={500} height={250} />
          </div>
        </div>
        <div
          className="chart-wrapper"
          style={{ flex: "1", justifyContent: "center", alignItems: "center" }}
        >
          <h4>Overspeeding Distribution</h4>
          <Pie data={dataOverspeedingByLocation} width={500} height={500} />
        </div>
      </div>
      <h4 style={{ margin: "40px 0 20px 0" }}>Summary of the current area</h4>
      <Table columns={columns} data={data} />
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginTop: "20px",
        }}
      >
        <button>Download</button>
      </div>
    </div>
  );
};

export default Statistics;
