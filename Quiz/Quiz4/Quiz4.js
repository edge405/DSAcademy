const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCount = 0;
let availableQuestions = [];

let questions = [{
    question: 'What is a pointer in C?',
    choice1: 'A variable that stores the address of another variable',
    choice2: 'A variable that stores the value of another variable',
    choice3: 'A variable that stores a string',
    choice4: 'A variable that stores a character',
    answer: 1
    },
    {
    question: 'How do you declare a pointer variable in C?',
    choice1: 'int ptr;',
    choice2: 'int &ptr;',
    choice3: 'int *ptr;',
    choice4: 'int @ptr;',
    answer: 3
    },
    {
        question: 'What is the output of the following code?\nint main() {\nint x = 10;\nint *p;\np = &x;\nprintf("%d", *p);\nreturn 0;\n}',
        choice1: '1o',
        choice2: '10',
        choice3: 'ten',
        choice4: '13-3',
        answer: 2
    },
    {
        question: 'When one prints out the address location with printf, in what format is the address written in?',
        choice1: 'Hexadecimal notation',
        choice2: 'Binary numbers',
        choice3: 'Character type',
        choice4: 'Special character',
        answer: 1
    },
    {
        question: 'What is the output of the following code?\nint main() {\nint arr[5] = {1, 2, 3, 4, 5};\nint *p = arr;\nprintf("%d", *(p+2));\nreturn 0;\n}',
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: '4',
        answer: 3
    },
    {
        question: 'Below are the ways on how to use the pointers, which of them is NOT?',
        choice1: 'Define a pointer variable',
        choice2: 'Provide specific value to the data type',
        choice3: 'Access the value at the address available in the pointer variable',
        choice4: 'Assign the address of a variable to a pointer and .',
        answer: 2
    },
    {
        question: 'What is the output of the following code?\nint main() {\nint x = 10;\nint *p1, *p2;\np1 = &x;\np2 = p1;\nprintf("%d", *(p2 + 2));\nreturn 0;\n}',
        choice1: '32767',
        choice2: '12',
        choice3: '10',
        choice4: 'error',
        answer: 1
        },
        {
        question: 'A pointer that is assigned NULL is called a ________?',
        choice1: 'Pointers to pointers',
        choice2: 'Function pointers',
        choice3: 'Nothingness',
        choice4: 'Null pointer',
        answer: 4
        },
        {
            question: 'What is the output of the following code snippet?\n#include <stdio.h>\nint main() {\nint x = 5;\nint *p = &x;\n*p = 21 + 2(5);\nprintf("%d\n", x);\nreturn 0;\n}',
            choice1: '31',
            choice2: 'error',
            choice3: '21',
            choice4: 'No correct answers',
            answer: 2
        },
        {
            question: 'A pointer may be initialized to __.',
            choice1: 'Null',
            choice2: '0',
            choice3: 'Address',
            choice4: 'All of the above',
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