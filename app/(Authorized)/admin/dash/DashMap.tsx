import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import dt from "dotenv";
dt.config();

const customMarker = {
  path: "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
  fillColor: "#D8D8D8",
  fillOpacity: 2,
  strokeWeight: 1,
  rotation: 0,
  scale: 1,
};

function DashMap() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 10,
  });
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_APP_URL + "vehicle")
      .then((res) => res.json())
      .then((res) => {
        setVehicles(res);
      })
      .catch((error) => {
        console.error("Error fetching vehicle data:", error);
      });
  }, []);

  useEffect(() => {
    if ("geolocation" in window.navigator) {
      window.navigator.geolocation.getCurrentPosition(function (position) {
        setViewport({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          zoom: 2,
        });
      });
    } else {
      console.log("Geolocation is not available in this browser.");
    }
  }, []);

  return (
    <div className="rounded-xl overflow-hidden w-full h-full">
      <ReactMapGL
        {...viewport}
        width="100%"
        height="300px"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPGL_API}
        mapStyle="mapbox://styles/yaseressa222/cls82y3sb01el01qydiipcjbe"
        onMove={(evt) => setViewport(evt.viewport)}
        attributionControl={false}
      >
        <NavigationControl
          style={{ position: "absolute", top: 10, right: 10 }}
        />

        {vehicles &&
          vehicles.map((vehicle) => (
            <Marker
              key={vehicle.id}
              latitude={Number(vehicle.currentLocation?.split(",")[0])}
              longitude={Number(vehicle.currentLocation?.split(",")[1])}
            >
              <div
                onClick={() => {
                  setSelectedVehicle(vehicle);
                }}
                className="cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="48"
                  viewBox="0 0 40 48"
                >
                  <path
                    d="M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805"
                    fill="#ffffff"
                    fill-opacity="0.9"
                    stroke="#000"
                    stroke-width="1"
                    transform="scale(1) rotate(0)"
                  />
                </svg>
              </div>
            </Marker>
          ))}

        {selectedVehicle && (
          <Popup
            latitude={Number(selectedVehicle.currentLocation?.split(",")[0])}
            longitude={Number(selectedVehicle.currentLocation?.split(",")[1])}
            key={selectedVehicle.currentLocation}
            onClose={() => setSelectedVehicle(null)}
            closeOnClick={false}
            className="bg-primary text-primary"
          >
            <div className="flex text-xs flex-col font-rock justify-center items-start p-3 rounded-2xl dark:text-tertiary text-primary font-thin">
              <h1 className="p-2">
                {" "}
                <span className="font-bold">Vehicle: </span>
                {selectedVehicle.vehicleModel}
              </h1>
              <h1 className="p-2">
                <span className="font-bold">Plate: </span>
                {selectedVehicle.vehicleLicensePlate}
              </h1>
              <h1 className="p-2">
                <span className="font-bold">GPS: </span>{" "}
                {selectedVehicle.currentLocation},{" "}
              </h1>
              <h1 className="p-2">
                <span className="font-bold">Location: </span>{" "}
                {selectedVehicle.currentLocationName}{" "}
              </h1>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}

export default DashMap;
