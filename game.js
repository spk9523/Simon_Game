// Variable declaration and Initialization
var buttonColours = ["red", "blue", "green", "yellow"]; // Array of available button colors
var gamePattern = []; // Array to store the randomly generated pattern of colors
var userClickedPattern = []; // Array to store the pattern of colors clicked by the user
var started = false; // Variable to track if the game has started or not
var level = 0; // Current level of the game

// Function to play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); // Create an Audio object with the corresponding sound file
  audio.play(); // Play the audio
}

// Function for the next sequence of the game
function nextSequence() {
  $("h1").text("Level " + level); // Update the heading text to display the current level
  level++; // Increment the level

  // Generate random color
  var randomNumber = Math.floor(Math.random() * 4); // Generate a random number between 0 and 3
  var randomChosenColour = buttonColours[randomNumber]; // Select a random color from the buttonColours array

  // Update game pattern and play sound
  gamePattern.push(randomChosenColour); // Add the randomly chosen color to the game pattern
  playSound(randomChosenColour); // Play the sound associated with the randomly chosen color

  // Apply visual effect to the corresponding button
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100); // Apply a fade-in/fade-out effect to the corresponding button
}

// Function for button press animation
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed"); // Add the "pressed" class to the button

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed"); // Remove the "pressed" class after a short delay
  }, 100);
}

// Function to check user's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // Check if the user's clicked color matches the game pattern color at the current level
    if (gamePattern.length === userClickedPattern.length) {
      // If the user has completed the current level
      setTimeout(
        function () {
          nextSequence();
        },
        1000 // Start the next level after a delay of 1000ms
      );
      userClickedPattern = []; // Clear the user's pattern for the next level
    }
  } else {
    // If the user's clicked color does not match the game pattern color
    playSound("wrong"); // Play the "wrong" sound
    $("body").addClass("game-over"); // Add the "game-over" class to the body element to indicate the game is over
    setTimeout(function () {
      $("body").removeClass("game-over"); // Remove the "game-over" class after a short delay of 200ms
    }, 200);

    $("h1").text("Game Over! Press Any Key to Restart"); // Update the heading text to indicate the game is over
    startOver(); // Reset the game
  }
}

// Function to reset the game
function startOver() {
  level = 0; // Reset the level to 0
  gamePattern = []; // Clear the game pattern
  started = false; // Reset the game started flag
}

// Event handler for button clicks
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id"); // Get the ID of the clicked button
  userClickedPattern.push(userChosenColor); // Add the clicked color to the user's pattern
  playSound(userChosenColor); // Play the sound associated with the clicked color
  animatePress(userChosenColor); // Apply the button press animation
  checkAnswer(userClickedPattern.length - 1); // Check the user's answer after each click
});

// Event handler for keypresses
$(document).keypress(function (event) {
  if (!started) {
    // Here we make the condition inside if statement true on any keypress
    nextSequence(); // Start the game sequence
    started = true; // Set the game started flag to true
  }
});
