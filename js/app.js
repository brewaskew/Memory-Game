//create deck of cards and call displayCards function
document.addEventListener('DOMContentLoaded', function (e) {
    //creates array of each kind of card value
    const shortDeck = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf",
        "fa fa-bicycle", "fa fa-bomb"];

    //creates array of eack kind of card value and a matching card for each
    const deck = shortDeck.concat(shortDeck);

    displayCards(deck);

    //Setup gameplay variables
    const gamePlay = document.querySelector(".deck");
    let openCards = [];
    let stars = document.getElementsByClassName('stars');
    let moves = 0;
    let displayScore = document.querySelector(".moves");
    displayScore.innerText = moves;
    let matchedSet = 0;

    //Setup stopwatch variables
    const timer = document.getElementsByTagName('time');
    let start = true;
    let seconds = 0;
    let minutes = 0;
    const startClock = document.querySelector(".deck");

    /*modal-box implementation with help from https://sabe.io/tutorials/how-to-create-modal-popup-box
    **and "Javascript and Jquery - interactive front-end web development" By: Jon Duckett */
    //Setup modal-box variables
    const content = document.querySelector(".content");
    const modal = document.querySelector(".modal");
    const closeButton = document.querySelector(".close-button");
    const replay = document.querySelector(".replay");
    let finalTime = 0;
    let finalStars = 0;

    //toggle modal-box on and off
    function toggleModal() {
        modal.classList.toggle("show-modal");
    }

    closeButton.addEventListener("click", toggleModal);


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

    //On user click of a card, display it face-up
    function flipCard(card) {
        card.target.classList.add('flip');
        card.target.classList.add('open');
        card.target.classList.add('show');
    }



    //Check if cards are a match and lock them in place. Return 1 to increment matchedSets counter
    function setMatch(openCardsArray) {

        for (let i = 0; i < openCardsArray.length; i++) {
            openCardsArray[i].classList.add('match');
        }
        return 1;
    }


    //resets flipped cards back to facedown and returns 0 to keep matched sets at current value
    function noMatchedSet(card1, card2) {
        setTimeout(function (arg1, arg2) {
            card1.classList.remove('open');
            card2.classList.remove('open');
            card1.classList.remove('show');
            card2.classList.remove('show');
        }, 700, card1, card2);
        setTimeout(function (arg1, arg2) {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
        }, 850, card1, card2);
        return 0;
    }


    //updates the visible clock on the game
    function adjustClock(clock) {

        seconds++
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }
        if (seconds <= 9 && minutes === 0) {
            clock.textContent = "00:0" + seconds;
        }
        else if (seconds > 9 && minutes === 0) {
            clock.textContent = "00:" + seconds;
        }
        else if (seconds <= 9 && minutes <= 9) {
            clock.textContent = "0" + minutes + ":0" + seconds;
        }
        else if (seconds > 9 && minutes <= 9) {
            clock.textContent = "0" + minutes + ":" + seconds;
        }
        else if (seconds <= 9 && minutes > 9) {
            clock.textContent = minutes + ":0" + seconds;
        }
        else {
            clock.textContent = minutes + ":" + seconds;
        }

        //calls stopwatch again to keep time counter going
        stopWatch(clock);
    }

    //starts stopwatch and sends updated time to adjustClock function
    function stopWatch(clock) {
        let time;

        if (start === true) {
            time = setTimeout(adjustClock, 1000, clock);
        }
        else {
            clearTimeout(time);
        }
    }

    //returns final star count when user wins game
    function getFinalStars(totalMoves) {
        if (totalMoves < 13) {
            return 3;
        }
        else if (totalMoves >= 17) {
            return 1;
        }
        else {
            return 2;
        }
    }

    //returns formatted final time string when user wins game
    function getFinalTime(sec, min) {
        if (sec <= 9 && min === 0) {
            return "00:0" + sec;
        }
        else if (sec > 9 && min === 0) {
            return "00:" + sec;
        }
        else if (sec <= 9 && min <= 9) {
            return "0" + min + ":0" + sec;
        }
        else if (sec > 9 && min <= 9) {
            return "0" + min + ":" + sec;
        }
        else if (sec <= 9 && min > 9) {
            return min + ":0" + sec;
        }
        else {
            return min + ":" + sec;
        }
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

    //on first card click, start stopwatch.
    startClock.addEventListener('click', function (evt) {
        if (evt.target.className === "card") {
            stopWatch(timer[0]);
            startClock.removeEventListener('click', arguments.callee);
        }
    });



    /*On user click of a card, display the card face-up using flipCard function and add card to openCards array.
    **Check if 2 cards are in openCards array, if yes, compare the cards for a match.  If the cards match lock them
    **in the face-up position.  If not a match, set back to face-down.  Increment moves counter by 1 and remove the cards
    **from the openCards array.  Check number of moves and increment star counter down by 1, if appropriate.
    **Check if all cards have been matched, if yes, stop timer and display "winner" modal-box.
    */
    gamePlay.addEventListener('click', function (evt) {

        if (evt.target.className === "card" && openCards.length < 2) {
            openCards.push(evt.target);
            flipCard(evt);

            if (openCards.length === 2) {
                flipCard(evt);
                moves += 1;
                displayScore.innerText = moves;
                if (openCards[0].firstElementChild.classList[1] === openCards[1].firstElementChild.classList[1]) {
                    matchedSet += setMatch(openCards);
                }
                else {
                    noMatchedSet(openCards[0], openCards[1]);
                }

                //If all cards matched, stop timer and display "winner" modal-box
                /*modal-box implementation with help from https://sabe.io/tutorials/how-to-create-modal-popup-box
                **and "Javascript and Jquery - interactive front-end web development" By: Jon Duckett */
                if (matchedSet === 8) {
                    start = false;
                    finalStars = getFinalStars(moves);

                    finalTime = getFinalTime(seconds, minutes);
                    if (finalStars === 1) {
                        content.textContent = "You achieved " + finalStars + " star, with " + moves + " moves, in " + finalTime + ".";
                    }
                    else {
                        content.textContent = "You achieved " + finalStars + " stars, with " + moves + " moves, in " + finalTime + ".";
                    }

                    replay.addEventListener("click", function () {
                        location.reload();
                    });
                    toggleModal();
                }

                //remove open cards from the array

                setTimeout(function () {
                    console.log(openCards.length);
                    while (openCards.length !== 0) {
                        openCards.pop();
                    }
                    console.log(openCards.length);
                }, 1000);

                //change stars score
                if (moves === 13) {
                    let removeEl = stars[0].children[2];
                    stars[0].removeChild(removeEl);
                }
                else if (moves === 17) {
                    let removeEl = stars[0].children[1];
                    stars[0].removeChild(removeEl);
                }
            }
        }

        //Reset the game
        const gameReset = document.querySelector('.restart');
        gameReset.addEventListener('click', function (evt) {
            location.reload();
        });

    });

});