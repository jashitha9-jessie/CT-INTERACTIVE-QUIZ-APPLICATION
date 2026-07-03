const welcomeScreen = document.querySelector(".welcome-screen");
const quizScreen = document.querySelector(".quiz-screen");
const startBtn = document.getElementById("startBtn");

let currentQuestion = 0;
let score = 0;

// Start Quiz
startBtn.addEventListener("click", () => {
    welcomeScreen.style.display = "none";
    quizScreen.style.display = "block";
    loadQuestion();
});

// Load Question
function loadQuestion() {

    const q = questions[currentQuestion];

    quizScreen.innerHTML = `
        <h2>Question ${currentQuestion + 1} of ${questions.length}</h2>

        <progress value="${currentQuestion + 1}" max="${questions.length}"></progress>

        <h3>${q.question}</h3>

        <div class="options">
            ${q.options.map((option, index) => `
                <button class="option-btn" onclick="checkAnswer(${index})">
                    ${option}
                </button>
            `).join("")}
        </div>

        <p id="feedback"></p>

        <h3>Score : ${score} / ${questions.length}</h3>
    `;
}

// Check Answer
function checkAnswer(selectedIndex) {

    const buttons = document.querySelectorAll(".option-btn");
    const feedback = document.getElementById("feedback");

    buttons.forEach(button => button.disabled = true);

    const correctAnswer = questions[currentQuestion].answer;

    if (selectedIndex === correctAnswer) {

        buttons[selectedIndex].style.background = "#2ecc71";

        feedback.innerHTML = "✅ Correct Answer!";
        feedback.style.color = "#2ecc71";

        score++;

    } else {

        buttons[selectedIndex].style.background = "#e74c3c";
        buttons[correctAnswer].style.background = "#2ecc71";

        feedback.innerHTML = `
            ❌ Wrong Answer! <br><br>
            Correct Answer: <b>${questions[currentQuestion].options[correctAnswer]}</b>
        `;
        feedback.style.color = "#ffeb3b";
    }

    setTimeout(() => {

        currentQuestion++;

        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }

    }, 2000);
}

// Show Result
function showResult() {

    const percentage = Math.round((score / questions.length) * 100);

    let message = "";

    if (percentage >= 90) {
        message = "🏆 Excellent!";
    } else if (percentage >= 70) {
        message = "🎉 Very Good!";
    } else if (percentage >= 50) {
        message = "👍 Good Job!";
    } else {
        message = "📚 Keep Practicing!";
    }

    quizScreen.innerHTML = `
        <div class="result-box">

            <h1>🎉 Quiz Completed</h1>

            <h2>Your Score</h2>

            <h1>${score} / ${questions.length}</h1>

            <h2>${percentage}%</h2>

            <h3>${message}</h3>

            <button id="restartBtn">Restart Quiz</button>

        </div>
    `;

    document.getElementById("restartBtn").addEventListener("click", () => {

        currentQuestion = 0;
        score = 0;

        loadQuestion();

    });
}