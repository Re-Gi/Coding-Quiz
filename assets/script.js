var sectionEl = document.querySelector("section");
var divEl = document.querySelector(".box1");
var btnGroupEl = document.querySelector(".btn-group");
var titleEl = document.querySelector("h2");

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
    choices: ["31", "30", "29", "It changes each year"],
    answer: "31"
}

var birthstoneQ = {
    question: "Which is considered a December birthstone?",
    choices: ["Turquoise", "Sapphire", "Diamond", "Aquamarine"],
    answer: "turquoise"
}

//array of question objects
var questions = [flowerQ, zodiacQ, romanQ, daysQ, birthstoneQ];

console.log(questions);

for (var i = 0; i < 5; i++) {
    var randomIntQ = Math.floor(Math.random() * questions.length);
    titleEl.textContent = questions[randomIntQ].question;

    for (var i = 0; i < 4; i++) {
        var randomIntC = Math.floor(Math.random() * questions[randomIntQ].choices.length);
        var btnItemEl = document.createElement("button");
        btnItemEl.textContent = questions[randomIntQ].choices[randomIntC];
        btnGroupEl.appendChild(btnItemEl);

        questions[randomIntQ].choices.splice(randomIntC, 1);
    }

    questions.splice(randomIntQ, 1);
}