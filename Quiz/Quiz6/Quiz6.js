const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCount = 0;
let availableQuestions = [];

let questions = [{
    question: 'Which data structure allows for dynamic growth and shrinking as storage demand arises?',
    choice1: 'Linked list',
    choice2: 'Dynamic array',
    choice3: 'Static array',
    choice4: 'Queue',
    answer: 1
    },
    {
    question: 'Which data structure allocates memory dynamically during runtime?',
    choice1: 'Array',
    choice2: 'Static data structure',
    choice3: 'Dynamic data structure',
    choice4: 'Stack',
    answer: 3
    },
    {
        question: 'Which type of linked list is the most basic type in C?',
        choice1: 'Doubly linked list',
        choice2: 'Singly linked list',
        choice3: 'Circular linked list',
        choice4: 'Tree',
        answer: 2
    },
    {
        question: 'In a singly linked list, each node has a pointer to the:',
        choice1: 'Next node',
        choice2: 'Previous node',
        choice3: 'First node',
        choice4: 'Last node',
        answer: 1
    },
    {
        question: 'What is a common operation performed on a singly linked list?',
        choice1: 'Pop',
        choice2: 'Enqueue',
        choice3: 'Push',
        choice4: 'Dequeue',
        answer: 3
    },
    {
        question: 'What is the purpose of a dummy head node in a linked list?',
        choice1: 'To point to the next node',
        choice2: 'To improve implementation efficiency',
        choice3: 'To mark the end of the list',
        choice4: 'To store data',
        answer: 2
    },
    {
        question: 'Which operation inserts a new node at the beginning of a linked list?',
        choice1: 'Insertion at the tail',
        choice2: 'Deletion at the head',
        choice3: 'Traversing the list',
        choice4: 'Insertion at the head',
        answer: 1
        },
        {
        question: 'What type of list includes a reference to the first and last nodes?',
        choice1: 'Singly linked list',
        choice2: 'Circular linked list',
        choice3: 'Dummy linked list',
        choice4: 'Doubly linked list',
        answer: 4
        },
        {
            question: 'In a cyclic list, the last node points back to the:',
            choice1: 'Previous node',
            choice2: 'First node',
            choice3: 'Middle node',
            choice4: 'O(N logN)',
            answer: 2
        },
        {
            question: 'What operation advances the cursor to the next node in a circularly linked list?',
            choice1: 'Add',
            choice2: 'Remove',
            choice3: 'Insert',
            choice4: 'Advance',
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