const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');

const FlagQuiz = function (element) {
  this.element = element;
  this.data = [];
  this.answer = 0;
  this.answerlist = [];
  this.currentflags = [];
  this.score = 0;
  this.turn = 0;
  this.congrats = '';
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
  let newAnswer = Math.floor(Math.random()*this.data.length);
  this.answerlist.forEach(function(e) {
    if (e === newAnswer) {
      newAnswernewAnswer = Math.floor(Math.random()*250);
    }
  });
  this.answer = newAnswer;
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
  // console.log(this.answerlist);
  const random1 = this.randomFlag();
  const random2 = this.randomFlag();
  const random3 = this.randomFlag();
  const random4 = this.randomFlag();

  const namediv = createAppend('div','',this.element);
  const scorediv = createAppend('div','',this.element);
  const flagdiv = createAppend('div','',this.element);
  // const flagdiv2 = createAppend('div','',this.element);
  // const flagdiv3 = createAppend('div','',this.element);
  // const flagdiv4 = createAppend('div','',this.element);

  namediv.id = 'fqname';
  scorediv.id = 'fqscore';
  flagdiv.id = 'fqflags';
  // flagdiv2.id = 'fqflag2';
  // flagdiv3.id = 'fqflag3';
  // flagdiv4.id = 'fqflag4';

  const answername = createAppend('h1', `Find the Flag for ${this.data[this.answer].name}!`, namediv);
  const scoredisplay = createAppend('h2', `Score: ${this.score}/20`, scorediv);
  const flag1 = createAppend('img', '', flagdiv);
  const flag2 = createAppend('img', '' , flagdiv);
  const flag3 = createAppend('img', '', flagdiv);
  const flag4 = createAppend('img', '', flagdiv);

  flag1.src = this.data[random1].flag;
  flag2.src = this.data[random2].flag;
  flag3.src = this.data[random3].flag;
  flag4.src = this.data[random4].flag;

  flag1.height = '300';
  flag2.height = '300';
  flag3.height = '300';
  flag4.height = '300';

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
    this.checkscore();
    this.randomAnswer();
    this.getFlags();
    this.arrange();
  } else {
    this.endgame();
  }
};

FlagQuiz.prototype.checkscore = function () {
  let x = this.score;
  switch (true) {
    case (x===0):
      this.congrats = 'Either you are incredibly unlucky or you are trying to get the lowest score possible. If the former: Bad luck! If the latter: Well Done!';
      break;
    case (x<6):
      this.congrats = 'Better luck next time! Why not go back to the Map and do some cribbing?';
      break;
    case (x<11):
    this.congrats = 'Getting there! Why not go back to the Map and do some cribbing?';
      break;
    case (x<16):
      this.congrats = 'Well done! You are well on your way to being a Flag Master!';
      break;
    case (x<20):
      this.congrats = 'Excellent work! You should be programming this, not me!';
      break;
    case (x===20):
      this.congrats = 'WE ARE NOT WORTHY! WE ARE NOT WORTHY!';
      break;
    default:
      console.log('ERROR');
  }
};

FlagQuiz.prototype.endgame = function () {
  this.element.innerHTML = '';
  const end = createAppend('h1', 'Thanks for playing!', this.element);
  const score = createAppend('h2', `You scored ${this.score}/20!`, this.element);
  const congrats = createAppend('h2', this.congrats, this.element);
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
