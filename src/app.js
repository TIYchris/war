var $ = require('jquery');
var Mustache = require('mustache');
var _ = require('lodash');

$(document).ready(function() {
  var values = {
    '2': 0,
    '3': 1,
    '4': 2,
    '5': 3,
    '6': 4,
    '7': 5,
    '8': 6,
    '9': 7,
    'T': 8,
    'J': 9,
    'Q': 10,
    'K': 11,
    'A': 12
  };
  var pips = [0, 0, '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

  var Player = {
    giveCard: function(card) {
      if (!this.cards) {
        this.cards = [];
      }

      this.cards.push(card);
    },

    getNextCard: function() {
      return this.cards.shift();
    },

    cardsRemaining: function() {
      return this.cards.length;
    }
  };

  var Game = {
    start: function() {
      this.player1 = Object.create(Player);
      this.player1.name = "Player 1";
      this.player2 = Object.create(Player);
      this.player2.name = "Player 2";

      // Create a deck of cards
      var cards = [];
      for (var i = 2; i < 15; i++) {
        cards.push(pips[i] + "S");
        cards.push(pips[i] + "H");
        cards.push(pips[i] + "C");
        cards.push(pips[i] + "D");
      }

      // Shuffle the cards
      cards = _.shuffle(cards);

      // Deal the cards to the players
      while (cards.length) {
        this.player1.giveCard(cards.pop());
        this.player2.giveCard(cards.pop());
      }

      // Now that we've dealt the cards, enter the "playing" state.
      this.state = "playing";
      this.playNextCard();
      render();
    },

    playNextCard: function() {
      if (this.player1.cardsRemaining() < 1) {
        this.winner = this.player2;
        this.state = "done";
        return render();
      }

      if (this.player2.cardsRemaining() < 1) {
        this.winner = this.player1;
        this.state = "done";
        return render();
      }

      this.kitty = [];
      this.card1 = this.player1.getNextCard();
      this.card2 = this.player2.getNextCard();

      this.determineWinner();
      render();
    },

    playWar: function() {
      if (this.player1.cardsRemaining() < 4) {
        this.winner = this.player2;
        this.state = "done";
        return render();
      }

      if (this.player2.cardsRemaining() < 4) {
        this.winner = this.player1;
        this.state = "done";
        return render();
      }

      this.kitty.push(this.card1);
      this.kitty.push(this.card2);
      this.kitty.push(this.player1.getNextCard());
      this.kitty.push(this.player1.getNextCard());
      this.kitty.push(this.player1.getNextCard());
      this.kitty.push(this.player2.getNextCard());
      this.kitty.push(this.player2.getNextCard());
      this.kitty.push(this.player2.getNextCard());

      this.card1 = this.player1.getNextCard();
      this.card2 = this.player2.getNextCard();

      this.determineWinner();
      render();
    },

    determineWinner: function() {
      // Figure out who won
      var value1 = values[this.card1[0]];
      var value2 = values[this.card2[0]];

      if (value1 === value2) {
        this.whoWon = "It's a tie.  Go to War!";
        this.winner = undefined;
      } else if (value1 > value2) {
        this.whoWon = "Player 1 Won!";
        this.winner = this.player1;
      } else {
        this.whoWon = "Player 2 Won!";
        this.winner = this.player2;
      }

      if (this.winner) {
        this.kitty.push(this.card1);
        this.kitty.push(this.card2);

        this.cardsWon = this.kitty.length;
        while (this.kitty.length) {
          this.winner.giveCard(this.kitty.pop());
        }
        this.state = "playing";
      } else {
        this.state = "war";
      }
    }
  };

  function onStart(e) {
    game.start();
  }

  function onNext(e) {
    game.playNextCard();
  }

  function onWar(e) {
    game.playWar();
  }

  function render() {
    var template = $("#" + game.state).text();
    $("#container").html(Mustache.render(template, game));

    $("#startButton").click(onStart);
    $('#nextButton').click(onNext);
    $('#warButton').click(onWar);

  }

  // Set up the initial game state.
  var game = Object.create(Game);
  game.state = "start";
  render();
});
