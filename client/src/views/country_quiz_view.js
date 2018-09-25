const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');

const CountryQuizView = function (element) {
  this.element = element;
};

CountryQuizView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:country-quiz', e => this.render(e.detail));
};

CountryQuizView.prototype.render = function (quizData) {
  this.element.innerHTML = '';
  const form = createAppend('form', '', this.element);

  const createQuestion = function (property, question, name) {
    const answers = [];
    answers.push({answer: quizData['true'][property], correct: 1});
    quizData['false'].forEach(e => answers.push({answer: e[property], correct: 0}));
    const label = createAppend('label', `${question}?`, form);
    label.classList.add('quiz-question');
    label.setAttribute("for", name)
    answers.forEach(a => {
      createAppend('br', '', form)
      const input = createAppend('input', '', form);
      input.classList.add('quiz-answer');
      input.value = a.correct;
      input.type = 'radio';
      input.name = name;
      const label = createAppend('label', ` ${a.answer}`, form)
    })
  }

  createQuestion('capital', `What is the capital city of ${quizData[true].name}`, 'quiz-capital');
  createQuestion('population', `What is the population of ${quizData[true].name}`, 'quiz-population');
  createQuestion('region', `What region is ${quizData[true].name} in`, 'quiz-population');
  createQuestion('demonym', `What do you call someone from ${quizData[true].name}`, 'quiz-population');
  createQuestion('area', `What is the area of ${quizData[true].name}`, 'quiz-population');
};

module.exports = CountryQuizView;
