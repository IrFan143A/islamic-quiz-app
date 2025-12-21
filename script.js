const questionBank = {
  pillars: [
    {
      question: "How many pillars are there in Islam?",
      options: ["4", "5", "6", "7"],
      correct: 1,
      explanation: "There are five pillars of Islam: Shahada, Salah, Zakat, Sawm, and Hajj."
    },
    {
      question: "Which is the first pillar of Islam?",
      options: ["Salah", "Shahada", "Zakat", "Hajj"],
      correct: 1,
      explanation: "Shahada is the declaration of faith and the first pillar of Islam."
    }
  ],

  prophets: [
    {
      question: "Who was the first prophet?",
      options: ["Muhammad ﷺ", "Ibrahim (AS)", "Adam (AS)", "Nuh (AS)"],
      correct: 2,
      explanation: "Prophet Adam (AS) was the first prophet and first human."
    },
    {
      question: "Which prophet built the Kaaba?",
      options: ["Isa (AS)", "Musa (AS)", "Ibrahim (AS)", "Muhammad ﷺ"],
      correct: 2,
      explanation: "Prophet Ibrahim (AS) built the Kaaba with Ismail (AS)."
    }
  ],

  quran: [
    {
      question: "How many Surahs are in the Quran?",
      options: ["114", "120", "100", "99"],
      correct: 0,
      explanation: "The Quran contains 114 Surahs."
    },
    {
      question: "Which is the first Surah of the Quran?",
      options: ["Al-Baqarah", "Al-Fatihah", "An-Nas", "Al-Ikhlas"],
      correct: 1,
      explanation: "Surah Al-Fatihah is the first Surah of the Quran."
    }
  ]
};

let selectedCategory = "";
let questions = [];
let currentIndex = 0;
let score = 0;

const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");

const categoryBtns = document.querySelectorAll(".category-btn");
const startBtn = document.getElementById("start-btn");

const categoryTitle = document.getElementById("current-category");
const progressText = document.getElementById("progress-text");
const progressBar = document.getElementById("progress-bar");

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");

const explanationBox = document.getElementById("explanation-container");
const explanationText = document.getElementById("explanation-text");

const nextBtn = document.getElementById("next-btn");

const finalScore = document.getElementById("final-score");
const totalQuestions = document.getElementById("total-questions");
const scorePercentage = document.getElementById("score-percentage");

const retryBtn = document.getElementById("retry-btn");
const newCategoryBtn = document.getElementById("new-category-btn");

categoryBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    categoryBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedCategory = btn.dataset.category;
    startBtn.disabled = false;
  });
});

startBtn.addEventListener("click", () => {
  questions = questionBank[selectedCategory];
  currentIndex = 0;
  score = 0;

  welcomeScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  loadQuestion();
});

function loadQuestion() {
  const q = questions[currentIndex];

  categoryTitle.textContent = selectedCategory.toUpperCase();
  questionText.textContent = q.question;

  progressText.textContent = `Question ${currentIndex + 1}/${questions.length}`;
  progressBar.style.width =
    (currentIndex / questions.length) * 100 + "%";

  optionsContainer.innerHTML = "";
  explanationBox.classList.add("hidden");
  nextBtn.classList.add("hidden");

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(index);
    optionsContainer.appendChild(btn);
  });
}

function selectAnswer(selectedIndex) {
  const q = questions[currentIndex];
  const buttons = optionsContainer.querySelectorAll("button");

  buttons.forEach((btn, index) => {
    btn.disabled = true;

    if (index === q.correct) {
      btn.classList.add("correct");
    }
    if (index === selectedIndex && index !== q.correct) {
      btn.classList.add("incorrect");
    }
  });

  if (selectedIndex === q.correct) score++;

  explanationText.textContent = q.explanation;
  explanationBox.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
});

function endQuiz() {
  quizScreen.classList.add("hidden");
  resultsScreen.classList.remove("hidden");

  finalScore.textContent = score;
  totalQuestions.textContent = questions.length;

  const percent = Math.round((score / questions.length) * 100);
  scorePercentage.textContent = percent + "%";
}

retryBtn.addEventListener("click", () => {
  resultsScreen.classList.add("hidden");
  startQuizAgain();
});

function startQuizAgain() {
  currentIndex = 0;
  score = 0;
  quizScreen.classList.remove("hidden");
  loadQuestion();
}

newCategoryBtn.addEventListener("click", () => {
  resultsScreen.classList.add("hidden");
  welcomeScreen.classList.remove("hidden");
  startBtn.disabled = true;
  selectedCategory = "";
  categoryBtns.forEach(b => b.classList.remove("active"));
});
