var mainEl = document.querySelector("main");
var mainTitleEl = document.querySelector("h1");
var startBtnEl = document.querySelector(".big-btn");
var timeEl = document.querySelector("#timer");
var divEl = document.querySelector(".box1");
var titleEl = document.querySelector("h2");
var btnGroupEl = document.querySelector(".btn-group");


//Question objects
var flowerQ = {
    question: "Which is considered a December flower?",
    choices: ["Narcissus", "Poppy", "Violet", "Larkspur"],
    answer: "narcissus"
}

var zodiacQ = {
    question: "Which is a December zodiac sign?",
    choices: ["Capricorn", "Leo", "Cancer", "Gemini"],
    answer: "capricorn"
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
    answer: "turquoise"
}

//array of question objects
var questions = [flowerQ, zodiacQ, romanQ, daysQ, birthstoneQ];
var score = 0;

startBtnEl.addEventListener("click", function() {
    mainEl.innerHTML = "";
    buildQuestions();
    startTimer();
})

function buildQuestions() {
    for (var i = 0; i < 5; i++) {
        if (questions.length === 0) {
            scorePage();
            break;
        }

        //attaches questions to h2 element
        var randomIntQ = Math.floor(Math.random() * questions.length); 
        titleEl.textContent = questions[randomIntQ].question;

        //makes buttons with answer choices
        for (var j = 0; j < 4; j++) {
            var randomIntC = Math.floor(Math.random() * questions[randomIntQ].choices.length);
            var btnItemEl = document.createElement("button");
            btnItemEl.textContent = questions[randomIntQ].choices[randomIntC];
            btnGroupEl.appendChild(btnItemEl);

            questions[randomIntQ].choices.splice(randomIntC, 1);
        }
        questions.splice(randomIntQ, 1);

        break;
    }
}

btnGroupEl.addEventListener("click", btnClicked);

function btnClicked(event){
    var userAnswer = event.target.textContent;
    // if (userAnswer == )
    console.log(userAnswer);

    titleEl.textContent = "";
    btnGroupEl.innerHTML = "";

    buildQuestions();
} 

var secondsLeft = 75;
timeEl.textContent = secondsLeft;

function startTimer() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if(secondsLeft === 0) {
            divEl.innerHTML = "";
            scorePage();
            clearInterval(timerInterval);
        // } else if (){
        //     clearInterval(timerInterval);
        }
    }, 1000);
}

function scorePage() {
    mainTitleEl.textContent = "Your Score:";
    mainEl.appendChild(mainTitleEl);

    var nextBtnEl = document.createElement("button");
    nextBtnEl.setAttribute("class", "big-btn");
    nextBtnEl.textContent = "Next";
    mainEl.appendChild(nextBtnEl);

    nextBtnEl.addEventListener("click", function() {
        window.location.assign("./index2.html");
    })
}

