// Simulate Login to Redirect to Home Page
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("login-form")) {
        document.getElementById("login-form").addEventListener("submit", function(e) {
            e.preventDefault();
            console.log("Simulated login successful");
            window.location.href = "home.html";
        });
    }
});

// Simulate Signup Redirect
if (document.getElementById("signup-form")) {
    document.getElementById("signup-form").addEventListener("submit", function(e) {
        e.preventDefault();
        window.location.href = "home.html";
    });
}

// Sidebar Toggle Logic
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");

// Toggle sidebar when clicking the menu button
menuBtn.addEventListener("click", function(event) {
    sidebar.classList.toggle("hidden");
    event.stopPropagation(); // Prevent event from bubbling to the document
});

// Close sidebar when clicking outside the sidebar
document.addEventListener("click", function(event) {
    const isClickInsideMenu = sidebar.contains(event.target) || menuBtn.contains(event.target);
    if (!isClickInsideMenu && !sidebar.classList.contains("hidden")) {
        sidebar.classList.add("hidden");
    }
});

// Add Topics Logic
if (document.getElementById("add-topic")) {
    document.getElementById("add-topic").addEventListener("click", function() {
        const topicInput = document.getElementById("topic-input");
        const topic = topicInput.value.trim();

        if (topic) {
            const li = document.createElement("li");
            li.textContent = topic;
            document.getElementById("topics-list").appendChild(li);
            topicInput.value = "";
        }
    });
}

// Dummy data for subjects and units
const subjectsData = {
    "Generative AI": ["Unit 1: Introduction", "Unit 2: Basics", "Unit 3: Applications"],
    "Machine Learning": ["Unit 1: Supervised Learning", "Unit 2: Unsupervised Learning"],
};

// Function to populate subjects dropdown
window.onload = function() {
    const subjectSelect = document.getElementById("subject");
    for (const subject in subjectsData) {
        const option = document.createElement("option");
        option.value = subject;
        option.textContent = subject;
        subjectSelect.appendChild(option);
    }
};

document.addEventListener("DOMContentLoaded", function() {
    // Populate the subjects dropdown
    const subjectSelect = document.getElementById("subject");
    for (const subject in subjectsData) {
        const option = document.createElement("option");
        option.value = subject;
        option.textContent = subject;
        subjectSelect.appendChild(option);
    }
});

// Populate units based on subject
function populateUnits() {
    const subject = document.getElementById("subject").value;
    const unitSelect = document.getElementById("unit");
    unitSelect.innerHTML = '<option value="">--Select Unit--</option>'; // Reset

    if (subject) {
        subjectsData[subject].forEach(unit => {
            const option = document.createElement("option");
            option.value = unit;
            option.textContent = unit;
            unitSelect.appendChild(option);
        });
    }
}

// Navigate to the quiz page
function navigateToQuiz() {
    const subject = document.getElementById("subject").value;
    const unit = document.getElementById("unit").value;

    if (!subject || !unit) {
        alert("Please select both subject and unit.");
        return;
    }

    // Pass data via URL parameters
    window.location.href = `quiz-page.html?subject=${encodeURIComponent(subject)}&unit=${encodeURIComponent(unit)}`;
}

// Parse URL parameters on the quiz page
function loadQuizPage() {
    const params = new URLSearchParams(window.location.search);
    const subject = params.get("subject");
    const unit = params.get("unit");

    if (subject && unit) {
        document.querySelector("h1").textContent = `Quiz: ${subject} - ${unit}`;
        // Load questions dynamically (replace with backend call as needed)
        const quizForm = document.getElementById("quiz-form");
        for (let i = 1; i <= 5; i++) {
            const questionContainer = document.createElement("div");
            questionContainer.className = "quiz-question";
            questionContainer.innerHTML = `
                <h3>Question ${i}</h3>
                <label><input type="radio" name="q${i}" value="A"> Option A</label><br>
                <label><input type="radio" name="q${i}" value="B"> Option B</label><br>
                <label><input type="radio" name="q${i}" value="C"> Option C</label><br>
                <label><input type="radio" name="q${i}" value="D"> Option D</label>
            `;
            quizForm.appendChild(questionContainer);
        }
    }
}


// Start Quiz
/*function startQuiz() {
    const subject = document.getElementById("subject").value;
    const unit = document.getElementById("unit").value;
    if (!subject || !unit) {
        alert("Please select both subject and unit!");
        return;
    }

    // Hide setup section and show quiz container
    document.getElementById("quiz-setup").classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");

    // Fetch questions from the backend (here, simulated with dummy data)
    displayQuestions([
        { question: "What is Generative AI?", options: ["A", "B", "C", "D"] },
        { question: "What is Machine Learning?", options: ["X", "Y", "Z", "W"] }
    ]);
} */

// Display Questions
function displayQuestions(questions) {
    const quizForm = document.getElementById("quiz-form");
    quizForm.innerHTML = ""; // Clear previous content

    questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("quiz-question");

        const questionTitle = document.createElement("h3");
        questionTitle.textContent = `${index + 1}. ${q.question}`;
        questionDiv.appendChild(questionTitle);

        q.options.forEach(option => {
            const optionLabel = document.createElement("label");
            const optionInput = document.createElement("input");
            optionInput.type = "radio";
            optionInput.name = `question-${index}`;
            optionInput.value = option;

            optionLabel.appendChild(optionInput);
            optionLabel.appendChild(document.createTextNode(option));
            questionDiv.appendChild(optionLabel);
            questionDiv.appendChild(document.createElement("br"));
        });

        quizForm.appendChild(questionDiv);
    });
}

// End Quiz
function endQuiz() {
    alert("Quiz ended. Your responses have been submitted.");
    window.location.href = "quiz-history.html";
}

// Dummy data for quiz history and performance
const quizHistoryData = [
    {
        subject: "Generative AI",
        unit: "Unit 1: Introduction",
        questions: [
            { question: "What is AI?", userAnswer: "B", correctAnswer: "A" },
            { question: "What is ML?", userAnswer: "C", correctAnswer: "C" },
        ]
    },
    {
        subject: "Machine Learning",
        unit: "Unit 2: Unsupervised Learning",
        questions: [
            { question: "What is clustering?", userAnswer: "A", correctAnswer: "A" },
            { question: "What is PCA?", userAnswer: "D", correctAnswer: "C" },
        ]
    }
];

const performanceSummary = {
    score: "80%",
    strengthTopics: ["AI Basics", "Clustering"],
    weaknessTopics: ["Introduction to PCA"]
};

// Load quiz history and performance
window.onload = function() {
    loadQuizHistory();
    loadPerformanceSummary();
};

function loadQuizHistory() {
    const historyList = document.getElementById("quiz-history-list");
    historyList.innerHTML = ""; // Clear previous content

    quizHistoryData.forEach(record => {
        const subjectHeader = document.createElement("h3");
        subjectHeader.textContent = `${record.subject} - ${record.unit}`;
        historyList.appendChild(subjectHeader);

        record.questions.forEach(q => {
            const questionDiv = document.createElement("div");
            const isCorrect = q.userAnswer === q.correctAnswer;

            questionDiv.innerHTML = `
                <p><strong>${q.question}</strong></p>
                <p>Your Answer: <span class="${isCorrect ? 'correct-answer' : 'wrong-answer'}">${q.userAnswer}</span></p>
                ${!isCorrect ? `<p>Correct Answer: <span class="correct-highlight">${q.correctAnswer}</span></p>` : ""}
            `;
            historyList.appendChild(questionDiv);
        });
    });
}

function loadPerformanceSummary() {
    document.getElementById("quiz-score").textContent = performanceSummary.score;

    const strengthList = document.getElementById("strength-list");
    performanceSummary.strengthTopics.forEach(topic => {
        const li = document.createElement("li");
        li.textContent = topic;
        strengthList.appendChild(li);
    });

    const weaknessList = document.getElementById("weakness-list");
    performanceSummary.weaknessTopics.forEach(topic => {
        const li = document.createElement("li");
        li.textContent = topic;
        weaknessList.appendChild(li);
    });
}

function retakeWeaknessQuiz() {
    window.location.href = "quiz-page.html";
}
