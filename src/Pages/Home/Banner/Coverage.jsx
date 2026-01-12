import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useLoaderData } from "react-router";
import "leaflet/dist/leaflet.css";

const Coverage = () => {
  const position = [23.685, 90.3563];

  // Loader data
  const loadedData = useLoaderData();

  // Local state
  const [serviceCenter, setServiceCenter] = useState([]);

  const mapRef = useRef(null);

  // Handle loader + fallback fetch
  useEffect(() => {
    if (loadedData) {
      setServiceCenter(loadedData);
    } else {
      fetch("/serviceCenters.json")
        .then((res) => res.json())
        .then((data) => setServiceCenter(data));
    }
  }, [loadedData]);

  const handleSearch = (e) => {
    e.preventDefault();

    const location = e.target.location.value;

    const district = serviceCenter.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );

    if (district) {
      const coord = [district.latitude, district.longitude];
      mapRef.current.flyTo(coord, 14);
    }
  };

  return (
    <div className="my-10">
      <h2 className="text-center text-xl lg:text-4xl mt-8 font-bold">
        We are available in 64 Districts
      </h2>

      {/* Search */}
      <div className="flex justify-center items-center mt-5">
        <form onSubmit={handleSearch}>
          <label className="input">
            <input
              type="search"
              className="grow"
              name="location"
              placeholder="Search district"
            />
          </label>
        </form>
      </div>

      {/* Map */}
      <div className="h-[600px] mx-auto w-full px-3 lg:max-w-7xl mb-5 mt-3">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-[600px]"
          ref={mapRef}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {serviceCenter.map((center, index) => (
            <Marker
              key={index}
              position={[center.latitude, center.longitude]}
            >
              <Popup>
                <strong>{center.district}</strong> <br />
                Service Area: {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;