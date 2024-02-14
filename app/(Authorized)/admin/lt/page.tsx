"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import MultiSelect from "multiselect-react-dropdown";
import ReactMapGL, {
  Marker,
  Popup,
  NavigationControl,
  Source,
  Layer,
} from "react-map-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import dt from "dotenv";
import polyline from "@mapbox/polyline";
import { MapPin } from "lucide-react";

dt.config();
const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "10px",
  border: "3px double #526D82",
};

const Track = () => {
  const path = usePathname();
  const [directions, setDirections] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState();
  const [options, setOptions] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 9,
    longitude: 45,
    zoom: 3,
  });
  useEffect(() => {
    Promise.all([
      fetch(process.env.NEXT_PUBLIC_APP_URL + "vehicle"),
      fetch(process.env.NEXT_PUBLIC_APP_URL + "booking"),
    ])
      .then((res) => Promise.all(res.map((res) => res.json())))
      .then((res) => {
        console.log("Vehicle Data:", res);
        setOptions(
          res[0].map((vehicle) => ({
            value: vehicle.id,
            label: vehicle.vehicleLicensePlate,
            ...vehicle,
          }))
        );
        setBookings(
          res[1].map((booking) => ({
            value: booking.id,
            label: `${booking.tripPurpose}: ${booking.startLocation} - ${booking.endLocation}`,
            ...booking,
          }))
        );
        setVehicles(res[0]);
        const calculateDirections = async () => {
          if (typeof window !== "undefined" && mapboxgl) {
            mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPGL_API as string;

            const bookingDirections = await Promise.all(
              res[1].map(async (booking) => {
                const start = booking.startLocation;
                const end = booking.endLocation;

                const response = await fetch(
                  `https://api.mapbox.com/directions/v5/mapbox/driving/${start
                    .split(",")
                    .reverse()
                    .join()};${end.split(",").reverse().join()}?access_token=${
                    mapboxgl.accessToken
                  }`
                );

                const data = await response.json();

                return {
                  type: "Feature",
                  geometry: {
                    type: "LineString",
                    coordinates: polyline
                      .decode(data.routes[0].geometry)
                      .map((coord) => [coord[1], coord[0]]), // Swap latitude and longitude
                  },
                  properties: {
                    weight_name: data.routes[0].weight_name,
                    weight: data.routes[0].weight,
                    duration: data.routes[0].duration,
                    distance: data.routes[0].distance,
                    summary: data.routes[0].legs[0].summary,
                  },
                };
              })
            );

            console.log({
              bookingDirections: bookingDirections,
              booking: res[1],
            });

            setDirections({
              bookingDirections: bookingDirections,
              booking: res[1],
            });
          }
        };

        calculateDirections();
      })
      .catch((error) => {
        console.error("Error fetching vehicle data:", error);
      });
  }, []);
  const handleOptionSelect = (selectedList) => {
    setSelectedOptions(selectedList);

    if (selectedList.length > 0) {
      const selectedOption = selectedList[0];
      setViewport({
        ...viewport,
        latitude: Number(selectedOption.currentLocation.split(",")[0]),
        longitude: Number(selectedOption.currentLocation.split(",")[1]),
        zoom: 10,
      });
    }
  };
  return (
    <div className="w-full h-full rounded-xl border-double border-secondary  md:backdrop-blur-3xl md:shadow-md md:shadow-secondary bg-tertiary/20 bg-opacity-50 p-7 pt-3 mt-20 md:mt-0">
      <div className="flex justify-between w-full ">
        <h1 className="font-rock text-primary tracking-widest space-x-10 uppercase m-3 md:block hidden">
          {path.split("/").join(" > ").substring(2)}
        </h1>
      </div>
      <div className="h-full">
        <MultiSelect
          options={options}
          selectedValues={selectedOptions}
          onSelect={handleOptionSelect}
          onRemove={setSelectedOptions}
          placeholder="Select Vehicle Plate"
          displayValue="label"
          className="font-rock font-thin py-3 tracking-wider"
          selectionLimit={1}
          style={{
            multiselectContainer: {
              borderRadius: "2px",
              color: "#526D82",
            },
            chips: {
              backgroundColor: "#526D82",
            },
            searchBox: {
              borderRadius: "12px",
              border: "2px #526D82 double",
              letterSpacing: "10px",
              padding: "10px",
            },
            option: {
              borderRadius: "12px",
              border: "2px #526D82 double",
              backgroundColor: "#000",
            },
            highlightOption: {
              backgroundColor: "#000",
            },
            notFound: {
              fontSize: "16px",
              borderRadius: "12px",
              border: "2px #526D82 double",
              backgroundColor: "#000",
            },
            optionContainer: {
              backgroundColor: "#000",
            },
          }}
        />
        <ReactMapGL
          {...viewport}
          width="100%"
          height="500px"
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
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedVehicle(vehicle);
                  }}
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
              <div className="flex text-lg flex-col font-rock justify-center items-start p-3 rounded-2xl dark:text-tertiary text-primary font-thin">
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
          {directions?.bookingDirections &&
            Array.isArray(directions.bookingDirections) &&
            directions.bookingDirections.length > 0 &&
            directions.bookingDirections.map((bookingFeature, index) => (
              <React.Fragment key={index}>
                <Source
                  id={`directions-${index}`}
                  type="geojson"
                  data={{
                    type: "FeatureCollection",
                    features: [bookingFeature],
                  }}
                >
                  <Layer
                    id={`directions-line-${index}`}
                    type="line"
                    layout={{
                      "line-join": "round",
                      "line-cap": "round",
                    }}
                    paint={{
                      "line-color": "blue",
                      "line-width": 4,
                    }}
                  />
                </Source>
                <Marker
                  latitude={bookingFeature.geometry.coordinates[0][1]}
                  longitude={bookingFeature.geometry.coordinates[0][0]}
                >
                  <div
                    className="cursor-pointer "
                    onClick={() =>
                      document
                        .getElementsByClassName("popup-${index}")[0]
                        .classList.toggle("hidden")
                    }
                  >
                    <MapPin color="#ffffff" />
                    start
                  </div>
                </Marker>
                <Popup
                  latitude={bookingFeature.geometry.coordinates[0][1]}
                  longitude={bookingFeature.geometry.coordinates[0][0]}
                  key={`popup-${index}`}
                  className={`bg-primary text-primary hidden popup-${index}`}
                >
                  <div className="flex text-lg flex-col font-rock justify-center items-start p-3 rounded-2xl dark:text-tertiary text-primary font-thin">
                    <h1 className="p-2">
                      <span className="font-bold">Duration: </span>
                      {bookingFeature.properties.duration.toFixed(2)} seconds
                    </h1>
                    <h1 className="p-2">
                      <span className="font-bold">Distance: </span>
                      {bookingFeature.properties.distance.toFixed(2)} meters
                    </h1>
                  </div>
                </Popup>
              </React.Fragment>
            ))}
        </ReactMapGL>
      </div>
    </div>
  );
};

export default Track;
