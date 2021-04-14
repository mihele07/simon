
var boxColors = ["green", "red", "yellow", "blue"];

var randomColorsPick = [];

var userColorPicks = [];

var level = 0;

var started = false;


$(document).keypress(function() {
  if (started === false) {
    nextSequence();
    started = true;
  }
});


$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userColorPicks.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userColorPicks.length-1);
})

function checkAnswer(currentLevel) {
  if (randomColorsPick[currentLevel] === userColorPicks[currentLevel]) {
    console.log("success");
    if (randomColorsPick.length === userColorPicks.length) {
      setTimeout(function() {
        nextSequence();}, 1000);
      }
    } else {
      console.log("wrong");
      playSound("wrong");
      $("body").addClass("gameOver");
      setTimeout(function() {
        $("body").removeClass("gameOver");
      }, 200);
      $(".startTitle").text("Game Over, Press Any Key To Restart!");

      startOver();

      }
    }


function nextSequence() {
userColorPicks = [];
      level++
      $(".startTitle").text("Level" + level);


  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = boxColors[randomNumber];
  randomColorsPick.push(randomColor);

$("#" + randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomColor);
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
setTimeout(function() {
  $("#" + currentColor).removeClass("pressed")}, 100);
}

function startOver() {
  level = 0;
  randomColorsPick = [];
  started = false;
}
