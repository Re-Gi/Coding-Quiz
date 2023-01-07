var mainEl = document.querySelector("main");
var mainTitleEl = document.querySelector("h1");
var startBtnEl = document.querySelector(".big-btn");
var timeEl = document.querySelector("#timer");
var divEl = document.querySelector(".box1");
var titleEl = document.querySelector("h2");
var btnGroupEl = document.querySelector(".btn-group");
var highscoresEl = document.querySelector("#highscores-list");


//Question objects
var flowerQ = {
    question: "Which is considered a December flower?",
    choices: ["Narcissus", "Poppy", "Violet", "Larkspur"],
    answer: "Narcissus"
}

var zodiacQ = {
    question: "Which is a December zodiac sign?",
    choices: ["Capricorn", "Leo", "Cancer", "Gemini"],
    answer: "Capricorn"
}

var romanQ = {
    question: "December is the ____ month in the calendar of Romulus.",
    choices: ["10th", "12th", "7th", "1st"],
    answer: "10th"
}

var daysQ = {
    question: "How many days are in December?",
    choices: ["31", "30", "29", "32"],
    answer: "31"
}

var birthstoneQ = {
    question: "Which is considered a December birthstone?",
    choices: ["Turquoise", "Sapphire", "Diamond", "Aquamarine"],
    answer: "Turquoise"
}

//array of question objects
var questions = [flowerQ, zodiacQ, romanQ, daysQ, birthstoneQ];
var answers = [];
var clickCount = 0;
var score = 0;

startBtnEl.addEventListener("click", function() {
    mainEl.innerHTML = "";
    buildQuestions();
    startTimer();
})

function buildQuestions() {
        if (questions.length === 0) {
            scorePage();
            return;
        }

        //attaches questions to h2 element
        var randomIntQ = Math.floor(Math.random() * questions.length); 
        titleEl.textContent = questions[randomIntQ].question;
        answers.unshift(questions[randomIntQ].answer);

        //makes buttons with answer choices
        for (var j = 0; j < 4; j++) {
            var randomIntC = Math.floor(Math.random() * questions[randomIntQ].choices.length);
            var btnItemEl = document.createElement("button");
            btnItemEl.textContent = questions[randomIntQ].choices[randomIntC];
            btnGroupEl.appendChild(btnItemEl);


            questions[randomIntQ].choices.splice(randomIntC, 1);
        }
    questions.splice(randomIntQ, 1);
    console.log(answers);
}

btnGroupEl.addEventListener("click", btnClicked);

function btnClicked(event){
    clickCount++;

    if (event.target.textContent !== answers[0]) {
        secondsLeft-= 15;
    }

    titleEl.textContent = "";
    btnGroupEl.innerHTML = "";

    buildQuestions();
} 

var secondsLeft = 75;
timeEl.textContent = secondsLeft;

function startTimer() {
    var timerInterval = setInterval(function() {
        if (clickCount === 5){
            clearInterval(timerInterval);
            return;
        } else if(secondsLeft === 0) {
            divEl.innerHTML = "";
            scorePage();
            clearInterval(timerInterval);
            return;
        }

        secondsLeft--;
        timeEl.textContent = secondsLeft;
    }, 1000);
}

function scorePage() {
    score += secondsLeft;
    timeEl.textContent = "";

    mainTitleEl.textContent = "Your Score: " + score;
    mainEl.appendChild(mainTitleEl);

    var formEl = document.createElement("form");
    // formEl.setAttribute("action", "./assets/highscores.html");
    mainEl.appendChild(formEl);

    var labelEl = document.createElement("label");
    labelEl.setAttribute("for", "initials");
    labelEl.textContent = "Enter initials:";
    formEl.appendChild(labelEl);

    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("id", "initials");
    formEl.appendChild(inputEl);

    var submitBtnEl = document.createElement("button");
    submitBtnEl.setAttribute("class", "big-btn");
    submitBtnEl.textContent = "submit";
    mainEl.appendChild(submitBtnEl);
    

    submitBtnEl.addEventListener("click", function() {
        if (inputEl.value === "") {
            alert("Please input your initials!");
            return;
        }
        var newScore = {
            userInitials: inputEl.value,
            userScore: score
        };

        var latestScore = JSON.parse(localStorage.getItem("newScore"));
        console.log(latestScore);
        if (latestScore === null || latestScore.userScore < newScore.userScore) {
            localStorage.setItem("newScore", JSON.stringify(newScore));
          }

        window.location.assign("./assets/highscores.html");
    })
}