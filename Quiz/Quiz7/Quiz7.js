const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCount = 0;
let availableQuestions = [];

let questions = [{
    question: 'Which data structure follows the Last-In-First-Out (LIFO) principle?',
    choice1: 'Stack ',
    choice2: 'Queue',
    choice3: 'Linked List',
    choice4: 'Hash Table',
    answer: 1
    },
    {
    question: 'Which operation adds an element to the top of the stack?',
    choice1: 'Enqueue',
    choice2: 'Pop',
    choice3: 'Push ',
    choice4: 'Dequeue',
    answer: 3
    },
    {
        question: 'Which data structure follows the First-In-First-Out (FIFO) principle?',
        choice1: 'Stack ',
        choice2: 'Queue ',
        choice3: 'Linked List',
        choice4: 'Binary Tree ',
        answer: 2
    },
    {
        question: 'Which operation removes an element from the top of a stack? ',
        choice1: 'Pop',
        choice2: 'Push',
        choice3: 'Enqueue',
        choice4: 'dequeue',
        answer: 1
    },
    {
        question: 'Which operation removes an element from the front of a queue? ',
        choice1: 'Push',
        choice2: 'Pop',
        choice3: 'dequeue',
        choice4: 'Enqueue',
        answer: 3
    },
    {
        question: 'What output is displayed after the following segment of code execute.\nstack <int> s;\nfor (int i = 1; i <= 10; i++)\ns.push(i);\nwhile (!s.empty()){\ncout << s.top() << endl;\ns.pop();\n}',
        choice1: '10 9 8 7 6 5 4 3 2 1 0',
        choice2: '10 9 8 7 6 5 4 3 2 1 ',
        choice3: '1 2 3 4 5 6 7 8 9 10',
        choice4: '0 1 2 3 4 5 6 7 8 9 10',
        answer: 2
    },
    {
        question: 'What output is displayed after the following segment of code executers?\nstack <int> s;\nfor (int i = 1; i <= 10; i++;\ns.push(i);\nwhile (!s.empty()){\ncout << s.top() << endl;\n}',
        choice1: '10 an infinite number of times',
        choice2: '-10',
        choice3: 'lO',
        choice4: '1 2 3 4 5 6 7 8 9 10',
        answer: 1
        },
        {
        question: 'What output is displayed after the following segment of code executes?\nstack <int> s;\nint a = 22, b = 44;\ns.push(2);\ns.push(a);\ns.push(a + b);\nb = s.top();\ns.pop();\ns.push(b);\ns.push(a - b);\ns.pop();\nwhile (!s.empty()) {\ncout << s.top() << endl;\ns.pop();\n}',
        choice1: '6 62 22',
        choice2: '33 28 19',
        choice3: '66 22 2',
        choice4: 'no output',
        answer: 3
        },
        {
            question: 'What is the time complexity of inserting an element into a stack or a queue?',
            choice1: 'O(n)',
            choice2: 'O(1)',
            choice3: 'O(log n) ',
            choice4: 'O(n log n)',
            answer: 2
        },
        {
            question: 'Which data structure can be implemented using arrays or linked lists?',
            choice1: 'Stack',
            choice2: 'Queue',
            choice3: 'Neither Stack nor Queue',
            choice4: 'Both Stack and Queue',
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