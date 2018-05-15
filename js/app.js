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
        
    for (let i=0; i<deckGrid.children.length; i++) {
        deckGrid.children[i].outerHTML = "<li class='card'><i class='" + shuffledDeck[i] + "'></i></li>";
    }                
}

function flipCard(card, cardNum) {
    //console.log(card);
    if (cardNum === 0) {
        card.outerHTML = "<li id='card1' class='card open show'>" + card.innerHTML + "</i></li>";
    }
    else {
        card.outerHTML = "<li id='card2' class='card open show'>" + card.innerHTML + "</i></li>";
    }
    
}



//Once I get matched and unmatched cards working put into a function here



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



document.addEventListener('DOMContentLoaded', function(e) {
    const deck = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o",
                  "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube",
                  "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"]; 

    displayCards(deck);    

    const gamePlay = document.querySelector(".deck");
    let openCards = [];
    let moves = 0;
    let displayScore = document.querySelector(".moves");
    displayScore.innerText = moves;

    gamePlay.addEventListener('click', function(evt) {
        if (evt.target.className === "card") {
            flipCard(evt.target);
            openCards.push(evt.target);

            if (openCards.length === 2) {
                console.log(openCards);
                if (openCards[0].innerHTML === openCards[1].innerHTML) {
                    //setMatch(openCards);
                    for (let i=0; i<openCards.length; i++) {
                        openCards[i].outerHTML = "<li class='card match'>" + openCards[i].innerHTML + "</li>";
                    }
                    openCards.pop();
                    openCards.pop();
                }
                else {
                    for (let i=0; i<openCards.length; i++) {
                        openCards[i].outerHTML = "<li class='card'>" + openCards[i].innerHTML + "</li>";
                    }
                    openCards.pop();
                    openCards.pop();
                }
            }
        }

    });

});