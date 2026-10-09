# 🌿 NatureQuest AI

### Less Scrolling. More Exploring.

NatureQuest AI is an AI-powered outdoor adventure web app that encourages people to spend more time in nature through fun, personalized quests. Explore your surroundings, complete challenges, earn XP, unlock badges, and record your discoveries in a nature journal.

Built for the **Touch Grass** challenge, NatureQuest combines open-source AI with gamification to make outdoor exploration more engaging.

## ✨ Features

- 🤖 **AI Quest Generator** — Generate personalized outdoor quests using a locally running AI model.
- 🌱 **Nature Challenges** — Explore plants, observe birds, take nature photos, and help the environment.
- 🎯 **Gamification** — Complete quests and earn experience points (XP).
- 🏆 **Achievement Badges** — Unlock badges as you complete more quests.
- 📊 **Progress Dashboard** — Track your XP and completed quests.
- 📓 **Nature Journal** — Save your outdoor observations locally.
- 📱 **Responsive Design** — Use the app on desktop and mobile screens.
- 🔒 **Local AI Inference** — Run AI generation locally using Ollama instead of relying on a hosted AI API.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Web page structure |
| CSS3 | Styling and responsive design |
| JavaScript | Interactivity and quest management |
| Node.js | Backend runtime |
| Express.js | Backend API and static file hosting |
| Ollama | Local AI inference |
| Qwen2.5 3B | Open-weight language model |
| LocalStorage | Save progress and journal entries in the browser |

## 🚀 Getting Started

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/)
- [Ollama](https://ollama.com/)
- [Git](https://git-scm.com/)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/NatureQuest-AI.git
cd NatureQuest-AI
```

Replace `YOUR-USERNAME` with your GitHub username.

### 2. Install dependencies

```bash
npm init -y
npm install express
```

### 3. Download the AI model

```bash
ollama pull qwen2.5:3b
```

### 4. Start the application

Make sure Ollama is running, then run:

```bash
node server.js
```

### 5. Open the app

Visit:

```text
http://localhost:3000
```

Your NatureQuest AI application should now be running locally.

## 📂 Project Structure

```text
NatureQuest-AI/
├── index.html       # Main web page
├── style.css        # UI styling and responsive layout
├── script.js        # Frontend logic and quest interactions
├── server.js        # Express backend and AI API
└── README.md        # Project documentation
```

## 🧠 Why Open-Source AI?

Open-source and open-weight AI technologies give developers more control over how their applications work.

NatureQuest AI uses Ollama to run the Qwen2.5 3B model locally. This approach can reduce dependence on external AI APIs and help keep quest-generation requests on the user's machine.

It also makes it easier to experiment with different compatible models and build AI features without requiring a paid hosted AI API. Local inference still requires the model to be downloaded, and this version requires the local server to be running.

## 🌍 Our Mission

Many people spend a large part of their day looking at screens. NatureQuest AI aims to turn screen time into a starting point for real-world exploration.

Our mission is simple:

**Use AI to inspire people to disconnect from their screens, reconnect with nature, and discover the world around them.**

## 🔮 Future Improvements

- 📍 Location-aware outdoor quests
- 🌿 Plant identification with image recognition
- 🐦 Bird identification and observation logs
- 👥 Community challenges and leaderboards
- 🌳 Eco-friendly missions and environmental impact tracking
- 📈 Weekly activity reports
- 📶 Better offline support

## 🔐 Privacy

Quest progress and journal entries are stored in browser LocalStorage on the current device. The local AI setup sends prompts to the Ollama service running on your machine.

Avoid storing sensitive personal information in your journal. Clearing browser data may remove locally saved progress.

## 🤝 Contributing

Contributions, ideas, and improvements are welcome!

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Submit a pull request.

## 📄 License

This project is available under the MIT License. Add a `LICENSE` file to the repository before distributing it under that license.

---

**Built with 🌿 for a greener, more curious world.**

*Step outside. Complete a quest. Touch grass.*
