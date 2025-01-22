import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { postAPI } from "../../Services/apis";

const GeocodePincode = () => {
  const [pincode, setPincode] = useState("");
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  async function getCoordinatesForAddresses(addresses) {
    const apiKey = "FANgz5SPPeXsGdtDz2c3X1k4NzGejJLAK3CcTubL";
    const url = "https://api.olamaps.io/places/v1/geocode";

    const requests = addresses.map(async (address) => {
      try {
        const response = await axios.get(url, {
          params: {
            address: address,
            api_key: apiKey,
          },
          headers: {
            "X-Request-Id": uuidv4(),
          },
        });

        if (response.data) {
          console.log(`Coordinates for ${address}:`, response.data);
          return response.data;
        }
      } catch (error) {
        console.error(`Failed to fetch coordinates for ${address}:`, error);
        return null;
      }
    });

    // Wait for all requests to complete
    const results = await Promise.all(requests);
    console.log("results=====", results);

    const locationData = results.map((item) => {
      const {
        name,
        geometry: { location },
      } = item.geocodingResults[0];
      return {
        city: name,
        latitude: location.lat,
        longitude: location.lng,
      };
    });

    console.log("locationData====", locationData);

    const data = {
      firstName: "Shubham",
      lastName: "Sanchela",
      email: "shubham@gmail.com",
      password: "123456",
      role: "individual",
      city: addresses,
      results: locationData,
    };

    const response = await postAPI("location/addLocation", data);
    console.log("response====", response);

    // return results;
  }

  // Example usage
  const addresses = ["Akola", "Amravati", "Nagpur"]; // Replace with your list of addresses

  const getCoordinates = async () => {
    // const url = `https://nominatim.openstreetmap.org/search?postalcode=${pincode}&countrycodes=in&format=json`;
    const url = `https://api.olamaps.io/places/v1/geocode`;

    try {
      const response = await axios.get(url);
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setLocation({ lat, lon });
        setError("");
      } else {
        setError("Unable to get coordinates for the given pincode.");
      }
    } catch (error) {
      setError("An error occurred while fetching the coordinates.");
    }
  };

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pincode) {
      getCoordinates();
    } else {
      setError("Please enter a valid pincode.");
    }
  };

  const getCoordinatesForSingleAddress = async (newAddress) => {
    const apiKey = "FANgz5SPPeXsGdtDz2c3X1k4NzGejJLAK3CcTubL";
    const url = "https://api.olamaps.io/places/v1/geocode";

    let response;

    try {
      response = await axios.get(url, {
        params: {
          address: newAddress,
          api_key: apiKey,
        },
        headers: {
          "X-Request-Id": uuidv4(),
        },
      });

      if (response.data) {
        console.log("response.data====", response.data.geocodingResults);
        const lat = response.data.geocodingResults[0].geometry.location.lat;
        const lng = response.data.geocodingResults[0].geometry.location.lng;

        console.log(`=====Latitude: ${lat}, Longitude: ${lng}====`);
        return response.data;
      }
    } catch (error) {
      return null;
    }

    // Wait for all requests to complete
  };

  const newAddress =
    "Telephone Colony Road, Telephone Colony Rd, Vivekanand Nagar, Tumsar, Maharashtra, 441912, India";

  return (
    <div>
      <h2>Get Latitude and Longitude by Pincode</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Pincode"
          value={pincode}
          onChange={handlePincodeChange}
        />
        <button type="submit">Get Coordinates</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {location && (
        <div>
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lon}</p>
        </div>
      )}
      <br />
      <br />
      <br />
      <button onClick={() => getCoordinatesForAddresses(addresses)}>
        Get lat lng from City Name
      </button>
      <br />
      <br />
      <br />
      <button onClick={() => getCoordinatesForSingleAddress(newAddress)}>
        Get lat lng current Address
      </button>
    </div>
  );
};

export default GeocodePincode;
