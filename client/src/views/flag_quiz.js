const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');

const FlagQuiz = function (element) {
  this.element = element;
  this.answerlist = [];
  this.score = 0;
  this.turn = 1;
}

FlagQuiz.prototype.start = function () {
  
};

// Sub all country data
// Function RandomAnswer (selects a random country but not one that is in answerlist. Then adds index to answerlist)
// Function RandomFlag (all flags except answer, on click go to next turn)
// Function AnswerFlag (matches answer, on click score++ and go to next turn)


// Greeting text and start button



// 20 turns in total, 4 flags displayed, 1 Country name



// on click (correct or not) move onto next turn

// after turn 20, display score and congratulation/comiseration

// possible integrate mongodb to save name and score



module.exports = FlagQuiz;
