import React, { useState, useEffect } from "react";

const PlaceAutocomplete = ({ onSelectLocation }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Use the new API key directly to ensure it works
  const GEOAPIFY_API_KEY = "68832e67681848809ea8867da3b58c6f";

  // For production, you would use:
  // const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

  const fetchSuggestions = async (input) => {
    if (!input || input.length < 2) return;

    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
      input
    )}&limit=5&apiKey=${GEOAPIFY_API_KEY}`;

    try {
      setLoading(true);
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`API returned status ${res.status}`);
      }

      const data = await res.json();

      if (data.features && Array.isArray(data.features)) {
        setSuggestions(data.features);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Debounce the API call
    const timeoutId = setTimeout(() => {
      if (value.length >= 2) {
        fetchSuggestions(value);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.properties.formatted);
    setSuggestions([]);

    // Create a structured location object to pass to parent
    const locationData = {
      formatted: suggestion.properties.formatted,
      name: suggestion.properties.name || suggestion.properties.formatted,
      lat: suggestion.properties.lat,
      lon: suggestion.properties.lon,
      country: suggestion.properties.country,
      city: suggestion.properties.city,
      state: suggestion.properties.state,
      raw: suggestion, // Include the full suggestion object for reference
    };

    onSelectLocation(locationData);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Enter a destination"
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={inputValue}
        onChange={handleInputChange}
        aria-label="Search for a location"
      />

      {loading && (
        <div className="absolute right-3 top-3">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
        </div>
      )}

      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 mt-1 rounded-md shadow-lg w-full max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="font-medium">
                {suggestion.properties.name || suggestion.properties.formatted}
              </div>
              {suggestion.properties.name && (
                <div className="text-sm text-gray-500">
                  {suggestion.properties.formatted}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlaceAutocomplete;
