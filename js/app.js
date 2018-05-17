/*
 * Create a list that holds all of your cards
 */



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function displayCards(cardDeck) {
    const shuffledDeck = shuffle(cardDeck);
    const deckGrid = document.querySelector('.deck');

    for (let i = 0; i < deckGrid.children.length; i++) {
        deckGrid.children[i].outerHTML = "<li class='card'><i class='" + shuffledDeck[i] + "'></i></li>";
    }
}

function flipCard(card) {
    card.target.classList.add('flip');
    card.target.classList.add('open');
    card.target.classList.add('show');
}



//Check if cards are a match and lock them in place.
function setMatch(openCardsArray) {

        for (let i = 0; i < openCardsArray.length; i++) {
            openCardsArray[i].classList.add('match');
        }
        return 1;
}

function noMatchedSet(openCardsArray) {
      
        for (let i = 0; i < openCardsArray.length; i++) {
            openCardsArray[i].classList.remove('flip');
            openCardsArray[i].classList.remove('open');
            openCardsArray[i].classList.remove('show');
        }
        return 0;
}



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



document.addEventListener('DOMContentLoaded', function (e) {
    const deck = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o",
        "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube",
        "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

    displayCards(deck);

    const gamePlay = document.querySelector(".deck");
    let openCards = [];
    let stars = document.getElementsByClassName('stars');
    let moves = 0;
    let displayScore = document.querySelector(".moves");
    displayScore.innerText = moves;
    let matchedSet = 0;


    gamePlay.addEventListener('click', function (evt) {
            if (evt.target.className === "card") {
                flipCard(evt);
                openCards.push(evt.target);
    
                if (openCards.length === 2) {
                    moves += 1;
                    displayScore.innerText = moves;
                    if (openCards[0].firstElementChild.classList[1] === openCards[1].firstElementChild.classList[1]) {
                        matchedSet += setMatch(openCards);
                    }
                    else {
                        noMatchedSet(openCards);
                    }

                    if (matchedSet === 8) {
                        console.log('you won');
                    }
                    openCards.pop();
                    openCards.pop();

                    //change stars score
                    if (moves === 13) {
                        let removeEl = stars[0].children[2];
                        stars[0].removeChild(removeEl);
                    }
                    else if (moves === 17) {
                        removeEl = stars[0].children[1];
                        stars[0].removeChild(removeEl);
                    }
                }           
            }            

            const gameReset = document.querySelector('.restart');
            gameReset.addEventListener('click', function (evt) {
                displayCards(deck);  //reset deck and grid
                moves = 0;  //reset number of moves
                displayScore.innerText = moves;
                matchedSet = 0;  //reset number of matches
                for (let i=0; i<openCards.length; i++) {  //remove any open cards in openCards array
                    openCards.pop();
                }
                
                /******Reset stars score******/
                let newEl = document.createElement('li');
                let newI = document.createElement('i');
                newI.className = 'fa fa-star';
                newEl.appendChild(newI);
                                
                for (let i=stars[0].children.length; i<3; i++) {
                    stars[0].appendChild(newEl);
                }   
            });
        
    });

});