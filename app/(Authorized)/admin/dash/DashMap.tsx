import React, { useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
require("dotenv").config();
const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "10px",
  border: "3px double #526D82",
};

function DashMap() {
  const [current, setCurrent] = useState({ lat: 0, lng: 0 });
  navigator.geolocation.getCurrentPosition(function (position) {
    setCurrent({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  });
  return (
    <LoadScript googleMapsApiKey={"AIzaSyD4KpQYj67dCHVTV_VDov3hUXX6WcYCeg4"}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={current}
        zoom={20}
      ></GoogleMap>
    </LoadScript>
  );
}

export default DashMap;
