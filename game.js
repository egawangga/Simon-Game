var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;

$(document).keypress(function() {
  if (!start) {

    //first level
    $("#level-title").text("Level " + level);
    nextSequence();
    start = true;
  }
});

//choose clicked colour and store it in array
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length);
});

//get next sequence
function nextSequence() {
  userClickedPattern.splice(0, userClickedPattern.length);
  //level increased
  $("#level-title").text("Level " + ++level);

  //choose random colour
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //show selected colour
  $("#"+ randomChosenColour).fadeOut(100).fadeIn(100).play;
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}

function checkAnswer(currentLevel) {
  //check each answer in each set
  if (userClickedPattern[currentLevel-1] === gamePattern[currentLevel-1]){
    //check if its deserve to the next level or not
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern.splice(0, gamePattern.length);
  start = false;
}
