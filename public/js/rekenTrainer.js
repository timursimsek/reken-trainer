let currentIndex = 0;
let score = 0;
let seconden = 0;
let timerInterval = null;

const vraagEl = document.getElementById("vraag");
const antwoordInput = document.getElementById("antwoordInput");
const okBtn = document.getElementById("okBtn");
const resultatenEl = document.getElementById("resultaten");
const resetBtn = document.getElementById("resetBtn");

function startTimer() {
  timerInterval = setInterval(() => {
    seconden++;
    const min = String(Math.floor(seconden / 60)).padStart(2, "0");
    const sec = String(seconden % 60).padStart(2, "0");
    document.getElementById("timer").textContent = `${min}:${sec}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  const tijd = document.getElementById("timer").textContent;
  document.getElementById("timerValue").textContent = tijd;
}

function toonVolgendeOefening() {
  if (currentIndex >= oefeningen.length) {
    stopTimer();
    vraagEl.textContent = "Klaar!";
    antwoordInput.disabled = true;
    okBtn.disabled = true;

    const eindTijd = document.getElementById("timer").textContent;

    resultatenEl.value =
      `Eindscore: ${score} / ${oefeningen.length}\n` +
      `Tijd: ${eindTijd}\n\n` +
      resultatenEl.value;

    document.getElementById("timer").style.display = "none"; // verberg bovenaan
    document.getElementById("timerEnd").style.display = "block"; // toon onderaan
    document.getElementById("homeBtn").style.display = "block";
    return;
  }

  const oef = oefeningen[currentIndex];
  vraagEl.textContent = oef.vraag + " = ?";
  antwoordInput.value = "";
  antwoordInput.focus();
}

function controleerAntwoord() {
  const userAnswer = Number(antwoordInput.value);
  const correctAnswer = oefeningen[currentIndex].antwoord;
  const isCorrect = userAnswer === correctAnswer;

  const symbool = isCorrect ? "✅" : "❌";
  resultatenEl.value =
    `${oefeningen[currentIndex].vraag} = ${userAnswer} ${symbool}\n` +
    resultatenEl.value;

  if (isCorrect) score++;
  currentIndex++;
  toonVolgendeOefening();
}

okBtn.addEventListener("click", controleerAntwoord);
antwoordInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") controleerAntwoord();
});

if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    document
      .querySelectorAll("input[type='checkbox']")
      .forEach((cb) => (cb.checked = false));
    document.querySelector("input[name='aantal']").value = "";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  toonVolgendeOefening();
  startTimer();
});
