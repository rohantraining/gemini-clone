// server.js
import express from "express";
import cors from "cors";
import run from "./src/config/gemini.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/gemini", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    const result = await run(prompt);
    res.json({ result });
  } catch (error) {
    console.error("Error in /api/gemini:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
