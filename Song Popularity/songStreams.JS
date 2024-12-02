
let score = 0;
let highScore = 0;
let songs = [
    { image: 'song1.jpg', name: 'Blinding Lights', artist: 'The Weeknd', value: 3900000000 },
    { image: 'song2.jpg', name: 'Shape of You', artist: 'Ed Sheeran', value: 4121376734	 },
    { image: 'song3.jpg', name: 'Someone You Loved', artist: 'Lewis Capaldi', value: 3698757381 },
    { image: 'song4.jpg', name: 'As It Was', artist: 'Harry Styles', value: 3656679922	 },
    { image: 'song5.jpg', name: 'Sunflower', artist: 'Post Malone', value: 	3617634336	 },
    { image: 'song6.jpg', name: 'Starboy', artist: 'The Weeknd', value: 3609115364		 },
    { image: 'song7.jpg', name: 'One Dance', artist: 'Drake', value: 3437708671		 },
    { image: 'song8.jpg', name: 'Sweater Weather', artist: 'The Neighbourhood', value: 3392313583	 },
    { image: 'song9.jpg', name: 'STAY', artist: 'The Kid LAROI', value: 3368428206	  },
    { image: 'song10.jpg', name: 'Believer', artist: 'Imagine Dragons', value: 3234552384	  },
    { image: 'song11.jpg', name: 'Heat Waves', artist: 'Glass Animals', value: 3212949591	  },
    { image: 'song12.jpg', name: 'Perfect', artist: 'Ed Sheeran', value: 3193729809	  },
    { image: 'song13.jpg', name: 'Dance Monkey', artist: 'Tones And I', value: 3177746291	  },
    { image: 'song14.jpg', name: 'lovely', artist: 'Billie Eilish', value: 3086438969  },
    { image: 'song15.jpg', name: 'Say You Wont Let Go', artist: 'James Arthur', value: 3081924440  },
    { image: 'song16.jpg', name: 'rockstar', artist: 'Post Malone', value: 3073792299  },
    { image: 'song17.jpg', name: 'Closer', artist: 'The Chainsmokers', value: 3055376127	  },
    { image: 'song18.jpg', name: 'Something Just Like This', artist: 'The Chainsmokers', value: 2893397984  },
    { image: 'song19.jpg', name: 'Watermelon Sugar', artist: 'Harry Styles', value: 2887729547	  },
    { image: 'song20.jpg', name: 'Señorita', artist: 'Shawn Mendes', value: 2877346947  },
    { image: 'song21.jpg', name: 'Riptide', artist: 'Vance Joy', value: 2851272376  },
    { image: 'song22.jpg', name: 'Take Me to Church', artist: 'Hozier', value: 2794898279	  },
    { image: 'song23.jpg', name: 'Dont Start Now', artist: 'Dua Lipa', value: 2782889549  },
    { image: 'song24.jpg', name: 'Another Love', artist: 'Tom Odell', value: 2770015261	  },
    { image: 'song25.jpg', name: 'Counting Stars', artist: 'OneRepublic', value: 2718384641  },


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
