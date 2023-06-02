const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCount = 0;
let availableQuestions = [];

let questions = [{
    question: 'What is an array in C?',
    choice1: 'A collection of similar data types stored in contiguous memory locations',
    choice2: 'A collection of different data types stored in contiguous memory locations',
    choice3: 'A collection of similar data types stored in non-contiguous memory locations',
    choice4: 'A collection of different data types stored in non-contiguous memory locations',
    answer: 1
    },
    {
    question: 'Which of the following is an example of accessing an element in an array in C?',
    choice1: 'printf("%d", array(1));',
    choice2: 'printf("%d", array{1});',
    choice3: 'printf("%d", array[1]);',
    choice4: 'printf("%d", array.1);',
    answer: 3
    },
    {
        question: 'It is a data structure that consists of a collection of elements organized in a ____________ grid or matrix.',
        choice1: 'single – dimensional array',
        choice2: 'three – dimensional array',
        choice3: 'one – dimensional array',
        choice4: 'no – dimensional array',
        answer: 2
    },
    {
        question: 'What is the index of the first element in an array in C?',
        choice1: '0',
        choice2: '1',
        choice3: '-1',
        choice4: '10',
        answer: 1
    },
    {
        question: 'Which of the following is a valid way to declare an array in C?',
        choice1: 'int = [1, 2, 3];',
        choice2: 'int array = (1, 2, 3);',
        choice3: 'int array[] = {1, 2, 3};',
        choice4: 'int = [1 2 3];',
        answer: 3
    },
    {
        question: 'What is the index of the 15 in the following array: int myArray = [5, 10, 15, 20]?',
        choice1: '0',
        choice2: '2',
        choice3: '1',
        choice4: '3',
        answer: 2
    },
    {
        question: 'Consider the following code snippet:\n\nint myArray[3][4][5];\nint value = 1;\n\nfor(int i = 0; i < 3; i++) {\nfor (int j = 0; j < 4; j++) {\nfor (int k = 0; k < 5; k++) {\n myArray[i][j][k] = value;\nvalue++;\n }\n}\n }\nprintf("%d", myArray[2][3][4]);',
        choice1: '60',
        choice2: '30',
        choice3: '50',
        choice4: '40',
        answer: 1
        },
        {
        question: 'How do you access an element in an array in C?',
        choice1: 'By using the element\'s value',
        choice2: 'By using the array\'s name',
        choice3: 'By using a pointer to the array',
        choice4: 'By using the element\'s index',
        answer: 4
        },
        {
            question: ' What is the correct way to access the element in the third row and second column of a 2D array named matrix?',
            choice1: 'matrix[1][2]',
            choice2: 'matrix[2][1]',
            choice3: 'matrix[3][2]',
            choice4: 'matrix[2][3]',
            answer: 2
        },
        {
            question: 'What is the correct way to declare a 2D array named myArray with 3 rows and 4 columns of type int?',
            choice1: 'int myArray[3, 4];',
            choice2: 'int[3][4] myArray;',
            choice3: 'int myArray[4][3];',
            choice4: 'int myArray[3][4];',
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
      }, 800);
    });
});


startGame();