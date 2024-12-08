// Variables
const leftartistImage = document.getElementById("left-artist-image");
const leftartistName = document.getElementById("left-artist-name");

const rightartistImage = document.getElementById("right-artist-image");
const rightartistName = document.getElementById("right-artist-name");

const higherButton = document.getElementById("higher");
const lowerButton = document.getElementById("lower");

let score = 0;
let highScore = 0;

// DOM elements for score display
const highScoreElement = document.getElementById("high-score");
const currentScoreElement = document.getElementById("current-score");

// Function to update score display
function updateScoreDisplay() {
    currentScoreElement.textContent = `Score: ${score}`;
    highScoreElement.textContent = `High Score: ${highScore}`;
}

let leftartistContainer, rightartistContainer;

// Artists Object List
const artists = [
    { image: 'Taylor Swift.jpg', artist: 'Taylor Swift', value: 105000000 },
    { image: 'Drake.jpg', artist: 'Drake', value: 92500000 },
    { image: 'Bad Bunny.jpg', artist: 'Bad Bunny', value: 86400000 },
    { image: 'The Weeknd.jpg', artist: 'The Weeknd', value: 117000000 },
    { image: 'Ed Sheeran.jpg', artist: 'Ed Sheeran', value: 85300000 },
    { image: 'Ariana Grande.jpg', artist: 'Ariana Grande', value: 80600000 },
    { image: 'Eminem.jpg', artist: 'Eminem', value: 84900000 },
    { image: 'Justin Bieber.jpg', artist: 'Justin Bieber', value: 82000000 },
    { image: 'Post Malone.jpg', artist: 'Post Malone', value: 88100000 },
    { image: 'Kanye West.jpg', artist: 'Kanye West', value: 50000000 },
    { image: 'Billie Eilish.jpg', artist: 'Billie Eilish', value: 98800000 },
    { image: 'BTS.jpg', artist: 'BTS', value: 40000000 },
    { image: 'Coldplay.jpg', artist: 'Coldplay', value: 79100000 },
    { image: 'Travis Scott.jpg', artist: 'Travis Scott', value: 45000000 },
    { image: 'Rhianna.jpg', artist: 'Rihanna', value: 84700000 },
    { image: 'J Balvin.jpg', artist: 'J Balvin', value: 54000000 },
    { image: 'Dua Lipa.jpg', artist: 'Dua Lipa', value: 78000000 },
    { image: 'Imagine Dragons.jpg', artist: 'Imagine Dragons', value: 74000000 },
    { image: 'Juice WRLD.jpg', artist: 'Juice WRLD', value: 32000000 },
    { image: 'Bruno Mars.jpg', artist: 'Bruno Mars', value: 134000000 },
    { image: 'X.jpg', artist: 'XXXTENTACION', value: 31000000 },
    { image: 'David Guetta.jpg', artist: 'David Guetta', value: 76700000 },
    { image: 'Ozuna.jpg', artist: 'Ozuna', value: 36000000 },
    { image: 'Kendrick.jpg', artist: 'Kendrick Lamar', value: 56000000 },
    { image: 'Maroon 5.jpg', artist: 'Maroon 5', value: 72000000 }
];


// Define the base directory for images
const imageDirectory = "Artists/Artist Images/";

// Helper function to get a random artist
function getRandomArtist(excludeartist) {
    let randomartist;
    do {
        randomartist = artists[Math.floor(Math.random() * artists.length)];
    } while (randomartist === excludeartist);
    return randomartist;
}

// Select the result-gif element
const resultGif = document.getElementById("result-gif");

// Function to update the game board
function updateGameBoard() {

     // Hide the result gif when updating the board
     resultGif.hidden = true;
     
    const leftartist = getRandomArtist();
    const rightartist = getRandomArtist(leftartist);

    // Update left artist details
    leftartistImage.src = imageDirectory + leftartist.image;
    leftartistName.textContent = leftartist.artist;
    leftartistContainer = leftartist;

 

    // Update right artist details
    rightartistImage.src = imageDirectory + rightartist.image;
    rightartistName.textContent = rightartist.artist;
    rightartistContainer = rightartist;
}

// Event listeners for buttons
higherButton.addEventListener("click", () => handleGuess("higher"));
lowerButton.addEventListener("click", () => handleGuess("lower"));


//Animation stuff//
const leftArtistStreams = document.getElementById("left-artist-streams");
const rightArtistStreams = document.getElementById("right-artist-streams");

//function to animate the streams count//
function animateCount(element, targetValue) {
    let currentValue = 0;
    const duration = 1600; // Animation duration in ms
    const increment = Math.ceil(targetValue / (duration / 16)); // Increment per frame (assuming ~60fps)

    function update() {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
        }
        element.textContent = currentValue.toLocaleString(); // Format with commas
        if (currentValue < targetValue) {
            requestAnimationFrame(update);
        }
    }

    update();
}


// Handle guess
function handleGuess(guess) {

    higherButton.style.visibility = "hidden";
    lowerButton.style.visibility = "hidden";


    const isCorrect =
        (guess === "higher" && rightartistContainer.value > leftartistContainer.value) ||
        (guess === "lower" && rightartistContainer.value < leftartistContainer.value);

    if (isCorrect) {
        score++;
        if (score > highScore) {
            highScore = score;
        }


    // Show streams with animation
        animateCount(leftArtistStreams, leftartistContainer.value);
        animateCount(rightArtistStreams, rightartistContainer.value);


        // Show the green checkmark
        resultGif.src = "Albums/Gif File/checkmarkfinalgif.gif";
        resultGif.hidden = false;

        // Hide the gif after 3 seconds
        setTimeout(() => {
            resultGif.hidden = true;
        }, 3000);
    } else {


        // Show streams with animation
        animateCount(leftArtistStreams, leftartistContainer.value);
        animateCount(rightArtistStreams, rightartistContainer.value);

        // Reset score
        score = 0;

        // Show the red X
        resultGif.src = "Artists/Gif File/Red X.gif";
        resultGif.hidden = false;
    
    }

    updateScoreDisplay();

        // Wait before updating the game board
        setTimeout(() => {
            updateGameBoard();
    
            // Re-enable the buttons after the board updates
            higherButton.style.visibility = "visible";
            lowerButton.style.visibility = "visible";
        }, 4000);

}


// Update the game board to hide streams initially
function updateGameBoard() {
    resultGif.hidden = true;

    const leftartist = getRandomArtist();
    const rightartist = getRandomArtist(leftartist);

    leftartistImage.src = imageDirectory + leftartist.image;
    leftartistName.textContent = leftartist.artist;
    leftartistContainer = leftartist;
    leftArtistStreams.textContent = ""; // Clear streams text

    rightartistImage.src = imageDirectory + rightartist.image;
    rightartistName.textContent = rightartist.artist;
    rightartistContainer = rightartist;
    rightArtistStreams.textContent = ""; // Clear streams text
}

updateGameBoard();
updateScoreDisplay();