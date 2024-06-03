import React from "react";
import Table from "./Table";

const columns = [
  {
    title: "Road ID",
    key: "roadid",
  },
  {
    title: "Road Name",
    key: "roadname",
  },
  {
    title: "Max Speed",
    key: "maxspeed",
  },
  {
    title: "GeoFence Group",
    key: "geofencegroup",
  },
];

const dummyData = [
  {
    id: 1,
    name: "Kigali, Kk 22, ave",
    maxSpeed: 60,
    geoFenceGroup: "Kigali",
  },
  {
    name: "Musanze, NM 1, ave",
    maxSpeed: 50,
    geoFenceGroup: "Musanze",
  },
  {
    id: 2,
    name: "Nyabihu, WN 20, Nkuli ave",
    maxSpeed: 40,
    geoFenceGroup: "Nyabihu",
  },
  {
    id: 3,
    name: "Kigali, Kk 22, ave",
    maxSpeed: 60,
    geoFenceGroup: "Kigali",
  },
  {
    id: 4,
    name: "Musanze, NM 1, ave",
    maxSpeed: 50,
    geoFenceGroup: "Musanze",
  },
  {
    id: 5,
    name: "Nyabihu, WN 20, Nkuli ave",
    maxSpeed: 40,
    geoFenceGroup: "Nyabihu",
  },
  {
    id: 1,
    name: "Kigali, Kk 22, ave",
    maxSpeed: 60,
    geoFenceGroup: "Kigali",
  },
  {
    name: "Musanze, NM 1, ave",
    maxSpeed: 50,
    geoFenceGroup: "Musanze",
  },
  {
    id: 2,
    name: "Nyabihu, WN 20, Nkuli ave",
    maxSpeed: 40,
    geoFenceGroup: "Nyabihu",
  },
  {
    id: 3,
    name: "Kigali, Kk 22, ave",
    maxSpeed: 60,
    geoFenceGroup: "Kigali",
  },
  {
    id: 4,
    name: "Musanze, NM 1, ave",
    maxSpeed: 50,
    geoFenceGroup: "Musanze",
  },
  {
    id: 5,
    name: "Nyabihu, WN 20, Nkuli ave",
    maxSpeed: 40,
    geoFenceGroup: "Nyabihu",
  },
  {
    id: 1,
    name: "Kigali, Kk 22, ave",
    maxSpeed: 60,
    geoFenceGroup: "Kigali",
  },
];

const formattedData = dummyData.map((item, index) => ({
  roadid: index,
  roadname: item.name,
  maxspeed: item.maxSpeed,
  geofencegroup: item.geoFenceGroup,
}));

const RoadsList = () => {
  return (
    <>
      <Table columns={columns} data={formattedData} />
    </>
  );
};

export default RoadsList;
