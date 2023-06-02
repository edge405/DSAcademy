const displayScore = document.getElementById("score");
let playerScore = Number(localStorage.getItem("playerScore"));
let totalScoreOfPlayer;

if (playerScore > 5) {
  totalScoreOfPlayer = "<span style='color: green;'>Total score: " + playerScore + "/10 : Very good</span>";
} else {
  totalScoreOfPlayer = "<span style='color: red;'>Total score: " + playerScore + "/10</span>";
}

displayScore.innerHTML = totalScoreOfPlayer;
