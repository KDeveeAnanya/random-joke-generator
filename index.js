// Element References
const jokeEl = document.getElementById("joke");
const btn = document.getElementById("btn");
const themeToggleBtn = document.getElementById("toggle-mode");
const categorySelect = document.getElementById("category-select");
const historyEl = document.getElementById("history-list");

// State
let jokeHistory = [];

// Event Listeners
btn.addEventListener("click", fetchJoke);
themeToggleBtn.addEventListener("click", toggleTheme);

// Fetch Joke from API
async function fetchJoke() {
  const category = categorySelect.value;
  const emoji = getEmoji(category);

  jokeEl.textContent = "Loading...";

  try {
    const res = await fetch(`https://official-joke-api.appspot.com/jokes/${category}/random`);
    const data = await res.json();
    const fullJoke = `${emoji} ${data[0].setup} - ${data[0].punchline}`;

    jokeEl.textContent = fullJoke;
    updateHistory(fullJoke);
  } catch (err) {
    jokeEl.textContent = "Oops! Couldn't fetch a joke. Try again 😢";
    console.error(err);
  }
}

// Emoji per category
function getEmoji(category) {
  const emojis = {
    programming: "💻",
    general: "😂",
    "knock-knock": "🚪"
  };
  return emojis[category] || "😅";
}

// Theme Toggle
function toggleTheme() {
  document.body.classList.toggle("dark");
  themeToggleBtn.textContent = document.body.classList.contains("dark")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
}

// Manage Joke History
function updateHistory(jokeText) {
  jokeHistory.unshift(jokeText);
  if (jokeHistory.length > 5) jokeHistory.pop();

  historyEl.innerHTML = "";
  jokeHistory.forEach(joke => {
    const li = document.createElement("li");
    li.textContent = joke;
    historyEl.appendChild(li);
  });
}
