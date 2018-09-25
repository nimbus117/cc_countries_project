const PubSub = require('../helpers/pub_sub.js');
const createAppend = require('../helpers/create_append.js');

const CountryQuizView = function (element) {
  this.element = element;
};

CountryQuizView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:country-quiz', e => this.render(e.detail));
};

CountryQuizView.prototype.shuffleArray = function (array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

CountryQuizView.prototype.render = function (quizData) {
  this.element.innerHTML = '';
  const form = createAppend('form', '', this.element);

  const createQuestion = (property, question, name) => {
    let answers = [];
    answers.push({answer: quizData['true'][property], correct: 1});
    quizData['false'].forEach(e => answers.push({answer: e[property], correct: 0}));
    answers = this.shuffleArray(answers);
    const container = createAppend('div', '', form)
    container.classList.add('question-container')
    const label = createAppend('label', `${question}?`, container);
    label.classList.add('quiz-question');
    label.setAttribute("for", name)
    createAppend('br', '', container)
    answers.forEach(a => {
      createAppend('br', '', container)
      const input = createAppend('input', '', container);
      input.classList.add('quiz-answer');
      input.setAttribute('required', true)
      input.value = a.correct;
      input.type = 'radio';
      input.name = name;
      const label = createAppend('label', ` ${a.answer}`, container)
    })
  }

  createQuestion('capital', `What is the capital city of ${quizData[true].name}`, 'quiz-capital');
  createQuestion('population', `What is the population of ${quizData[true].name}`, 'quiz-population');
  createQuestion('region', `What region is ${quizData[true].name} in`, 'quiz-region');
  createQuestion('demonym', `What do you call someone from ${quizData[true].name}`, 'quiz-demonym');
  createQuestion('area', `What is the area of ${quizData[true].name}`, 'quiz-area');

  const submitInput = createAppend('input', '', form);
  submitInput.type = 'submit';
  submitInput.value = 'Submit';

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let result = 5;
    for (let i = 0; i < 20; i++) {
      const input = e.target[i]
      if (input.value === '1') {
        input.classList.add('quiz-correct');
      }
      if (input.value === '0' && input.checked === true) {
        input.classList.add('quiz-incorrect');
        result--
      }
    }
    createAppend('h3', `${result}/5 correctly answered`, form);
  })
};

module.exports = CountryQuizView;
