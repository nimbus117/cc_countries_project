const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');

const FlagQuiz = function (element) {
  this.element = element;
  this.quizdiv = null;
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
      newAnswer = Math.floor(Math.random()*250);
    }
  });
  this.answer = newAnswer;
  this.answerlist.push(this.answer);
  this.currentflags.push(this.answer);
};

FlagQuiz.prototype.getFlags = function () {
  const rf1 = Math.floor(Math.random()*this.data.length);
  const rf2 = Math.floor(Math.random()*this.data.length);
  const rf3 = Math.floor(Math.random()*this.data.length);
  this.currentflags.push(rf1,rf2,rf3);
};

FlagQuiz.prototype.arrange = function () {
  this.quizdiv = createAppend('div', '', this.element)
  this.quizdiv.id = 'quiz-box';

  const random1 = this.randomFlag();
  const random2 = this.randomFlag();
  const random3 = this.randomFlag();
  const random4 = this.randomFlag();

  const namediv = createAppend('div','',this.quizdiv);
  const scorediv = createAppend('div','',this.quizdiv);
  const turndiv = createAppend('div','',this.quizdiv);
  const flagdiv = createAppend('div','',this.quizdiv);

  namediv.id = 'fqname';
  scorediv.id = 'fqscore';
  turndiv.id = 'fqturn';
  flagdiv.id = 'fqflags';

  const answername = createAppend('h1', `Find the Flag for ${this.data[this.answer].name}!`, namediv);
  const scoredisplay = createAppend('h2', `Score: ${this.score}/20`, scorediv);
  const turndisplay = createAppend('h2', `Round: ${this.turn}/20`, turndiv);
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
  });
  flag2.addEventListener('click', e => {
    if (flag2.src === this.data[this.answer].flag) {
      this.score++;
    }
    this.next();
  });
  flag3.addEventListener('click', e => {
    if (flag3.src === this.data[this.answer].flag) {
      this.score++;
    }
    this.next();
  });
  flag4.addEventListener('click', e => {
    if (flag4.src === this.data[this.answer].flag) {
      this.score++;
    }
    this.next();
  });
};

FlagQuiz.prototype.randomFlag = function () {
  const result = this.currentflags[Math.floor(Math.random()*this.currentflags.length)];
  const index = this.currentflags.indexOf(result);
  this.currentflags.splice(index, 1);
  return result;
};

FlagQuiz.prototype.next = function () {
  if (this.turn < 20) {
    this.turn++;
    this.quizdiv.innerHTML = '';
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
      this.congrats = 'ERROR: LITERALLY IMPOSSIBLE SCORE! YOU DUN GOOFED!';
  }
};

FlagQuiz.prototype.endgame = function () {
  this.quizdiv.innerHTML = '';
  const end = createAppend('h1', 'Thanks for playing!', this.quizdiv);
  const score = createAppend('h2', `You scored ${this.score}/20!`, this.quizdiv);
  const congrats = createAppend('h2', this.congrats, this.quizdiv);
};

module.exports = FlagQuiz;
