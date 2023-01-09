var mainEl = document.querySelector("main");
var mainTitleEl = document.querySelector("#main-title");
var startBtnEl = document.querySelector("#start-btn");
var timeEl = document.querySelector("#timer");
var divEl = document.querySelector(".box1");
var sectionTitleEl = document.querySelector("#questions-title");
var btnGroupEl = document.querySelector(".btn-group");
var highscoresEl = document.querySelector("#highscores-list");
var formEl = document.querySelector("form");
var formTitleEl = document.querySelector("#form-title");
var labelEl = document.querySelector("label");
var inputEl = document.querySelector("#initials");
var submitBtnEl = document.querySelector("#submit-btn");

//Question objects
var dataQ = {
    question: "Commonly used data-types DO Not Include:",
    choices: ["booleans", "strings", "numbers", "alerts"],
    answer: "alerts"
}

var conditionQ = {
    question: "The condition in an if / else statement is enclosed with _____.",
    choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    answer: "parenthesis"
}

var arraysQ = {
    question: "Arrays in JavaScript can be used to store _____.",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above"
}

var stringsQ = {
    question: "String values must be enclosed within _____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "commas"
}

var debuggingQ = {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    answer: "console.log"
}

//array of question objects
var questions = [dataQ, conditionQ, arraysQ, stringsQ, debuggingQ];
var answers = [];
var clickCount = 0;

var highscores = {
    initials: [],
    scores: []
};

var latestScores = JSON.parse(localStorage.getItem("highscores"));
console.log(latestScores);

// runs when the window is on index.html
function indexInit() {

    var newScore = {
        userInitials: inputEl.value,
        userScore: 0
    };

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
            sectionTitleEl.textContent = questions[randomIntQ].question;
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
    }

    btnGroupEl.addEventListener("click", btnClicked);

    function btnClicked(event){
        clickCount++;

        if (event.target.textContent !== answers[0]) {
            secondsLeft-= 15;
        }

        sectionTitleEl.textContent = "";
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
        newScore.userScore += secondsLeft;
        timeEl.textContent = secondsLeft;

        formEl.setAttribute("style", "display: block;");

        formTitleEl.textContent = "Your Score: " + newScore.userScore;
        labelEl.textContent = "enter initials:";
        submitBtnEl.textContent = "submit";
        

        submitBtnEl.addEventListener("click", function(event) {
            event.preventDefault();
            
            if (inputEl.value === "") {
                alert("Please input your initials!");
                return;
            } else {
                newScore.userInitials = inputEl.value.toUpperCase();
            }
        
            console.log(newScore);
            console.log(latestScores);
         
            if(latestScores === null) {
                highscores.scores.push(newScore.userScore);
                highscores.initials.push(newScore.userInitials);

                localStorage.setItem("highscores", JSON.stringify(highscores));
            } else if(latestScores.scores.length < 10) {
                for (var i = 0; i <= 10; i++) {
                    if(newScore.userInitials === latestScores.initials[i] && newScore.userScore === latestScores.scores[i]) {
                        break;
                    } else if(newScore.userScore > latestScores.scores[i]) {
                        latestScores.scores.splice(i, 0, newScore.userScore);
                        latestScores.initials.splice(i, 0, newScore.userInitials);

                        localStorage.setItem("highscores", JSON.stringify(latestScores));
                        break;
                    } else if(i === 10) {
                        latestScores.scores.push(newScore.userScore);
                        latestScores.initials.push(newScore.userInitials);

                        localStorage.setItem("highscores", JSON.stringify(latestScores));
                    }
                }    
             } else {
                for (var j = 0; j <= 10; j++) {
                    if(newScore.userInitials === latestScores.initials[j] && newScore.userScore === latestScores.scores[j]) {
                        break;
                    } else if(newScore.userScore > latestScores.scores[j]){
    
                        latestScores.scores.splice(j, 0, newScore.userScore);
                        latestScores.initials.splice(j, 0, newScore.userInitials);
    
                        latestScores.scores.pop();
                        latestScores.initials.pop();
    
                        localStorage.setItem("highscores", JSON.stringify(latestScores));
                        console.log(latestScores);
                        break;
                    }
                }
            }
            window.location.assign("./assets/highscores.html");
        })
    }
}

var listEl = document.querySelector("#highscores-list");
var clearEl = document.querySelector("#clear-btn");

// runs when window is on highscores.html
function highscoresInit() {

    if (latestScores !== null) {
        for (var i = 0; i < 10; i++) {
            if(latestScores.scores[i] !== undefined){
            var listItemEl = document.createElement("li");
            listEl.appendChild(listItemEl);
            listItemEl.textContent = latestScores.initials[i] + " | " + latestScores.scores[i] + "pts";
            } else {
                break;
            }
        }
    } else {

    }

    clearEl.addEventListener("click", function(){
        localStorage.clear();
        location.reload();
    })
}

if (window.location.pathname.includes("highscores") === true) {
    highscoresInit();
} else {
    indexInit();
}
