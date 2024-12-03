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
    { image: 'Taylor Swift.jpg', artist: 'Taylor Swift', value: 94558183304 },
    { image: 'Drake.jpg', artist: 'Drake', value: 81354787430 },
    { image: 'Bad Bunny.jpg', artist: 'Bad Bunny', value: 77438204571 },
    { image: 'The Weeknd.jpg', artist: 'The Weeknd', value: 63850944174 },
    { image: 'Ed Sheeran.jpg', artist: 'Ed Sheeran', value: 50654299016 },
    { image: 'Ariana Grande.jpg', artist: 'Ariana Grande', value: 49232938801 },
    { image: 'Eminem.jpg', artist: 'Eminem', value: 47026342313 },
    { image: 'Justin Bieber.jpg', artist: 'Justin Bieber', value: 45542432177 },
    { image: 'Post Malone.jpg', artist: 'Post Malone', value: 42818439804 },
    { image: 'Kanye West.jpg', artist: 'Kanye West', value: 42801386602 },
    { image: 'Billie Eilish.jpg', artist: 'Billie Eilish', value: 42057176248 },
    { image: 'BTS.jpg', artist: 'BTS', value: 40647351280 },
    { image: 'Coldplay.jpg', artist: 'Coldplay', value: 35451535823 },
    { image: 'Travis Scott.jpg', artist: 'Travis Scott', value: 35405434107 },
    { image: 'Rhianna.jpg', artist: 'Rihanna', value: 35347737480 },
    { image: 'J Balvin.jpg', artist: 'J Balvin', value: 34299541981 },
    { image: 'Dua Lipa.jpg', artist: 'Dua Lipa', value: 33763345276 },
    { image: 'Imagine Dragons.jpg', artist: 'Imagine Dragons', value: 32861120742 },
    { image: 'Juice WRLD.jpg', artist: 'Juice WRLD', value: 32545805647 },
    { image: 'Bruno Mars.jpg', artist: 'Bruno Mars', value: 31277978576 },
    { image: 'X.jpg', artist: 'XXXTENTACION', value: 30738659235 },
    { image: 'David Guetta.jpg', artist: 'David Guetta', value: 30084737839 },
    { image: 'Ozuna.jpg', artist: 'Ozuna', value: 29503679301 },
    { image: 'Kendrick.jpg', artist: 'Kendrick Lamar', value: 29295617051 },
    { image: 'Maroon 5.jpg', artist: 'Maroon 5', value: 28348550823 },
];

// Define the base directory for images
const imageDirectory = "Monthly Listeners/Artist Images/";

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
    const duration = 2000; // Animation duration in ms
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
        resultGif.src = "Monthly Listeners/Gif File/Check Mark Gif.gif";
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
        resultGif.src = "Monthly Listeners/Gif File/Red X.gif";
        resultGif.hidden = false;
    
    }

    updateScoreDisplay();
    setTimeout(updateGameBoard, 4000);
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