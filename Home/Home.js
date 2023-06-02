function setColor(element) {
    element.style.color = "darkcyan";
}

const home = document.getElementById('home');
const about = document.getElementById('about');
const lesson = document.getElementById('lesson');
const quiz = document.getElementById('quiz');

home.onclick = function() {
    setColor(home);
};