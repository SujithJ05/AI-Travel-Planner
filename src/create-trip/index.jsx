import React, { useState } from "react";

function CreateTrip() {
  const [formData, setFormData] = useState({
    destination: "",
    tripDuration: "",
    budget: "",
    travelCompanion: "",
  });

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleButtonChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Data:", formData); // Debugging: Check form data
    setLoading(true);
    setResponse(null);

    const { destination, tripDuration, budget, travelCompanion } = formData;

    // Build the prompt string to send to Claude
    const prompt = `Plan a ${tripDuration}-day trip to ${destination} with a ${budget} budget. I will be traveling with ${travelCompanion}. Include activities, tips, and ideal itinerary.`;
    console.log("Prompt:", prompt); // Debugging: Check prompt

    try {
      const result = await fetch("http://localhost:5000/proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await result.json();
      setResponse(
        data?.content ||
          data?.choices?.[0]?.message?.content ||
          JSON.stringify(data)
      );
    } catch (error) {
      console.error("Error:", error);
      setResponse("Failed to generate trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl mb-4">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="text-gray-500 text-xl mb-8">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Destination */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">
            What is the destination of choice?
          </label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            placeholder="Enter your destination"
          />
        </div>

        {/* Trip Duration */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">
            How many days are you planning the trip?
          </label>
          <input
            type="number"
            name="tripDuration"
            value={formData.tripDuration}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            placeholder="Enter trip duration in days"
          />
        </div>

        {/* Budget */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">
            What is your estimated budget?
          </label>
          <div className="flex space-x-4">
            {["Low", "Medium", "High"].map((level) => (
              <button
                key={level}
                type="button"
                className={`p-4 border rounded ${
                  formData.budget === level
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleButtonChange("budget", level)}
              >
                {level === "Low"
                  ? "💵 Low"
                  : level === "Medium"
                  ? "💰 Medium"
                  : "🤑 High"}
              </button>
            ))}
          </div>
        </div>

        {/* Travel Companion */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">
            Who do you plan on travelling with on your next adventure?
          </label>
          <div className="flex space-x-4">
            {["Solo", "Couple", "Family", "Friends"].map((companion) => (
              <button
                key={companion}
                type="button"
                className={`p-4 border rounded ${
                  formData.travelCompanion === companion
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleButtonChange("travelCompanion", companion)}
              >
                {companion === "Solo"
                  ? "🧍 Solo"
                  : companion === "Couple"
                  ? "👫 Couple"
                  : companion === "Family"
                  ? "👨‍👩‍👧 Family"
                  : "👫 Friends"}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`mt-4 p-2 bg-blue-500 text-white rounded ${
            loading ? "cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Trip"}
        </button>
      </form>

      {/* Response Output */}
      {response && (
        <div className="mt-10 bg-gray-100 p-4 rounded whitespace-pre-wrap">
          <h3 className="font-bold text-xl mb-2">Trip Plan:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default CreateTrip;
