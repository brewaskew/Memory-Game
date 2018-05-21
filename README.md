# **Memory Game**

Memory Game is an app developed as part of the Grow with Google Front-End Nanodegree Program (FEND).  It is an exercise in using basic javascript techniques as well as a demonstration of accessing and manipulating the DOM.

The app recreates the classic card matchup game.  The user selects 2 cards in the hopes of making a match.  When all cards are matched, the user wins.

# **Features**

Memory Game features a point and click interface that allows the user to select a card, to flip, by clicking on it.  After 2 cards are selected, the app checks if the cards are a match, and locks them face-up if they do match, otherwise they are flipped back to face-down.  The app keeps track of the number of moves (1 move = selecting 2 cards to be compared for a match) it takes the user to match all 8 pairs of cards.  The app also keeps track of the amount of time it takes the user to match all the cards, as well as set an arbitrary star ranking based on the number of moves (<13 moves = 3 stars, >13 and < 17 moves = 2 stars, >17 moves = 1 star).  When the user has matched all 8 pairs of cards, the app displays a modal-box showing the star ranking, total time, and total moves it took to win the game.

# **Development**

## Organization

The app consists of:
1. index.html
2. css/app.css
3. js/app.js

## Dependencies
In making this app, I created a bulk of the javascript code myself.  Some code was either provided or heavily relied on for the following:

1. Starter code (mainly index.html and app.css) were provided by Udacity at: https://github.com/udacity/fend-project-memory-game
2. The starter code used font-awesome icons, which I kept in place during my development.  https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css
3.  The starter code also used Google Font "Coda".  https://fonts.googleapis.com/css?family=Coda
4. For the implementation of the modal-box I relied heavily on an example from SABE at: https://sabe.io/tutorials/how-to-create-modal-popup-box and the book, "Javascript & Jquery - interactive front-end web development" by: Jon Duckett
5. For the implementation of the timer function I used ideas and elements as presented by: https://jsfiddle.net/Daniel_Hug/pvk6p/
6. A special "thank you" shout-out to Vanessa Chau (FEND slack - VanessaS) for getting me pointed in the right direction for updating the cards within the openCards array in app.js.

## Build & Theme
The site is built using html5, css3, and javascript, using font-awesome icons for the pictures on the cards.  The theme is a new style for an old classic.

## **Author**
Matt Scott

## **Release Notes**
Initial release: 6/19/18