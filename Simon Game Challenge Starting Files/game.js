var gamePattern = []
var userClickedPattern = []
var buttonColors = ["red", "blue", "green", "yellow"]
var randomChosenColour;
var level = 0;

function nextSequence() {
    level++;
    $("h1").text("Level "+ level)
    var randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    userClickedPattern = []
    
}
$(".btn").on("click", function handler() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1)

});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

var gameOn = false
$(document).on("keypress", function() {
    if (!gameOn) {
        nextSequence();
        gameOn = true;
    }
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        console.log("success")
        if (gamePattern.length == userClickedPattern.length){
            setTimeout(nextSequence
        ,1000)
        }
    }
    else{
        playSound("wrong");
        console.log("wrong")
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = []
    gameOn = false
}