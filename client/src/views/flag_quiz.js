const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');

const FlagQuiz = function (element) {
  this.element = element;
  this.data = [];
  this.answer = 0;
  this.answerlist = [];
  this.currentflags = [];
  this.score = 0;
  this.turn = 1;
}

FlagQuiz.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:flag-game-data', (event) => {
    this.data = event.detail;
    this.start();
  });
};

FlagQuiz.prototype.start = function () {
  this.answerlist = [];
  this.score = 0;
  this.turn = 1;
  this.randomAnswer();
  this.randomFlag();
};

FlagQuiz.prototype.randomAnswer = function () {
  this.answer = Math.floor(Math.random()*this.data.length);
  this.answerlist.push(this.answer);
  this.currentflags.push(this.answer);
};

FlagQuiz.prototype.randomFlag = function () {
  const rf1 = Math.floor(Math.random()*this.data.length);
  const rf2 = Math.floor(Math.random()*this.data.length);
  const rf3 = Math.floor(Math.random()*this.data.length);
  console.log(rf1);
  console.log(rf2);
  console.log(rf3);
};

// Sub all country data *
// Function RandomAnswer (selects a random country but not one that is in answerlist. Then adds index to answerlist)*
// Function RandomFlag (all flags except answer)
// Function AnswerFlag (matches answer)
// Function Arrange (creates 5 divs, country name on top and random assortment of flags below)

// Greeting text and start button



// 20 turns in total, 4 flags displayed, 1 Country name



// on click (correct or not) move onto next turn

// after turn 20, display score and congratulation/comiseration

// possible integrate mongodb to save name and score



module.exports = FlagQuiz;
