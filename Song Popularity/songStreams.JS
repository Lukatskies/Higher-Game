let score = 0;
let highScore = 0;
let songs = [
    { image: 'Song Popularity/Images/The_Weeknd_-_Blinding_Lights.png', name: 'Shape of You', artist: 'Ed Sheeran', value: 4800000000 },
    { image: 'song2.jpg', name: 'Blinding Lights', artist: 'The Weeknd', value: 3900000000 },
    { image: 'song3.jpg', name: 'Uptown Funk', artist: 'Bruno Mars', value: 5000000000 },
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
    const leftSong = songs[Math.floor(Math.random() * songs.length)];
    let rightSong;

    do {
        rightSong = songs[Math.floor(Math.random() * songs.length)];
    } while (rightSong === leftSong); // Ensure left and right songs are different

    updateSong('left', leftSong);
    updateSong('right', rightSong);
}

function checkGuess(isHigher) {
    const leftSongValue = leftSong.value;
    const rightSongValue = rightSong.value;

    if ((isHigher && rightSongValue > leftSongValue) || (!isHigher && rightSongValue < leftSongValue)) {
        score++;
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
    } else {
        feedback.textContent = 'Incorrect!';
        feedback.style.color = 'red';
        endGame();
    }

    scoreDisplay.textContent = score;
    if (score > highScore) {
        highScore = score;
        highScoreDisplay.textContent = highScore;
    }

    setTimeout(nextSong, 1000);
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
