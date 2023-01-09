# Coding-Quiz
![Screenshot of deployed webpage.](assets/images/Screenshot%20(18).png)

Visit the deployed application [Here.](https://re-gi.github.io/Coding-Quiz/)

## Description
This application generates a 5-question timed quiz and locally saves the 10 highest scores. This is a UTA Web Developement Bootcamp challenge for unit 4, made to strengthen my understanding of web APIs and the DOM.

The beginning page tells the user how to play, and displays a link to the highscores page in the left corner, the timer in the right corner, and a "Start" button in the center. When the start button in clicked, the first quiz question is diplayed and the timer starts to count down from 75. 

When a question is answered, a new one immediately displays in its place. If a question is answered incorrectly, 15 seconds are removed from the timer. The time left on the timer after the final question is answered becomes the user's score. When the quiz ends, the users score is displayed and the user is asked to enter their initials into a form. 

Once the user submits their initials, a new page loads and displays the 10 highest scores on the device used, alongside the initials for each score. If the initials and score both match a previously submitted score, those initials and score will not be duplicated. However, if the initials do not match, the new score will be added to the list even if it matches a score with different initials. The highscores list will also display a "Back" button, which will take the user back to the quiz's beginning page, and a "Clear" button, which will clear the locally stored highscores and refresh the page so that the highscores list has been cleared.

## Installation
N/A

## Usage
On the introductory page, the user can begin the quiz by clicking the "Start" button.

If the user wishes to view the current highscores list, they can do so by clicking the "Highscores List" link in the top left corner at any point on the introductory page, during the quiz, or at the end of the quiz before submitting their initials. This will take them to the "Top 10 Highscores" page.

When each question appears, the user should read the question and available choices, then click on the choice they think is the correct answer. 

![Screenshot of application with a question and 4 answer choices displayed.](assets/images/Screenshot%20(19).png)

When the game ends, the user should enter their initials into the input box and click the "submit" button to potentially save their score and initials to the highscores list(so long as it is among the 10 highest scores stored in their device). Clicking "submit" will immediately take the user to the "Top 10 Highscores" page.

![Screenshot of application with a user's score displayed as well as an empty form with a submit button.](assets/images/Screenshot%20(20).png)

### On the "Top 10 Highscores" page:
If the user wishes to clear their highscores list they should click on the "Clear" button.

If the user wishes to go back to the quiz's introductory page, they should click on the "Back" button.

![Screenshot of application with a user's top 10 highscores list displayed](assets/images/Screenshot%20(21).png)

## Liscense
Refer to liscensing in the project repository.
