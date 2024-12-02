let score = 0;
let highScore = 0;
let currentLeftSong;
let currentRightSong;

let songs = [
    { image: 'Images/The_Weeknd_-_Blinding_Lights.png', name: 'Shape of You', artist: 'Ed Sheeran', value: 4800000000 },
    { image: '', name: 'Blinding Lights', artist: 'The Weeknd', value: 3900000000 },
    { image: '', name: 'Uptown Funk', artist: 'Bruno Mars', value: 5000000000 },
    // Add more songs here with their corresponding values
];

const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const leftSongImage = document.getElementById('left-song-image');
const leftSongName = document.getElementById('left-song-name');
const leftArtistName = document.getElementById('left-artist-name');
const rightSongImage = document.getElementById('right-song-image');
const rightSongName = document.getElementById('right-song-name');
const rightArtistName = document.getElementById('right-artist-name');
const higherButton = document.getElementById('higher');
const lowerButton = document.getElementById('lower');
const feedback = document.getElementById('feedback');
const gameOverScreen = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');
const playAgainButton = document.getElementById('play-again');

function updateSong(side, song) {
    if (side === "left") {
        leftSongImage.src = song.image;
        leftSongName.textContent = song.name;
        leftArtistName.textContent = song.artist;
    } else if (side === "right") {
        rightSongImage.src = song.image;
        rightSongName.textContent = song.name;
        rightArtistName.textContent = song.artist;
    }
}

function nextSong() {
    if (songs.length < 2) {
        console.error("Not enough songs in the array!");
        return;
    }

    currentLeftSong = songs[Math.floor(Math.random() * songs.length)];
    do {
        currentRightSong = songs[Math.floor(Math.random() * songs.length)];
    } while (currentRightSong === currentLeftSong);

    if (!currentLeftSong || !currentRightSong) {
        console.error("Failed to initialize songs.");
        return;
    }

    updateSong('left', currentLeftSong);
    updateSong('right', currentRightSong);
}


function checkGuess(isHigher) {
    // EDIT THIS
    if (currentLeftSong || !currentRightSong) {
        console.error("Songs are not properly initialized.");
        return;
    }

    const leftSongValue = currentLeftSong.value;
    const rightSongValue = currentRightSong.value;

    if ((isHigher && rightSongValue > leftSongValue) || (!isHigher && rightSongValue < leftSongValue)) {
        score++;
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
    } else {
        feedback.textContent = 'Incorrect!';
        feedback.style.color = 'red';
        endGame();
        return; // Prevent `nextSong` from being called after game over
    }

    scoreDisplay.textContent = score;
    if (score > highScore) {
        highScore = score;
        highScoreDisplay.textContent = highScore;
    }

    setTimeout(() => {
        feedback.textContent = '';
        nextSong();
    }, 1000);
}


function endGame() {
    finalScoreDisplay.textContent = score;
    gameOverScreen.classList.remove('hidden');
    document.getElementById('game').classList.add('hidden');
}

function playAgain() {
    score = 0;
    scoreDisplay.textContent = score;
    gameOverScreen.classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
    nextSong();
}

higherButton.addEventListener('click', () => checkGuess(true));
lowerButton.addEventListener('click', () => checkGuess(false));
playAgainButton.addEventListener('click', playAgain);

document.addEventListener("DOMContentLoaded", function() {
    nextSong(); // Ensure songs load when the page is loaded
});

nextSong();