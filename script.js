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
      explanation: "Shahada is the declaration of faith."
    },
    {
      question: "Which pillar involves fasting?",
      options: ["Zakat", "Hajj", "Sawm", "Salah"],
      correct: 2,
      explanation: "Sawm means fasting during the month of Ramadan."
    },
    {
      question: "Which pillar is obligatory once in a lifetime if able?",
      options: ["Zakat", "Hajj", "Salah", "Shahada"],
      correct: 1,
      explanation: "Hajj is obligatory once in a lifetime if physically and financially able."
    },
    {
      question: "How many daily prayers are obligatory?",
      options: ["3", "4", "5", "6"],
      correct: 2,
      explanation: "There are five obligatory daily prayers."
    }
  ],

  prophets: [
    {
      question: "Who was the first prophet?",
      options: ["Muhammad ﷺ", "Ibrahim (AS)", "Adam (AS)", "Nuh (AS)"],
      correct: 2,
      explanation: "Prophet Adam (AS) was the first prophet."
    },
    {
      question: "Which prophet built the Kaaba?",
      options: ["Isa (AS)", "Musa (AS)", "Ibrahim (AS)", "Muhammad ﷺ"],
      correct: 2,
      explanation: "Prophet Ibrahim (AS) built the Kaaba."
    },
    {
      question: "Who was the last prophet?",
      options: ["Isa (AS)", "Muhammad ﷺ", "Musa (AS)", "Nuh (AS)"],
      correct: 1,
      explanation: "Prophet Muhammad ﷺ is the last prophet."
    },
    {
      question: "Which prophet was swallowed by a whale?",
      options: ["Yunus (AS)", "Ayyub (AS)", "Yusuf (AS)", "Hud (AS)"],
      correct: 0,
      explanation: "Prophet Yunus (AS) was swallowed by a whale."
    },
    {
      question: "Which prophet could interpret dreams?",
      options: ["Yusuf (AS)", "Isa (AS)", "Musa (AS)", "Ibrahim (AS)"],
      correct: 0,
      explanation: "Prophet Yusuf (AS) was known for dream interpretation."
    }
  ],

  quran: [
    {
      question: "How many Surahs are in the Quran?",
      options: ["114", "120", "100", "99"],
      correct: 0,
      explanation: "The Quran has 114 Surahs."
    },
    {
      question: "Which is the first Surah of the Quran?",
      options: ["Al-Baqarah", "Al-Fatihah", "An-Nas", "Al-Ikhlas"],
      correct: 1,
      explanation: "Al-Fatihah is the first Surah."
    },
    {
      question: "Which Surah is the longest?",
      options: ["Al-Fatihah", "Al-Baqarah", "Al-Imran", "An-Nisa"],
      correct: 1,
      explanation: "Surah Al-Baqarah is the longest Surah."
    },
    {
      question: "Which Surah is called the heart of the Quran?",
      options: ["Ya-Sin", "Ar-Rahman", "Al-Ikhlas", "Al-Kahf"],
      correct: 0,
      explanation: "Surah Ya-Sin is known as the heart of the Quran."
    },
    {
      question: "In which language was the Quran revealed?",
      options: ["Urdu", "Persian", "Arabic", "Hebrew"],
      correct: 2,
      explanation: "The Quran was revealed in Arabic."
    }
  ],

  history: [
    {
      question: "In which year did Hijrah occur?",
      options: ["610 AD", "622 AD", "630 AD", "632 AD"],
      correct: 1,
      explanation: "Hijrah took place in 622 AD."
    },
    {
      question: "Which city was the first capital of Islam?",
      options: ["Makkah", "Madinah", "Jerusalem", "Kufa"],
      correct: 1,
      explanation: "Madinah was the first capital of the Islamic state."
    },
    {
      question: "Who was the first Caliph of Islam?",
      options: ["Umar (RA)", "Ali (RA)", "Abu Bakr (RA)", "Usman (RA)"],
      correct: 2,
      explanation: "Hazrat Abu Bakr (RA) was the first Caliph."
    },
    {
      question: "Which battle was the first battle in Islam?",
      options: ["Uhud", "Badr", "Khandaq", "Hunain"],
      correct: 1,
      explanation: "Battle of Badr was the first battle in Islam."
    },
    {
      question: "When was Makkah conquered?",
      options: ["6 AH", "7 AH", "8 AH", "9 AH"],
      correct: 2,
      explanation: "Makkah was conquered in 8 AH."
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

