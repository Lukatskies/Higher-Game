console.log('hello')

// variables
const leftSongImage = document.getElementById("left-artist-image");
const leftSongName = document.getElementById("left-song-name");
const leftArtistName = document.getElementById("left-artist-name");

const rightSongImage = document.getElementById("right-artist-image");
const rightSongName = document.getElementById("right-song-name");
const rightArtistName = document.getElementById("right-artist-name");

const higherButton = document.getElementById("higher");
const lowerButton = document.getElementById("lower");

let score = 0;
let highScore = 0;

//DOM elements for score display
const highScoreElement = document.getElementById("high-score");
const currentScoreElement = document.getElementById("current-score");

//function for updating score display
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

// close popup when "Start Game!" link is clicked
document.querySelector("#startGame").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    document.querySelector(".popup").style.display = "none";
});

let leftartistContainer, rightartistContainer;

// songs object list
const songs = [
    { image: 'The Weeknd.jpg', name: 'Blinding Lights', artist: 'The Weeknd', value: 3900000000 },
   { image: 'Ed Sheeran.jpg', name: 'Shape of You', artist: 'Ed Sheeran', value: 4121376734  },
   { image: 'Lewis Capaldi.jpeg', name: 'Someone You Loved', artist: 'Lewis Capaldi', value: 3698757381 },
   { image: 'Harry Styles.jpg', name: 'As It Was', artist: 'Harry Styles', value: 3656679922   },
   { image: 'Post Malone.jpg', name: 'Sunflower', artist: 'Post Malone', value:  3617634336   },
   { image: 'The Weeknd.jpg', name: 'Starboy', artist: 'The Weeknd', value: 3609115364       },
   { image: 'Drake.jpg', name: 'One Dance', artist: 'Drake', value: 3437708671      },
   { image: 'The Neighborhood.jpg', name: 'Sweater Weather', artist: 'The Neighbourhood', value: 3392313583    },
   { image: 'The Kid LAROI.jpg', name: 'STAY', artist: 'The Kid LAROI', value: 3368428206    },
   { image: 'Imagine Dragons.jpg', name: 'Believer', artist: 'Imagine Dragons', value: 3234552384     },
   { image: 'Glass Animals.jpeg', name: 'Heat Waves', artist: 'Glass Animals', value: 3212949591     },
   { image: 'Ed Sheeran.jpg', name: 'Perfect', artist: 'Ed Sheeran', value: 3193729809   },
   { image: 'Tones and I.jpg', name: 'Dance Monkey', artist: 'Tones And I', value: 3177746291     },
   { image: 'Billie Eilish.jpg', name: 'lovely', artist: 'Billie Eilish', value: 3086438969  },
   { image: 'James Arthur.jpeg', name: 'Say You Wont Let Go', artist: 'James Arthur', value: 3081924440  },
   { image: 'Post Malone.jpg', name: 'rockstar', artist: 'Post Malone', value: 3073792299  },
   { image: 'The Chainsmokers.jpeg', name: 'Closer', artist: 'The Chainsmokers', value: 3055376127      },
   { image: 'The Chainsmokers.jpeg', name: 'Something Just Like This', artist: 'The Chainsmokers', value: 2893397984  },
   { image: 'Harry Styles.jpg', name: 'Watermelon Sugar', artist: 'Harry Styles', value: 2887729547    },
   { image: 'Shawn Mendes.jpeg', name: 'Señorita', artist: 'Shawn Mendes', value: 2877346947  },
   { image: 'Vance Joy.jpg', name: 'Riptide', artist: 'Vance Joy', value: 2851272376  },
   { image: 'Hozier.jpg', name: 'Take Me to Church', artist: 'Hozier', value: 2794898279     },
   { image: 'Dua Lipa.jpg', name: 'Dont Start Now', artist: 'Dua Lipa', value: 2782889549  },
   { image: 'Tom Odell.jpg', name: 'Another Love', artist: 'Tom Odell', value: 2770015261   },
   { image: 'OneRepublic.jpg', name: 'Counting Stars', artist: 'OneRepublic', value: 2718384641  },
];

// Define the base directory for images
const imageDirectory = "Songs/Song Images/";

// Helper function to get a random artist
function getRandomArtist(excludeartist) {
    let randomartist;
    do {
        randomartist = songs[Math.floor(Math.random() * songs.length)];
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
    leftSongImage.src = imageDirectory + leftartist.image;
    leftArtistName.textContent = leftartist.artist;
    leftSongName.textContent = leftartist.name;
    leftartistContainer = leftartist;

 

    // Update right artist details
    rightSongImage.src = imageDirectory + rightartist.image;
    rightArtistName.textContent = rightartist.artist;
    rightSongName.textContent = rightartist.name;
    rightartistContainer = rightartist;
}

//Event listeners for buttons
higherButton.addEventListener("click", () => handleGuess("higher"));
lowerButton.addEventListener("click", () => handleGuess("lower"));


//Animation stuff//
const leftArtistStreams = document.getElementById("left-artist-streams");
const rightArtistStreams = document.getElementById("right-artist-streams");

//function to animate the streams count//
function animateCount(element, targetValue) {
    let currentValue = 0;
    const duration = 2000; 
    const increment = Math.ceil(targetValue / (duration / 16)); 

    function update() {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
        }
        element.textContent = currentValue.toLocaleString(); 
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
        resultGif.src = "Albums/Gif File/Red X.gif";
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

    leftSongImage.src = imageDirectory + leftartist.image;
    leftArtistName.textContent = leftartist.artist;
    leftSongName.textContent = leftartist.name;
    leftartistContainer = leftartist;
    leftArtistStreams.textContent = ""; 

    rightSongImage.src = imageDirectory + rightartist.image;
    rightArtistName.textContent = rightartist.artist;
    rightSongName.textContent = rightartist.name;
    rightartistContainer = rightartist;
    rightArtistStreams.textContent = ""; 
}

updateGameBoard();
updateScoreDisplay();