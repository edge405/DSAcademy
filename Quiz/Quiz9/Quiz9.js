const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCount = 0;
let availableQuestions = [];

let questions = [{
    question: 'Which of the following statements regarding a Binary Search Tree\'s characteristics is untrue?',
    choice1: 'Each node can have up to three successor nodes.',
    choice2: 'The right subtree of a node contains only nodes with keys greater than the node\'s key',
    choice3: 'The left and right subtrees each must also be a binary search',
    choice4: 'There must be no duplicate nodes.',
    answer: 1
    },
    {
    question: 'Which of the following operations on an AVL tree can cause it to become unbalanced?',
    choice1: 'Deletion',
    choice2: 'Insertion',
    choice3: 'Both insertion and deletion',
    choice4: 'Neither insertion nor deletion',
    answer: 3
    },
    {
        question: 'Which of the following is not a type of tree traversal method?',
        choice1: 'Preorder',
        choice2: 'Level - Order',
        choice3: 'Post-order',
        choice4: 'Inorder',
        answer: 2
    },
    {
        question: 'Which of the following operations cannot be performed on a binary search tree?',
        choice1: 'Sorting the elements in the tree',
        choice2: 'Insertion of a new node',
        choice3: 'Search for a node with a given key',
        choice4: 'Deletion of a node',
        answer: 1
    },
    {
        question: 'Which traversal visits the nodes in the following order: left subtree, root, right subtree?',
        choice1: 'Post-order traversal',
        choice2: 'Pre-order traversal',
        choice3: 'In-order traversal',
        choice4: 'Breadth-first traversal',
        answer: 3
    },
    {
        question: 'Which of the following is true about AVL Trees?',
        choice1: 'AVL trees are unbalanced binary search trees',
        choice2: 'A self-balancing binary search trees',
        choice3: 'AVL trees use rotation operations to maintain balance',
        choice4: 'Both a and c',
        answer: 4
    },
    {
        question: 'In a binary tree, each node can have at most three children.',
        choice1: 'False',
        choice2: 'True',
        choice3: 'Maybe',
        choice4: 'I don\'t know',
        answer: 1
        },
        {
        question: 'A binary heap is a type of tree in which the value of each parent node is less than or equal to the values of its children',
        choice1: 'False',
        choice2: 'True',
        choice3: 'I don\'t know',
        choice4: 'Maybe',
        answer: 2
        },
        {
            question: 'Which of the following is true about a min-heap?',
            choice1: 'The value of each node is less than or equal to the value of its parent',
            choice2: 'The value of each node is greater than or equal to the value of its parent',
            choice3: 'The value of each node is less than or equal to the values of its children',
            choice4: 'The value of each node is greater than or equal to the values of its children',
            answer: 2
        },
        {
            question: 'Which type of binary tree is used to represent the expressions in the postfix form?',
            choice1: 'Full Binary Tree',
            choice2: 'Complete Binary Tree',
            choice3: 'Threaded Binary Tree',
            choice4: 'Binary Expression Tree',
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