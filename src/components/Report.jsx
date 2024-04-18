import React from "react";
import { location } from "../assets";
import Table from "./Table";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Report = () => {
  const columns = [
    { key: "plate", title: "Vehicle Plate" },
    { key: "owner", title: "Registered Owner" },
    { key: "licenseCode", title: "Driver's license code" },
    { key: "violation", title: "Violation" },
    { key: "charge", title: "Charge" },
    { key: "paid", title: "Paid status" },
  ];

  const data = [
    {
      plate: "ABC123",
      owner: "John Doe",
      licenseCode: "XYZ1234",
      violation: "Speeding",
      charge: "$100",
      paid: "No",
    },
    {
      plate: "DEF456",
      owner: "Jane Smith",
      licenseCode: "MNO5678",
      violation: "Parking violation",
      charge: "$50",
      paid: "Yes",
    },
    {
      plate: "GHI789",
      owner: "Michael Young",
      licenseCode: "QRS9012",
      violation: "Broken taillight",
      charge: "$25",
      paid: "Yes",
    },
    {
      plate: "JKL012",
      owner: "Alice Johnson",
      licenseCode: "TUV3456",
      violation: "Expired registration",
      charge: "$75",
      paid: "No",
    },
    {
      plate: "MNO345",
      owner: "David Williams",
      licenseCode: "WXY7890",
      violation: "Illegal lane change",
      charge: "$50",
      paid: "No",
    },
    {
      plate: "PQR678",
      owner: "Elizabeth Brown",
      licenseCode: "ZAB1234",
      violation: "Failure to yield",
      charge: "$75",
      paid: "No",
    },
    {
      plate: "STU901",
      owner: "Robert Miller",
      licenseCode: "CDE5678",
      violation: "Speeding",
      charge: "$100",
      paid: "No",
    },
    {
      plate: "VWX234",
      owner: "Sarah Garcia",
      licenseCode: "FGH9012",
      violation: "Parking violation",
      charge: "$50",
      paid: "Yes",
    },
    {
      plate: "YZ1567",
      owner: "Matthew Hernandez",
      licenseCode: "IJK3456",
      violation: "Broken headlight",
      charge: "$25",
      paid: "No",
    },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="dashboard">
        <h1>Report</h1>
        <p>
          <img src={location} alt="location" />
          <span>Current Location :</span>Mukamira, Nyabihu
        </p>
        <div id="pick-date">
          <div>
            <span>From:</span> <DatePicker />
          </div>
          <div>
            <span>To:</span> <DatePicker />
          </div>
        </div>
        <Table columns={columns} data={data} />
      </div>
    </LocalizationProvider>
  );
};

export default Report;
