import React from "react";
import GoogleMapReact from "google-map-react";

interface MarkerProps {
  lat: number;
  lng: number;
  text: string;
}

const AnyReactComponent: React.FC<MarkerProps> = ({ text }) => (
  <div>{text}</div>
);

const GoogleMapComponent: React.FC = () => {
  const defaultProps = {
    center: {
      lat: 26.2124,
      lng: 78.1772,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <GoogleMapReact
      bootstrapURLKeys={{ key: "" }} // Enter your Google Maps API key here
      defaultCenter={defaultProps.center}
      defaultZoom={defaultProps.zoom}
    >
      <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
    </GoogleMapReact>
  );
};

export default GoogleMapComponent;
