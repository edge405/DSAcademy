const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCount = 0;
let availableQuestions = [];

let questions = [{
    question: 'What is a structure in C?',
    choice1: 'A user-defined data type that combines data items of different kinds',
    choice2: 'A way to combine data items of the same kind',
    choice3: 'A built-in data type in C',
    choice4: 'A way to access array elements',
    answer: 1
    },
    {
    question: 'How do you define a structure in C?',
    choice1: 'Using the \'int\' keyword',
    choice2: 'Using the \'char\' keyword',
    choice3: 'Using the \'struct\' keyword',
    choice4: 'Using the \'float\' keyword',
    answer: 3
    },
    {
        question: 'How do you access the members of a structure in C?',
        choice1: 'Using the \'&\' operator',
        choice2: 'Using the \'.\' operator',
        choice3: 'Using the \'+\' operator',
        choice4: 'Using the \'*\' operator',
        answer: 2
    },
    {
        question: 'How can you initialize a structure at the time of declaration?',
        choice1: 'By providing values for the members in curly braces',
        choice2: 'By using the \'struct\' keyword',
        choice3: 'By using the \'initialize\' keyword',
        choice4: 'By declaring a variable of the structure type',
        answer: 1
    },
    {
        question: 'What are arrays of structures used for?',
        choice1: 'Storing multiple records of different types',
        choice2: 'Accessing individual structure members',
        choice3: 'Storing multiple records of the same type',
        choice4: 'Declaring multiple structure variables',
        answer: 3
    },
    {
        question: 'What is the purpose of nested structures in C?',
        choice1: 'To access members of a structure',
        choice2: 'To group related data together in a hierarchical manner',
        choice3: 'To create arrays of structures',
        choice4: 'To define functions within structures',
        answer: 2
    },
    {
        question: 'How do you pass a structure to a function by value?',
        choice1: 'By copying the structure\'s contents to the function',
        choice2: 'By using the \'.\' operator',
        choice3: 'By using the \'*\' operator',
        choice4: 'By passing the address of the structure to the function',
        answer: 1
        },
        {
        question: 'How do you pass a structure to a function by reference?',
        choice1: 'By using the \'.\' operator',
        choice2: 'By copying the structure\'s contents to the function',
        choice3: 'By passing the address of the structure to the function',
        choice4: 'By using the \'*\' operator',
        answer: 4
        },
        {
            question: 'What happens when you pass a structure to a function by value?',
            choice1: 'The function modifies the original structure directly',
            choice2: 'The function receives a copy of the structure',
            choice3: 'The structure is inaccessible within the function',
            choice4: 'The function cannot receive structures as arguments',
            answer: 2
        },
        {
            question: 'What happens when you pass a structure to a function by reference?',
            choice1: 'The function receives a copy of the structure',
            choice2: 'The structure becomes read-only within the function',
            choice3: 'The function cannot receive structures as arguments',
            choice4: 'The function modifies the original structure directly',
            answer: 4
        }
];

const MAX_QUESTIONS = 10;


startGame = () => {
    questionCount = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCount >= MAX_QUESTIONS){

        localStorage.setItem('playerScore', score);

        return window.location.assign("displayScore.html");
    }

    questionCount++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion['choice'+number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    
    choice.addEventListener('click', (e) => {

    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];
    console.log(selectedAnswer);
    
    const classToApply = 
        selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
    if(selectedAnswer == currentQuestion.answer){
        score++;
    }
    
    selectedChoice.parentElement.classList.add(classToApply);
    
    setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 500);
    });
});


startGame();