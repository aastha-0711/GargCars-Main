import React from "react";
import mark from "../images/icons/gps.png";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = () => {
  const [viewport, setViewport] = React.useState({
latitude: 28.8909,
    longitude: 76.5796,
    width: "100vw",
    height: "80vh",
    zoom: 12,
  });

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2
        style={{
          color: "white",
          marginBottom: "5rem",
          display: "block",
          fontWeight: "700",
        }}
      >
        OUR <span style={{ color: "#6F8661	" }}>LOCATION</span>
      </h2>

      <ReactMapGL
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken="OPOusVojImDNccNaGA0N"
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=OPOusVojImDNccNaGA0N"
      >
        <Marker latitude={31.519208} longitude={74.319163}>
          <div className="marker">
            <a
              href="https://www.google.com/maps/place/Rohtak+-+Sonipat+Road,+Rohtak,+Haryana"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={mark}
                alt="Our Location"
                style={{ height: "50px", width: "48px" }}
              />
            </a>
          </div>
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default Map;
