var listEl = document.querySelector("#highscores-list");
var clearEl = document.querySelector("#clear-btn");

var latestScore = JSON.parse(localStorage.getItem("newScore"));

console.log(latestScore);

if (latestScore !== null) {
    var listItemEl = document.createElement("li");
    listEl.appendChild(listItemEl);
    listItemEl.textContent = latestScore.userInitials + " / " + latestScore.userScore + "pts";
}

clearEl.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})