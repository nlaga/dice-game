/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/


var scores, roundScore, activePlayer, gamePlaying;


//Call the function to initialize the game (= our app variables), see at the end of the code
init();

var lastDice; //here to be accessible to the global scope

document.querySelector('.btn-roll').addEventListener('click', function(){ 
// That means -> inside the object document, with the .querySelector method, select the html class 'btn-roll' and add it to an event listener of type 'click' that trigger a function() define bellow (note that this function() is an anomnymouis function -> no name and only use in this element of code ):
    if (gamePlaying) { //If the game is playing
        // What we do when somebody click that button:
        // 1. Get a Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        //3. Update the round score IF the rolled was NOT a 1
        if (dice1 !== 1 && dice2 !== 1) {
            //Add score
            roundScore += dice1 + dice2;
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

        var input = document.querySelector('.final-score').value;
        var winningScore; 

        // Undefined, 0, null or "" are COERCED to false
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        //3. Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            // Set current player name to 'WINNER'
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
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

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
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
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    // Remove all the active and winner classes for the player panels
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    // And add the active class for the Player 1
    document.querySelector('.player-0-panel').classList.add('active'); //and winner class to the winner
}






















