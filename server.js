import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // make sure node-fetch v3+ is installed
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// Proxy endpoint to forward the request to Claude API
app.post("/proxy", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const apiKey = process.env.CLAUDE_API_KEY; // Use environment variable for API key

    if (!apiKey) {
      return res.status(400).json({ error: "API key is missing" });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey, // Use the API key from environment
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-opus-20240229",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error in proxy:", error);
    res.status(500).json({ error: "Failed to communicate with Claude API" });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
