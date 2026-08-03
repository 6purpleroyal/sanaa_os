import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Initialize Gemini AI Client server-side
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  // API Route: Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "Festival OS - Kenya National Music Festival" });
  });

  // API Route: AI Festival Query & Story Generator Engine
  app.post("/api/ai/query", async (req, res) => {
    try {
      const { prompt, mode, contextData } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      let systemInstruction = `You are Festival OS Intelligence AI, the official digital archive and analytics assistant for the Kenya National Music Festival (KNMF). 
You possess deep knowledge of Kenyan music, choral arts, traditional folk dances, solo voice, Taarab, Zilizopendwa, elocution, poetry, instruments (Nyatiti, Orutu, Isukuti, Kayamba, Marimba), and school performance histories.
Provide insightful, respectful, culturally rich, and accurate responses. Format output cleanly with markdown formatting, bold headers, and scannable bullet points when appropriate.`;

      if (mode === "generate_story") {
        systemInstruction += `\nYour task is to write a captivating, National Geographic/Behance-style journalism story about a festival performance, school choir, or cultural moment based on the prompt provided.`;
      } else if (mode === "analytics") {
        systemInstruction += `\nYour task is to analyze festival performance data, scoring patterns, county participation numbers, and provide executive insights.`;
      }

      const fullPrompt = `${prompt}\n\n[Active Festival Context Data]: ${JSON.stringify(contextData || {})}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: fullPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text || "No response generated." });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({
        error: error.message || "Failed to process AI query",
        details: "Please verify GEMINI_API_KEY in Secrets if running live AI query.",
      });
    }
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Festival OS Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
