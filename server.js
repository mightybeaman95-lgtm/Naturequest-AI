
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "1mb" }));
app.use(express.static(__dirname));

app.post("/api/quest", async (req, res) => {
  try {
    const { interests, difficulty, location } = req.body || {};

    const prompt = `
Create one safe outdoor nature quest.
Interest: ${String(interests || "nature").slice(0, 100)}
Difficulty: ${String(difficulty || "easy").slice(0, 30)}
Location: ${String(location || "park").slice(0, 50)}

Return only JSON:
{
  "title": "Quest title",
  "description": "Clear quest instructions",
  "duration": "15 minutes",
  "xp": 30,
  "category": "Nature"
}
Never suggest dangerous activities, trespassing,
touching unknown plants or animals, or going alone
to isolated places.
`;

    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "qwen2.5:3b",
        prompt,
        stream: false,
        format: "json"
      })
    });

    if (!response.ok) throw new Error("Ollama request failed");

    const data = await response.json();
    const quest = JSON.parse(data.response);

    res.json({ success: true, quest });
  } catch (error) {
    console.error("AI error:", error.message);
    res.status(500).json({
      success: false,
      error: "AI unavailable. Check Ollama and the model."
    });
  }
});

app.listen(PORT, () => {
  console.log(`NatureQuest AI running at http://localhost:${PORT}`);
});
