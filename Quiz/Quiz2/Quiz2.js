const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCount = 0;
let availableQuestions = [];

let questions = [{
    question: 'What is the first step in the substitution method for solving recurrences?',
    choice1: 'Guess the form of the solution',
    choice2: 'Verify by induction',
    choice3: 'Solve for constants',
    choice4: 'Substitute the guessed solution',
    answer: 1
    },
    {
    question: 'Which technique is NOT used to solve recurrences?',
    choice1: 'Substitution method',
    choice2: 'Iteration',
    choice3: 'Divide and conquer',
    choice4: 'Master theorem',
    answer: 3
    },
    {
        question: 'Guess the solution for the recurrence T(n) = T(n/2) + 1.',
        choice1: 'T(n) = n',
        choice2: 'T(n) = log2(n)',
        choice3: 'T(n) = nlog2(n)',
        choice4: 'T(n) = 2n',
        answer: 2
    },
    {
        question: 'In the substitution method, what do we do after guessing the form of the solution?',
        choice1: 'Solve for constants',
        choice2: 'Verify by induction',
        choice3: 'Substitute the guessed solution',
        choice4: 'None of the above',
        answer: 1
    },
    {
        question: 'Suppose we have the recurrence T(n) = T(n-1) + n with T(0) = 0. What is the solution to this recurrence?',
        choice1: 'T(n) = n',
        choice2: 'T(n) = n!',
        choice3: 'T(n) = n^2',
        choice4: 'T(n) = log2(n)',
        answer: 3
    },
    {
        question: 'Guess the solution for the recurrence T(n) = 3T(n/2) + nlogn.',
        choice1: 'T(n) = n',
        choice2: 'T(n) = n^2logn',
        choice3: 'T(n) = nlogn',
        choice4: 'T(n) = n^2',
        answer: 2
    },
    {
        question: 'Which step of the substitution method involves showing that the guessed solution satisfies the recurrence for all n?',
        choice1: 'Guess the form of the solution',
        choice2: 'Solve for constants',
        choice3: 'Verify by induction',
        choice4: 'None of the above',
        answer: 3
        },
        {
        question: 'Suppose we have the recurrence T(n) = T(n/2) + n. What is the solution to this recurrence?',
        choice1: 'T(n) = n',
        choice2: 'T(n) = n^2',
        choice3: 'T(n) = n^3',
        choice4: 'T(n) = nlogn',
        answer: 4
        },
        {
            question: 'Suppose we have the recurrence T(n) = T(n/2) + 1 with T(1) = 1. Guess the solution for this recurrence using the Substitution Method.',
            choice1: 'T(n) = n',
            choice2: 'T(n) = log2(n)',
            choice3: 'T(n) = nlog2(n)',
            choice4: 'T(n) = 2n',
            answer: 2
        },
        {
            question: 'In the substitution method, what do we do after verifying the guessed solution by induction?',
            choice1: 'Guess the form of the solution',
            choice2: 'Substitute the guessed solution',
            choice3: 'Solve for constants',
            choice4: 'None of the above',
            answer: 3
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