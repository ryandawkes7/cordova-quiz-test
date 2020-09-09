// Get start button in index.html via its ID
const startButton = document.getElementById('start-btn');

// Get next button in index.html via its ID
const nextButton = document.getElementById('next-btn');

// Get question container in index.html via its ID
const questionContainerElements = document.getElementById('question-container');

// Get singular question in 'questions' array via its ID
const questionElement = document.getElementById('question');

const answerButtonsElement = document.getElementById('answer-btns');

// Variable for storing my score
let myScore;

// Variable for shuffling and indexing the current question
// Can't be const as the value must be changed in order for the shuffling and indexing to work
let shuffledQuestions, currentQuestionIndex;

// Pressing start button runs the 'startGame' function
startButton.addEventListener('click', startGame);
// Pressing the next button loads in the next set of questions from the questions array
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})

// When start button is pressed, the 'startGame' function is executed
startButton.addEventListener('click', startGame)

// Function to hide 'Start' button and display the first set of questions`
function startGame() {
    console.log('Started');

    // Adds '.hide' from index.css to the start button - hides the start button
    startButton.classList.add('hide');

    // Component to take all parameters of questions array and randomly sort them
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;

    //Sets current score to 0
    myScore = 0;

    // Removes '.hide' from index.css to the question container - displays the question container
    questionContainerElements.classList.remove('hide');
    setNextQuestion();

}

// Function for adding points
function addPoint(){

    // Retrieves the score text field from index.html
    const scoreValue = document.getElementById('score-text');
    // Sets text score value to the myScore value
    scoreValue.innerText = myScore;

    // Adds one point to current score
    myScore += 1;
}

function setNextQuestion(){
    resetState();

    // Shows the next question by randomly sifting through the questions array via the current question index
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    // Replaces the question element in the index.html with a randomly selected question from the 'questions' array
    questionElement.innerText = question.question;

    // Creates an answer function for each answer
    question.answers.forEach(answer => {
        // Variable that creates a button element for the answers from the 'questions' array
        const button = document.createElement('button');
        // Replaces the default text in the button with the answer text string
        button.innerText = answer.text;
        // Adds 'btn' styling from index.css to the newly created answer button
        button.classList.add('btn');

        // Checks if button is correct via the boolean attribute in 'questions' array
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }

        // When button is clicked, the 'selectAnswer' function is executed
        button.addEventListener('click', selectAnswer);
        // Appends/adds this element to the 'answerButtonsElement'
        answerButtonsElement.appendChild(button);

        if(selectAnswer && question.correct === true){
            addPoint();
            console.log("+1 Point");
        }
    })
}

// Function to reset the state of the question template on each new question
function resetState(){

    // Reset body background colour
    clearStatusClass(document.body);

    // Applies '.hide' from css to buttons from the previous question
    nextButton.classList.add('hide');

    // Loop through all children for answer button elements
    // Essentially, if there is a child inside of 'answerButtonsElement', this will remove it
    while(answerButtonsElement.firstChild){
        // Removes the children of the answerButtonsElement from the previous question
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Function for when user selects an answer
function selectAnswer(e){
    // Variable that uses 'e.target' that represents whatever button the user has clicked on...
    // ...This is pulled from the 'button.addEventListener' parameter from 'showQuestion' function
    const selectedButton = e.target;
    // Variable to check if selected button is correct
    const correct = selectedButton.dataset.correct;

    // Takes body of index.html and determines whether it should be set to correct or incorrect
    setStatusClass(document.body, correct);
    // Loops through all other buttons and sets the class for them
    Array.from(answerButtonsElement.children).forEach(button => {
        // Sets status of button based on if that answer was the correct answer
        setStatusClass(button, button.dataset.correct);
    });
    //If there are still question left to answer, then allow the user to select the next button after a question
    if(shuffledQuestions.length > currentQuestionIndex + 1) {
        // Removes the '.hide' class from the next button
        nextButton.classList.remove('hide');
        // Else if there are no questions left, the user can only select the restart quiz
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }

}

function setStatusClass(element, correct){
    // Clears any status that the button has already
    clearStatusClass(element)

    // If this is correct, then add the 'correct' class
    if(correct){
        element.classList.add('correct');
        console.log("You are correct!");
        // If it is incorrect, then add the 'wrong' class
    } else {
        element.classList.add('wrong');
        console.log("You are incorrect!");
    }
}

// Function to remove status (classes) from the buttons
function clearStatusClass(element){
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

// Array storing all pre-set questions
const questions = [
    {
        // Question
        question: 'What is 2 + 2?',
        // Array storing possible answers for specific questions
        answers: [
            // Parameter including an answer as a text string, and a boolean determining if it is correct
            { text: '4', correct: true },
            { text: '5', correct: false },
            { text: '6', correct: false },
            { text: '8', correct: false }
        ]
    },
    {
        // Question
        question: 'How many countries in the UK?',
        // Array storing possible answers for specific questions
        answers: [
            // Parameter including an answer as a text string, and a boolean determining if it is correct
            { text: '1', correct: false },
            { text: '9', correct: false },
            { text: '6', correct: false },
            { text: '4', correct: true }
        ]
    },
    {
        // Question
        question: 'What is the year?',
        // Array storing possible answers for specific questions
        answers: [
            // Parameter including an answer as a text string, and a boolean determining if it is correct
            { text: '2018', correct: false },
            { text: '2030', correct: false },
            { text: '2020', correct: true },
            { text: '1698', correct: false }
        ]
    },
    {
        // Question
        question: 'What did Ryan study?',
        // Array storing possible answers for specific questions
        answers: [
            // Parameter including an answer as a text string, and a boolean determining if it is correct
            { text: 'Economics', correct: false },
            { text: 'Digital Media', correct: true },
            { text: 'Science', correct: false },
            { text: 'Sport', correct: false }
        ]
    }
]
