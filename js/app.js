import Question from './Question.js';
import Quiz from './Quiz.js';

const App = (() => {
  // cache the DOM
  const quizEL = document.querySelector('.jabquiz');
  const quizQuestionEl = document.querySelector('.jabquiz__question');
  const trackerEl = document.querySelector('jabquiz__tracker');
  const taglineEl = document.querySelector('.jabquiz__tagline');
  const choicesEl = document.querySelector('.jabquiz__choices');
  const progressInnerEl = document.querySelector('.progress__inner');
  const nextButtonEl = document.querySelector('.next');
  const restartButtonEl = document.querySelector('.restart');
})();

