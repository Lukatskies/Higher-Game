// Variables
const leftartistImage = document.getElementById("left-artist-image");
const leftartistName = document.getElementById("left-artist-name");

const rightartistImage = document.getElementById("right-artist-image");
const rightartistName = document.getElementById("right-artist-name");

const higherButton = document.getElementById("higher");
const lowerButton = document.getElementById("lower");

let score = 0;
let leftartistContainer, rightartistContainer;

// Artists Object List
const artists = [
    { image: 'artist1.jpg', artist: 'Taylor Swift', value: 94558183304 },
    { image: 'artist2.jpg', artist: 'Drake', value: 81354787430 },
    { image: 'artist3.jpg', artist: 'Bad Bunny', value: 77438204571 },
    { image: 'artist4.jpg', artist: 'The Weeknd', value: 63850944174 },
    { image: 'artist5.jpg', artist: 'Ed Sheeran', value: 50654299016 },
    { image: 'artist6.jpg', artist: 'Ariana Grande', value: 49232938801 },
    { image: 'artist7.jpg', artist: 'Eminem', value: 47026342313 },
    { image: 'artist8.jpg', artist: 'Justin Bieber', value: 45542432177 },
    { image: 'artist9.jpg', artist: 'Post Malone', value: 42818439804 },
    { image: 'artist10.jpg', artist: 'Kanye West', value: 42801386602 },
    { image: 'artist11.jpg', artist: 'Billie Eilish', value: 42057176248 },
    { image: 'artist12.jpg', artist: 'BTS', value: 40647351280 },
    { image: 'artist13.jpg', artist: 'Coldplay', value: 35451535823 },
    { image: 'artist14.jpg', artist: 'Travis Scott', value: 35405434107 },
    { image: 'artist15.jpg', artist: 'Rihanna', value: 35347737480 },
    { image: 'artist16.jpg', artist: 'J Balvin', value: 34299541981 },
    { image: 'artist17.jpg', artist: 'Dua Lipa', value: 33763345276 },
    { image: 'artist18.jpg', artist: 'Imagine Dragons', value: 32861120742 },
    { image: 'artist19.jpg', artist: 'Juice WRLD', value: 32545805647 },
    { image: 'artist20.jpg', artist: 'Bruno Mars', value: 31277978576 },
    { image: 'artist21.jpg', artist: 'XXXTENTACION', value: 30738659235 },
    { image: 'artist22.jpg', artist: 'David Guetta', value: 30084737839 },
    { image: 'artist23.jpg', artist: 'Ozuna', value: 29503679301 },
    { image: 'artist24.jpg', artist: 'Kendrick Lamar', value: 29295617051 },
    { image: 'artist25.jpg', artist: 'Maroon 5', value: 28348550823 },
];

// Helper function to get a random artist
function getRandomArtist(excludeartist) {
    let randomartist;
    do {
        randomartist = artists[Math.floor(Math.random() * artists.length)];
    } while (randomartist === excludeartist);
    return randomartist;
}

// Function to update the game board
function updateGameBoard() {
    const leftartist = getRandomArtist();
    const rightartist = getRandomArtist(leftartist);

    // Update left artist details
    leftartistImage.src = leftartist.image;
    leftartistName.textContent = leftartist.artist;
    leftartistContainer = leftartist;

    // Update right artist details
    rightartistImage.src = rightartist.image;
    rightartistName.textContent = rightartist.artist;
    rightartistContainer = rightartist;
}

// Event listeners for buttons
higherButton.addEventListener("click", () => handleGuess("higher"));
lowerButton.addEventListener("click", () => handleGuess("lower"));

// Handle guess
function handleGuess(guess) {
    const isCorrect =
        (guess === "higher" && rightartistContainer.value > leftartistContainer.value) ||
        (guess === "lower" && rightartistContainer.value < leftartistContainer.value);

    if (isCorrect) {
        alert("Correct! Your score is: " + ++score);
    } else {
        alert(
            `Wrong! Left artist had ${leftartistContainer.value} views, right artist had ${rightartistContainer.value} views.`
        );
        score = 0; // Reset score
    }

    // Reload game board after 2 seconds
    setTimeout(updateGameBoard, 2000);
}

// Initialize the game
updateGameBoard();
