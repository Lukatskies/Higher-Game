// Variables
const leftartistImage = document.getElementById("left-artist-image");
const leftartistName = document.getElementById("left-artist-name");
const leftalbumName = document.getElementById("left-album-name");

const rightartistImage = document.getElementById("right-artist-image");
const rightartistName = document.getElementById("right-artist-name");
const rightalbumName = document.getElementById("right-album-name");


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
// popup
window.addEventListener("load", function(){
    setTimeout(
        function open(event){
            document.querySelector(".popup").style.display = "block";
        },
        1000
    )
});
document.querySelector("#close").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "none";
});

let leftartistContainer, rightartistContainer;

// Artists Object List
const albums = [
    { image: 'AfterHours.jpg', name: 'After Hours', artist: 'The Weeknd', value: 13800000000 },
    { image: 'divide.jpg', name: '÷ (Divide)', artist: 'Ed Sheeran', value: 13800000000 },
    { image: 'DivinelyUninspired.jpg', name: 'Divinely Uninspired to a Hellish Extent', artist: 'Lewis Capaldi', value: 6400000000 },
    { image: 'HarrysHouse.jpeg', name: 'Harry’s House', artist: 'Harry Styles', value: 6100000000 },
    { image: 'Spiderverse.jpeg', name: 'Spider-Man: Into the Spider-Verse (Soundtrack)', artist: 'Post Malone', value: 5700000000 },
    { image: 'blonde.jpg', name: 'Blonde', artist: 'Frank Ocean', value: 4200000000 },
    { image: 'views.jpg', name: 'Views', artist: 'Drake', value: 8000000000 },
    { image: 'ILoveYou.jpeg', name: 'I Love You.', artist: 'The Neighbourhood', value: 3400000000 },
    { image: 'FuckLove.jpeg', name: 'F*ck Love', artist: 'The Kid LAROI', value: 6900000000 },
    { image: 'evolve.jpg', name: 'Evolve', artist: 'Imagine Dragons', value: 8500000000 },
    { image: 'dreamland.jpeg', name: 'Dreamland', artist: 'Glass Animals', value: 7000000000 },
    { image: 'equals.jpg', name: '=', artist: 'Ed Sheeran', value: 12000000000 },
    { image: 'thekidsarecoming.jpeg', name: 'The Kids Are Coming', artist: 'Tones And I', value: 3100000000 },
    { image: 'dontsmileatme.jpg', name: 'dont smile at me', artist: 'Billie Eilish', value: 7200000000 },
    { image: 'BackFromTheEdge.jpeg', name: 'Back from the Edge', artist: 'James Arthur', value: 3200000000 },
    { image: 'Beerbongs&Bentleys.jpeg', name: 'Beerbongs & Bentleys', artist: 'Post Malone', value: 10500000000 },
    { image: 'collage.jpg', name: 'Collage', artist: 'The Chainsmokers', value: 7800000000 },
    { image: 'INeverLikedYou.jpeg', name: 'I NEVER LIKED YOU', artist: 'Future', value: 2100000000 },
    { image: 'FlowerBoy.jpeg', name: 'FLOWER BOY', artist: 'Tyler, the Creator', value: 4150000000 },
    { image: 'ShawnMendes.jpeg', name: 'Shawn Mendes', artist: 'Shawn Mendes', value: 6500000000 },
    { image: 'DreamYourLifeAway.jpeg', name: 'Dream Your Life Away', artist: 'Vance Joy', value: 3000000000 },
    { image: 'hozier.jpg', name: 'Hozier', artist: 'Hozier', value: 7600000000 },
    { image: 'FutureNostalgia.jpg', name: 'Future Nostalgia', artist: 'Dua Lipa', value: 11200000000 },
    { image: 'WrongCrowd.jpg', name: 'Wrong Crowd', artist: 'Tom Odell', value: 4200000000 },
    { image: 'native.jpg', name: 'Native', artist: 'OneRepublic', value: 6100000000 },
];


// Define the base directory for images
const imageDirectory = "Albums/Album Images/";

// Helper function to get a random artist
function getRandomArtist(excludeartist) {
    let randomartist;
    do {
        randomartist = albums[Math.floor(Math.random() * albums.length)];
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
    leftalbumName.textContent = leftartist.name;
    leftartistContainer = leftartist;

 

    // Update right artist details
    rightartistImage.src = imageDirectory + rightartist.image;
    rightartistName.textContent = rightartist.artist;
    rightalbumName.textContent = rightartist.name;
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
        resultGif.src = "Albums/Gif File/Red X.gif";
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
    leftalbumName.textContent = leftartist.name;
    leftartistContainer = leftartist;
    leftArtistStreams.textContent = ""; // Clear streams text

    rightartistImage.src = imageDirectory + rightartist.image;
    rightartistName.textContent = rightartist.artist;
    rightalbumName.textContent = rightartist.name;
    rightartistContainer = rightartist;
    rightArtistStreams.textContent = ""; // Clear streams text
}

updateGameBoard();
updateScoreDisplay();