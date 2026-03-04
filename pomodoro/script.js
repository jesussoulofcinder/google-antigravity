const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const modeBtns = document.querySelectorAll(".mode-btn");
const sessionCountDisplay = document.getElementById("session-count");
const body = document.body;

const circle = document.querySelector(".animated-ring");
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = 0;

const MODES = {
    work: { time: 25 * 60, title: "Focus", background: "var(--bg-gradient-work)" },
    shortBreak: { time: 5 * 60, title: "Short Break", background: "var(--bg-gradient-short)" },
    longBreak: { time: 15 * 60, title: "Long Break", background: "var(--bg-gradient-long)" }
};

let currentMode = "work";
let timeLeft = MODES[currentMode].time;
let isRunning = false;
let timerInterval;
let completedSessions = 0;

function setProgress(percent) {
    // 0 percent sets strokeDashoffset to 0, 100 percent sets offset to circumference
    const offset = (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    timeDisplay.textContent = formattedTime;
    document.title = `${formattedTime} - ${MODES[currentMode].title}`;

    // Calculate percentage elapsed
    const totalTime = MODES[currentMode].time;
    const elapsed = totalTime - timeLeft;
    const percentContext = (elapsed / totalTime) * 100;

    setProgress(percentContext);
}

function switchMode(mode) {
    if (isRunning) {
        if (!confirm("A timer is currently running, are you sure you want to switch?")) return;
        pauseTimer();
    }

    currentMode = mode;
    timeLeft = MODES[currentMode].time;

    // Update Active Button
    modeBtns.forEach(btn => btn.classList.remove("active"));
    document.querySelector(`[data-mode="${mode}"]`).classList.add("active");

    // Update Background and Headers
    body.style.background = MODES[currentMode].background;
    document.querySelector("header h1").textContent = MODES[currentMode].title;

    updateDisplay();
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    startBtn.textContent = "Pause";

    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            completeTimer();
        }
    }, 1000);
}

function pauseTimer() {
    isRunning = false;
    startBtn.textContent = "Start";
    clearInterval(timerInterval);
}

function completeTimer() {
    pauseTimer();

    if (currentMode === "work") {
        completedSessions++;
        sessionCountDisplay.textContent = completedSessions;

        if (completedSessions > 0 && completedSessions % 4 === 0) {
            switchMode("longBreak");
        } else {
            switchMode("shortBreak");
        }
    } else {
        switchMode("work");
    }
}

function resetTimer() {
    pauseTimer();
    timeLeft = MODES[currentMode].time;
    updateDisplay();
}

// Event Listeners
startBtn.addEventListener("click", () => {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

resetBtn.addEventListener("click", resetTimer);

modeBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const mode = e.target.getAttribute("data-mode");
        if (mode !== currentMode) {
            switchMode(mode);
        }
    });
});

// Init
updateDisplay();
