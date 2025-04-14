// server.js
const express = require("express");
const fetch = require("node-fetch");

const app = express();
const port = 5000;

// Middleware to parse incoming JSON data
app.use(express.json());

// Proxy endpoint to forward the request to Claude API
app.post("/proxy", async (req, res) => {
  try {
    // Send the incoming request body to Claude API
    const response = await fetch("https://api.claude.ai/your-endpoint", {
      method: "POST",
      headers: {
        Authorization: `Bearer YOUR_CLAUDE_API_KEY`, // Replace with your actual API key
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body), // Forward the incoming data
    });

    // Get the response from Claude API and send it back to the client
    const data = await response.json();
    res.json(data); // Send the Claude API response back to the client
  } catch (error) {
    console.error("Error in proxy:", error);
    res.status(500).json({ error: "Failed to communicate with Claude API" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
