const API = "http://127.0.0.1:8000";

/* ================= ELEMENTS ================= */

const chatBox = document.getElementById("chatBox");
const inputBox = document.getElementById("question");
const historyBox = document.getElementById("chatHistory"); // matches HTML
const fileInput = document.getElementById("fileInput");
const uploadArea = document.getElementById("dropZone"); // matches HTML

/* ================= INIT ================= */

window.onload = () => {
  loadHistory();
  inputBox.focus();
};

/* ================= MESSAGE UI ================= */

function createMessageRow(text, sender, isHTML = false) {
  const row = document.createElement("div");
  row.className = "message-row";

  const avatar = document.createElement("div");
  avatar.className = "avatar " + sender;
  avatar.textContent = sender === "user" ? "👤" : "🤖";

  const bubble = document.createElement("div");
  bubble.className = "message " + sender;

  if (isHTML) bubble.innerHTML = text;
  else bubble.textContent = text;

  row.appendChild(avatar);
  row.appendChild(bubble);
  chatBox.appendChild(row);

  chatBox.scrollTop = chatBox.scrollHeight;

  return bubble;
}

/* ================= MARKDOWN ================= */

function parseMarkdown(text) {
  if (window.marked) {
    return marked.parse(text);
  }

  // fallback parser
  return text
    .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    .replace(/\*(.*?)\*/g, "<i>$1</i>")
    .replace(/\n/g, "<br>");
}

/* ================= TYPING DOTS ================= */

function showTyping() {
  const row = document.createElement("div");
  row.className = "message-row";

  const avatar = document.createElement("div");
  avatar.className = "avatar bot";
  avatar.textContent = "🤖";

  const bubble = document.createElement("div");
  bubble.className = "message bot loading";
  bubble.innerHTML = "<span></span><span></span><span></span>";

  row.appendChild(avatar);
  row.appendChild(bubble);
  chatBox.appendChild(row);

  chatBox.scrollTop = chatBox.scrollHeight;

  return row;
}

/* ================= STREAMING TEXT EFFECT ================= */

async function streamText(element, text) {
  let output = "";

  for (let char of text) {
    output += char;
    element.innerHTML = parseMarkdown(output);
    await new Promise(r => setTimeout(r, 8));
  }
}

/* ================= ASK QUESTION ================= */

async function askQuestion() {
  const question = inputBox.value.trim();
  if (!question) return;

  createMessageRow(question, "user");
  saveToHistory(question);

  inputBox.value = "";
  autoGrow();

  const typing = showTyping();
  toggleInput(false);

  try {
    const res = await fetch(
      `${API}/ask/?question=${encodeURIComponent(question)}`,
      { method: "POST" }
    );

    if (!res.ok) throw new Error();

    const data = await res.json();

    typing.remove();

    const botBubble = createMessageRow("", "bot", true);
    await streamText(botBubble, data.answer || "No response received");

  } catch (err) {
    typing.remove();
    createMessageRow("⚠️ Server error. Check backend.", "bot");
    console.error(err);
  }

  toggleInput(true);
  inputBox.focus();
}

/* ================= CHAT HISTORY ================= */

function saveToHistory(text) {
  let history = JSON.parse(localStorage.getItem("chatHistory")) || [];

  history.unshift(text);
  history = history.slice(0, 20);

  localStorage.setItem("chatHistory", JSON.stringify(history));
  loadHistory();
}

function loadHistory() {
  historyBox.innerHTML = "";

  const history = JSON.parse(localStorage.getItem("chatHistory")) || [];

  history.forEach(item => {
    const div = document.createElement("div");
    div.textContent = item;

    div.onclick = () => {
      inputBox.value = item;
      askQuestion();
    };

    historyBox.appendChild(div);
  });
}

/* ================= NEW CHAT ================= */

function newChat() {
  chatBox.innerHTML = "";
}

/* ================= FILE UPLOAD ================= */

async function uploadFile(file = null) {
  if (!file) file = fileInput.files[0];
  if (!file) return alert("Select a file");

  const formData = new FormData();
  formData.append("file", file);

  createMessageRow("📄 Uploading document...", "bot");

  try {
    const res = await fetch(`${API}/upload/`, {
      method: "POST",
      body: formData
    });

    if (!res.ok) throw new Error();

    createMessageRow("✅ Document indexed successfully", "bot");

  } catch (err) {
    createMessageRow("❌ Upload failed", "bot");
    console.error(err);
  }

  fileInput.value = "";
}

/* ================= DRAG & DROP UPLOAD ================= */

if (uploadArea) {
  uploadArea.addEventListener("dragover", e => {
    e.preventDefault();
    uploadArea.classList.add("dragover");
  });

  uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("dragover");
  });

  uploadArea.addEventListener("drop", e => {
    e.preventDefault();
    uploadArea.classList.remove("dragover");

    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  });
}

/* ================= VOICE INPUT ================= */

function startVoiceInput() {
  if (!("webkitSpeechRecognition" in window)) {
    return alert("Voice input not supported in this browser");
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";

  recognition.onresult = e => {
    inputBox.value = e.results[0][0].transcript;
    autoGrow();
  };

  recognition.start();
}

/* ================= INPUT CONTROL ================= */

function toggleInput(enable) {
  inputBox.disabled = !enable;
}

/* Auto grow textarea */
function autoGrow() {
  inputBox.style.height = "auto";
  inputBox.style.height = inputBox.scrollHeight + "px";
}

inputBox.addEventListener("input", autoGrow);

/* Enter → send */
inputBox.addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    askQuestion();
  }
});