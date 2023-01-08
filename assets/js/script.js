var mainEl = document.querySelector("main");
var mainTitleEl = document.querySelector("h1");
var startBtnEl = document.querySelector("#start-btn");
var timeEl = document.querySelector("#timer");
var divEl = document.querySelector(".box1");
var titleEl = document.querySelector("h2");
var btnGroupEl = document.querySelector(".btn-group");
var highscoresEl = document.querySelector("#highscores-list");
var formEl = document.querySelector("form");
var formTitleEl = document.querySelector("#form-title");
var labelEl = document.querySelector("label");
var inputEl = document.querySelector("#initials");
var submitBtnEl = document.querySelector("#submit-btn");

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
        newScore.userScore += secondsLeft;
        timeEl.textContent = "";

        formEl.setAttribute("style", "display: block;");

        formTitleEl.textContent = "Your Score: " + newScore.userScore;
        labelEl.textContent = "Enter initials:";
        submitBtnEl.textContent = "submit";
        

        submitBtnEl.addEventListener("click", function(event) {
            event.preventDefault();
            
            if (inputEl.value === "") {
                alert("Please input your initials!");
                return;
            } else {
                newScore.userInitials = inputEl.value;
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
            listItemEl.textContent = latestScores.initials[i] + " / " + latestScores.scores[i] + "pts";
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

if (window.location.href === "file:///C:/Users/user/bootcamp/challenges/4Challenge/assets/highscores.html") {
    highscoresInit();
} else {
    indexInit();
}
