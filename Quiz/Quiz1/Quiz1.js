const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCount = 0;
let availableQuestions = [];

let questions = [{
    question: 'The term _____ is used to describe the way data is stored. It is also a representation of a logical relationship existing between individual elements of data.',
    choice1: 'Data Structure',
    choice2: 'Pseudocode',
    choice3: 'Program',
    choice4: 'Algorithm',
    answer: 1
    },
    {
    question: 'WA/An _____ is a finite sequence of instructions, each of which has a precise meaning and can be performed with a limited amount of effort in a finite length of time. No matter what the input values may be, it terminates after executing a finite number of instructions.',
    choice1: 'Program',
    choice2: 'Pseudocode',
    choice3: 'Algorithm',
    choice4: 'Data Structure',
    answer: 3
    },
    {
        question: 'A data structure is said to be _____ if its elements form a sequence or a linear list. Data structures like arrays, stacks, queues, and linked lists organize data in linear order.',
        choice1: 'Non-Linear Data Structure',
        choice2: 'Linear Data Structure',
        choice3: 'Primitive Data Structure',
        choice4: 'Non-Primitive Data Structure',
        answer: 2
    },
    {
        question: 'It is a logical description of how we view the data and the operations allowed without regard to how they will be implemented.',
        choice1: 'Abstract Data Type',
        choice2: 'Data Structure',
        choice3: 'Data Type',
        choice4: 'None of the above',
        answer: 1
    },
    {
        question: 'Involves implementing the algorithm in a machine and then calculating the time taken by the system to execute the program successfully.',
        choice1: 'Apriori Analysis',
        choice2: 'Asymptotic Notation',
        choice3: 'Apostoriori Analysis',
        choice4: 'Time Complexity',
        answer: 3
    },
    {
        question: 'It is the amount of time required for an algorithm to complete its execution. An algorithm is said to be efficient if it takes the minimum (reasonable) amount of time to complete its execution.',
        choice1: 'Space Complexity',
        choice2: 'Time Complexity',
        choice3: 'Asymptotic Notation',
        choice4: 'Big O Notation',
        answer: 2
    },
    {
        question: 'Is the mathematical notation used to describe the running time of an algorithm when the input tends towards a particular value or a limiting value',
        choice1: 'Asymptotic Notation',
        choice2: 'Time Compelxity',
        choice3: 'Space Complexitiy',
        choice4: 'Big O Notation',
        answer: 1
        },
        {
        question: 'Find the runninig time of the program fragments.\n\nsum = 0;\nfor(i = 0; i < n; i++)\nsum+=i;',
        choice1: 'O(2^n)',
        choice2: 'O(logN)',
        choice3: 'O(1)',
        choice4: 'O(n)',
        answer: 4
        },
        {
            question: 'Find the runninig time of the program fragments.\nsum = 0;\nfor(i = 0; i < n; i++)\nfor(k = 0; k < n; k++)\n\tfor(j = 0; j < n; j++)\n\tsum++;',
            choice1: ' O(n^2)',
            choice2: 'O(n^3)',
            choice3: 'O(n)',
            choice4: 'O(N logN)',
            answer: 2
        },
        {
            question: 'Find the runninig time of the program fragments.\nfor(int i = 0; i < n; ++i){\nint min = i;\nfor(int j = 0; j < n; ++j){\nif(j > i && A[j] < A[min])\nmin = j;\n}\nswap A[i] and A[j]\n}',
            choice1: 'O(N logN)',
            choice2: 'O(n^3)',
            choice3: 'O(n)',
            choice4: 'O(n^2)',
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
      }, 700);
    });
});


startGame();