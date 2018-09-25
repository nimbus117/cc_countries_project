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
  this.element.innerHTML = '';
  this.answerlist = [];
  this.score = 0;
  this.turn = 1;
  this.currentflags = [];
  this.randomAnswer();
  this.getFlags();
  this.arrange();
};

FlagQuiz.prototype.randomAnswer = function () {
  this.answer = Math.floor(Math.random()*this.data.length);
  this.answerlist.push(this.answer);
  this.currentflags.push(this.answer);
  // console.log(this.answer);
};

FlagQuiz.prototype.getFlags = function () {
  const rf1 = Math.floor(Math.random()*this.data.length);
  const rf2 = Math.floor(Math.random()*this.data.length);
  const rf3 = Math.floor(Math.random()*this.data.length);
  this.currentflags.push(rf1,rf2,rf3);
  // console.log(this.currentflags);
};

FlagQuiz.prototype.arrange = function () {
  const random1 = this.randomFlag();
  const random2 = this.randomFlag();
  const random3 = this.randomFlag();
  const random4 = this.randomFlag();

  const namediv = createAppend('div','',this.element);
  const scorediv = createAppend('div','',this.element);
  const flagdiv1 = createAppend('div','',this.element);
  const flagdiv2 = createAppend('div','',this.element);
  const flagdiv3 = createAppend('div','',this.element);
  const flagdiv4 = createAppend('div','',this.element);

  namediv.id = 'fqname';
  scorediv.id = 'fqscore';
  flagdiv1.id = 'fqflag1';
  flagdiv2.id = 'fqflag2';
  flagdiv3.id = 'fqflag3';
  flagdiv4.id = 'fqflag4';

  const answername = createAppend('h1', `Find the Flag for ${this.data[this.answer].name}!`, namediv);
  const scoredisplay = createAppend('h2', `Score: ${this.score}/20`, scorediv);
  const flag1 = createAppend('img', '', flagdiv1);
  const flag2 = createAppend('img', '' , flagdiv2);
  const flag3 = createAppend('img', '', flagdiv3);
  const flag4 = createAppend('img', '', flagdiv4);

  flag1.src = this.data[random1].flag;
  flag2.src = this.data[random2].flag;
  flag3.src = this.data[random3].flag;
  flag4.src = this.data[random4].flag;

  flag1.addEventListener('click', e => {
    if (flag1.src === this.data[this.answer].flag) {
      this.score++;
    }
    this.next();
    console.log(this.score);
  });
  flag2.addEventListener('click', e => {
    if (flag2.src === this.data[this.answer].flag) {
      this.score++;
    }
    this.next();
    console.log(this.score);
  });
  flag3.addEventListener('click', e => {
    if (flag3.src === this.data[this.answer].flag) {
      this.score++;
    }
    this.next();
    console.log(this.score);
  });
  flag4.addEventListener('click', e => {
    if (flag4.src === this.data[this.answer].flag) {
      this.score++;
    }
    this.next();
    console.log(this.score);
  });
};

FlagQuiz.prototype.randomFlag = function () {
  const result = this.currentflags[Math.floor(Math.random()*this.currentflags.length)];
  // console.log(result);
  // console.log(this.currentflags);
  const index = this.currentflags.indexOf(result);
  this.currentflags.splice(index, 1);
  // console.log(this.currentflags);
  return result;
};

FlagQuiz.prototype.next = function () {
  if (this.turn < 20) {
    this.turn++;
    this.element.innerHTML = '';
    this.randomAnswer();
    this.getFlags();
    this.arrange();
  } else {
    this.endgame();
  }
};

FlagQuiz.prototype.endgame = function () {

};

// Sub all country data *
// Function RandomAnswer (selects a random country but not one that is in answerlist. Then adds index to answerlist)*
// Function RandomFlag (all flags except answer)*
// Function AnswerFlag (matches answer)*
// Function Arrange (creates 5 divs, country name on top and random assortment of flags below)

// Greeting text and start button



// 20 turns in total, 4 flags displayed, 1 Country name



// on click (correct or not) move onto next turn

// after turn 20, display score and congratulation/comiseration

// possible integrate mongodb to save name and score



module.exports = FlagQuiz;
