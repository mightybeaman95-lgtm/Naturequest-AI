
const generateBtn = document.getElementById("generateBtn");
const questResult = document.getElementById("questResult");

let xp = Number(localStorage.getItem("nq-xp") || 0);
let completed = Number(localStorage.getItem("nq-completed") || 0);
let currentQuest = null;
let finishedQuestIds = JSON.parse(
  localStorage.getItem("nq-finished") || "[]"
);

function updateStats() {
  document.getElementById("xp").textContent = xp;
  document.getElementById("completed").textContent = completed;
  document.getElementById("streak").textContent =
    Number(localStorage.getItem("nq-streak") || 0);

  document.querySelectorAll(".badge-card").forEach((card, index) => {
    const needed = [1, 3, 5][index];
    card.style.background = completed >= needed ? "#edf6df" : "white";
  });

  localStorage.setItem("nq-xp", xp);
  localStorage.setItem("nq-completed", completed);
  localStorage.setItem("nq-finished", JSON.stringify(finishedQuestIds));
}

const demoQuests = [
  {
    title: "The Five Shades of Green",
    description: "Visit a safe public garden or campus green space. Observe five different shades of green without picking any plants.",
    duration: "15 minutes",
    xp: 30,
    category: "Nature"
  },
  {
    title: "Bird Watcher",
    description: "From a safe public spot, observe birds from a distance. Notice their colours, sounds, and movements.",
    duration: "15 minutes",
    xp: 35,
    category: "Wildlife"
  },
  {
    title: "Nature Photographer",
    description: "Take three photos of natural patterns, such as leaf shapes, tree bark, or clouds. Respect other people's privacy.",
    duration: "20 minutes",
    xp: 40,
    category: "Photography"
  },
  {
    title: "Little Earth Helper",
    description: "With permission and adult guidance if needed, tidy a small public area using safe methods. Never handle sharp or unknown waste.",
    duration: "15 minutes",
    xp: 35,
    category: "Environment"
  },
  {
    title: "Mindful Nature Walk",
    description: "Walk in a familiar, public, safe place. Notice three sounds, three colours, and the feeling of the breeze.",
    duration: "15 minutes",
    xp: 30,
    category: "Wellness"
  }
];

function showQuest(quest) {
  currentQuest = quest;
  const alreadyDone = finishedQuestIds.includes(quest.title);

  questResult.innerHTML = `
    <article class="quest-card">
      <span class="tag">${escapeHTML(quest.category || "Nature")}</span>
      <h3>${escapeHTML(quest.title)}</h3>
      <p>${escapeHTML(quest.description)}</p>
      <p class="quest-meta">⏱ ${escapeHTML(quest.duration || "15 minutes")}
        &nbsp; · &nbsp; ⭐ ${Number(quest.xp) || 30} XP</p>
      <button id="completeBtn" ${alreadyDone ? "disabled" : ""} class="${alreadyDone ? "done" : ""}">
        ${alreadyDone ? "✓ Already completed" : "✓ Complete quest"}
      </button>
    </article>
  `;

  const completeBtn = document.getElementById("completeBtn");
  completeBtn.addEventListener("click", completeQuest);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

generateBtn.addEventListener("click", async () => {
  generateBtn.disabled = true;
  generateBtn.textContent = "🌿 Creating your quest...";
  questResult.innerHTML = '<p class="empty">Your next adventure is being prepared...</p>';

  const payload = {
    interests: document.getElementById("interest").value,
    difficulty: document.getElementById("difficulty").value,
    location: document.getElementById("location").value
  };

  try {
    const response = await fetch("/api/quest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error("AI server unavailable");

    const data = await response.json();
    if (!data.success || !data.quest) throw new Error("No quest returned");

    showQuest(data.quest);
  } catch (error) {
    const matches = demoQuests.filter(quest => {
      const interest = payload.interests;
      return interest === "nature" ||
        (interest === "birds" && quest.category === "Wildlife") ||
        (interest === "photography" && quest.category === "Photography") ||
        (interest === "environment" && quest.category === "Environment") ||
        (interest === "walking" && quest.category === "Wellness");
    });

    const pool = matches.length ? matches : demoQuests;
    const quest = pool[Math.floor(Math.random() * pool.length)];
    showQuest(quest);
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = "✨ Generate my quest";
  }
});

function completeQuest() {
  if (!currentQuest || finishedQuestIds.includes(currentQuest.title)) return;

  finishedQuestIds.push(currentQuest.title);
  completed += 1;
  xp += Number(currentQuest.xp) || 30;

  localStorage.setItem("nq-streak", Math.max(
    1, Number(localStorage.getItem("nq-streak") || 0)
  ));

  updateStats();
  showQuest(currentQuest);
}

document.getElementById("saveJournal").addEventListener("click", () => {
  const input = document.getElementById("journal");
  const status = document.getElementById("journalStatus");
  const entry = input.value.trim();

  if (!entry) {
    status.textContent = "Please write something before saving.";
    return;
  }

  const entries = JSON.parse(localStorage.getItem("nq-journal") || "[]");
  entries.push({ text: entry, date: new Date().toLocaleString() });
  localStorage.setItem("nq-journal", JSON.stringify(entries));
  input.value = "";
  status.textContent = "Journal entry saved on this device! 🌱";
});

updateStats();
