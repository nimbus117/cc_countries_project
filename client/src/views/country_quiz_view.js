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

  const numberWithCommas = (x) => {
    if (x != null) 
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const createQuestion = (property, question, name) => {
    let answers = [{answer: quizData['true'][property], true: 1}];
    quizData['false'].forEach(c => answers.push({answer: c[property], true: 0}));
    answers = this.shuffleArray(answers);

    const container = createAppend('div', '', form)
    container.classList.add('question-container')
    const label = createAppend('label', `${question}?`, container);
    label.setAttribute("for", name)
    createAppend('br', '', container)

    answers.forEach(a => {
      createAppend('br', '', container)
      const input = createAppend('input', '', container);
      input.setAttribute('required', true)
      input.value = a.true;
      input.type = 'radio';
      input.name = name;
      const answer = numberWithCommas(a.answer) || 'N/A';
      const label = createAppend('label', ` ${answer}`, container)
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
    submitInput.setAttribute('disabled', true);
    let result = 5;
    for (let i = 0; i < 20; i++) {
      const input = e.target[i]
      if (input.value === '1') {
        input.classList.add('quiz-true');
      }
      if (input.value === '0' && input.checked === true) {
        input.classList.add('quiz-false');
        result--
      }
    }
    createAppend('span', ` ${result}/5 correctly answered`, form);
  })
};

module.exports = CountryQuizView;
