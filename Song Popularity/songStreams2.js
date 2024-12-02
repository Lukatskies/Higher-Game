// Variables
const leftSongImage = document.getElementById("left-song-image");
const leftSongName = document.getElementById("left-song-name");
const leftArtistName = document.getElementById("left-artist-name");

const rightSongImage = document.getElementById("right-song-image");
const rightSongName = document.getElementById("right-song-name");
const rightArtistName = document.getElementById("right-artist-name");

const higherButton = document.getElementById("higher");
const lowerButton = document.getElementById("lower");

let score = 0;

// Songs Object List
const songs = [
    { image: 'song1.jpg', name: 'Blinding Lights', artist: 'The Weeknd', value: 3900000000 },
   { image: 'song2.jpg', name: 'Shape of You', artist: 'Ed Sheeran', value: 4121376734  },
   { image: 'song3.jpg', name: 'Someone You Loved', artist: 'Lewis Capaldi', value: 3698757381 },
   { image: 'song4.jpg', name: 'As It Was', artist: 'Harry Styles', value: 3656679922   },
   { image: 'song5.jpg', name: 'Sunflower', artist: 'Post Malone', value:  3617634336   },
   { image: 'song6.jpg', name: 'Starboy', artist: 'The Weeknd', value: 3609115364       },
   { image: 'song7.jpg', name: 'One Dance', artist: 'Drake', value: 3437708671      },
   { image: 'song8.jpg', name: 'Sweater Weather', artist: 'The Neighbourhood', value: 3392313583    },
   { image: 'song9.jpg', name: 'STAY', artist: 'The Kid LAROI', value: 3368428206    },
   { image: 'song10.jpg', name: 'Believer', artist: 'Imagine Dragons', value: 3234552384     },
   { image: 'song11.jpg', name: 'Heat Waves', artist: 'Glass Animals', value: 3212949591     },
   { image: 'song12.jpg', name: 'Perfect', artist: 'Ed Sheeran', value: 3193729809   },
   { image: 'song13.jpg', name: 'Dance Monkey', artist: 'Tones And I', value: 3177746291     },
   { image: 'song14.jpg', name: 'lovely', artist: 'Billie Eilish', value: 3086438969  },
   { image: 'song15.jpg', name: 'Say You Wont Let Go', artist: 'James Arthur', value: 3081924440  },
   { image: 'song16.jpg', name: 'rockstar', artist: 'Post Malone', value: 3073792299  },
   { image: 'song17.jpg', name: 'Closer', artist: 'The Chainsmokers', value: 3055376127      },
   { image: 'song18.jpg', name: 'Something Just Like This', artist: 'The Chainsmokers', value: 2893397984  },
   { image: 'song19.jpg', name: 'Watermelon Sugar', artist: 'Harry Styles', value: 2887729547    },
   { image: 'song20.jpg', name: 'Señorita', artist: 'Shawn Mendes', value: 2877346947  },
   { image: 'song21.jpg', name: 'Riptide', artist: 'Vance Joy', value: 2851272376  },
   { image: 'song22.jpg', name: 'Take Me to Church', artist: 'Hozier', value: 2794898279     },
   { image: 'song23.jpg', name: 'Dont Start Now', artist: 'Dua Lipa', value: 2782889549  },
   { image: 'song24.jpg', name: 'Another Love', artist: 'Tom Odell', value: 2770015261   },
   { image: 'song25.jpg', name: 'Counting Stars', artist: 'OneRepublic', value: 2718384641  },
];

// Helper function to get a random song
function getRandomSong(excludeSong) {
    let randomSong;
    do {
        randomSong = songs[Math.floor(Math.random() * songs.length)];
    } while (randomSong === excludeSong);
    return randomSong;
}

// Function to update the game board
function updateGameBoard() {
    // Get two random songs
    const leftSong = getRandomSong();
    const rightSong = getRandomSong(leftSong);

    // Update left song details
    leftSongImage.src = leftSong.image;
    leftSongName.textContent = leftSong.name;
    leftArtistName.textContent = leftSong.artist;
    leftSong.views = leftSong.views;

    // Update right song details
    rightSongImage.src = rightSong.image;
    rightSongName.textContent = rightSong.name;
    rightArtistName.textContent = rightSong.artist;
    rightSong.views = rightSong.views;

    // Store the song data for comparison
    leftSongContainer = leftSong;
    rightSongContainer = rightSong;
}

// Event listeners for buttons
higherButton.addEventListener("click", () => handleGuess("higher"));
lowerButton.addEventListener("click", () => handleGuess("lower"));

// Handle guess
function handleGuess(guess) {
    const isCorrect =
        (guess === "higher" && rightSongContainer.views > leftSongContainer.views) ||
        (guess === "lower" && rightSongContainer.views < leftSongContainer.views);

    /*if (isCorrect) {
        alert("Correct! Your score is: " + ++score);
    } else {
        alert(
            `Wrong! Left song had ${leftSongContainer.views} views, right song had ${rightSongContainer.views} views.`
        );
        score = 0; // Reset score
    }
    */

    // Reload game board after 2 seconds
    setTimeout(updateGameBoard, 2000);
}

// Initialize the game
updateGameBoard();