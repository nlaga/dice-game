/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;


//Call the function to initialize the game (= our app variables), see at the end of the code
init();

document.querySelector('.btn-roll').addEventListener('click', function(){ 
// That means -> inside the object document, with the .querySelector method, select the html class 'btn-roll' and add it to an event listener of type 'click' that trigger a function() define bellow (note that this function() is an anomnymouis function -> no name and only use in this element of code ):
    if (gamePlaying) { //If the game is playing
        // What we do when somebody click that button:
        // 1. Get a Random number
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM = document.querySelector('.dice')
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png'

        //3. Update the round score IF the rolled was NOT a 1
        if (dice !== 1) {
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
    }
});

//Configuration of the Hold button, what happen when a player click the hold button:
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        //1. Add the current score to the global score
        scores[activePlayer] += roundScore; //because the activePlayer value corresponds to the index of scores array.
        
        //2. Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //3. Check if player won the game
        if (scores[activePlayer] >= 100) {
            // Set current player name to 'WINNER'
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!!';
            document.querySelector('.dice').style.display = 'none'; //and remove the dice
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'); //and winner class to the winner
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); //and remove active class to the winner
            gamePlaying = false;
        } else {
            //4 Next player
        nextPlayer();
        }
    }
});


function nextPlayer () {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // switch player
    roundScore = 0 //reset roundscore to 0 because you do 1

    //Reset current score to 0 in the interface
    document.getElementById('current-0').textContent = '0'; //To reset current score to 0 for player 1
    document.getElementById('current-1').textContent = '0'; //To reset current score to 0 for player 2

    //Highlight in the interface who is the current player (with bold and red dot)
    //for that we will change the html classes ex.: class="player-0-panel active" to class="player-0-panel" if not active by removing the "active" class to "player-0-panel"
    //document.querySelector('.player-0-panel').classList.remove('active');
    //and add it to the other player panel
    //document.querySelector('player-1-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.toggle('active'); //.toggle method remove if the class is here and add if not
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}


// New game button implementation
document.querySelector('.btn-new').addEventListener('click', init) //When someone click the button call the init() function


function init() {
    // 1. Initialyze app variables
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    // 2. Initialyse the UI elements
    // Initialyse UI scores
    document.getElementById('score-0').textContent = '0' // .getElementById method is only for html id (and we not need the css # symbol for id before as in .querySelector)
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    // Initialyse players names
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    // Initialyse UI dice
    document.querySelector('.dice').style.display = 'none'; // That means -> inside the object document, with the .querySelector method, select the html class 'dice' and add to it a css display style of 'none'
    // Remove all the active and winner classes for the player panels
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    // And add the active class for the Player 1
    document.querySelector('.player-0-panel').classList.add('active'); //and winner class to the winner
}



//document.querySelector('#current-' + activePlayer).textContent = dice; //This is a setter
// That means -> inside the object document, with the .querySelector method, set the content of html id 'current-1' to the value of the dice variable as a text content (.textContent)

// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'
// That means -> inside the object document, with the .querySelector method, set the content of html id 'current-1' to the value of the dice variable as an html content (.innerHTML)

//var x = document.querySelector('#score-0').textContent; //This is a getter
// That means -> inside the object document, with the .querySelector method, get the text content of html id 'score-0' and store it into the x variable























