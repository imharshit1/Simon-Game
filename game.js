// Colors
let buttonColours = ["red", "blue", "green", "yellow"];

// Correct answers
let gamePattern = [];

// What user has choosen
let userClickedPattern = [];

let start = false;
let level = 0;

// Start the game
$(document).keypress(function() {
    if(start == false) {
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;
    }
})

// next level
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);

    let randomChoosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChoosenColour);     

    $("#" + randomChoosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColour);       
}

// button got clicked
$(".btn").click(function () {
    let userChoosenColour = $(this).attr("id");
    userClickedPattern.push(userChoosenColour);
    // console.log(userClickedPattern);

    playSound(userChoosenColour);
    animatePress(userChoosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

// check 
function checkAnswer(currentLevel) {
    
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
         //console.log("success");
        if(userClickedPattern.length == gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        //console.log("wrong");
        playSound("wrong");
        
        $("body").addClass("game-over");
        setTimeout( function () {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart!");
        startOver();
    }
}

// Start over
function startOver() {
    gamePattern = [];
    level = 0;
    start = false;
}

// Play Sound
function playSound(name) {
    var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
}

// Animation of button
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}







