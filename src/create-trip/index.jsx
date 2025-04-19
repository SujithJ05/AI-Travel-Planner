import React, { useState } from "react";
import PlaceAutocomplete from "../components/PlaceAutocomplete";
import Map from "../components/Map";

const CreateTrip = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [tripName, setTripName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    console.log("Selected location:", location);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you would typically save the trip data to your backend
    console.log("Creating trip:", {
      name: tripName,
      location: selectedLocation,
      startDate,
      endDate,
    });

    // Reset form or redirect
    alert("Trip created successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create a New Trip</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trip Name
          </label>
          <input
            type="text"
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Destination
          </label>
          <PlaceAutocomplete onSelectLocation={handleLocationSelect} />
        </div>

        {selectedLocation && (
          <div className="border-t border-b py-4 my-4">
            <h2 className="text-lg font-semibold mb-2">Selected Location</h2>
            <p>
              <strong>Name:</strong> {selectedLocation.name}
            </p>
            <p>
              <strong>Address:</strong> {selectedLocation.formatted}
            </p>
            {selectedLocation.city && (
              <p>
                <strong>City:</strong> {selectedLocation.city}
              </p>
            )}
            {selectedLocation.state && (
              <p>
                <strong>State/Region:</strong> {selectedLocation.state}
              </p>
            )}
            {selectedLocation.country && (
              <p>
                <strong>Country:</strong> {selectedLocation.country}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
        </div>

        {selectedLocation && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Location Map</h2>
            <Map location={selectedLocation} />
          </div>
        )}

        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!selectedLocation}
          >
            Create Trip
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTrip;
