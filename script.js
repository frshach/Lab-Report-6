let questions = [
    {
        question: "What does HTML stand for?",
        options: ["HyperText Markup Language", "HighText Machine Language", "Hyperloop Machine Language", "None"],
        answer: 0
    },
    {
        question: "Which language styles web pages?",
        options: ["HTML", "CSS", "Java", "Python"],
        answer: 1
    },
    {
        question: "Which is used for web interactivity?",
        options: ["HTML", "CSS", "JavaScript", "PHP"],
        answer: 2
    },
    {
        question: "What symbol is used for ID in CSS?",
        options: [".", "#", "*", "&"],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;
let time = 10;
let timer;

// Shuffle questions
function shuffleQuestions() {
    questions.sort(() => Math.random() - 0.5);
}

// Start timer
function startTimer() {
    clearInterval(timer);
    time = 10;
    document.getElementById("time").textContent = time;

    timer = setInterval(() => {
        time--;
        document.getElementById("time").textContent = time;

        if (time == 0) {
            clearInterval(timer);
            showFeedback("⏰ Time is up!", "red");
            document.getElementById("nextBtn").style.display = "block";
            let buttons = document.getElementsByClassName("option");
            for (let btn of buttons) btn.disabled = true;
        }
    }, 1000);
}

// Display Question
function displayQuestion() {
    let q = questions[currentQuestion];
    document.getElementById("question").textContent = q.question;

    let buttons = document.getElementsByClassName("option");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].textContent = q.options[i];
        buttons[i].disabled = false;
    }

    document.getElementById("feedback").textContent = "";
    document.getElementById("nextBtn").style.display = "none";

    startTimer();
}

// Check answer
function checkAnswer(selected) {
    let correct = questions[currentQuestion].answer;
    let correctText = questions[currentQuestion].options[correct];
    let buttons = document.getElementsByClassName("option");

    for (let btn of buttons) btn.disabled = true;
    clearInterval(timer);

    if (selected === correct) {
        score++;
        showFeedback("✅ Correct!", "green");
    } else {
        showFeedback("❌ Wrong! The correct answer is: " + correctText, "red");
    }

    document.getElementById("score").textContent = "Score: " + score;
    document.getElementById("nextBtn").style.display = "block";
}

// Next Question
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

// Start quiz
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("score").textContent = "Score: 0";
    document.getElementById("startBtn").disabled = true;
    shuffleQuestions();
    displayQuestion();
}

// Show feedback
function showFeedback(text, color) {
    let fb = document.getElementById("feedback");
    fb.textContent = text;
    fb.style.color = color;
}

// End Quiz
function endQuiz() {
    document.querySelector(".quiz-container").innerHTML = 
    `<h2>Quiz Finished!</h2>
     <p>Your final score is: ${score} / ${questions.length}</p>`;
}
