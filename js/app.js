import Question from './Question.js';
import Quiz from './Quiz.js';

const App = (() => {
  // cache the DOM
  const quizEl = document.querySelector('.jabquiz');
  const quizQuestionEl = document.querySelector('.jabquiz__question');
  const trackerEl = document.querySelector('.jabquiz__tracker');
  const taglineEl = document.querySelector('.jabquiz__tagline');
  const choicesEl = document.querySelector('.jabquiz__choices');
  const progressInnerEl = document.querySelector('.progress__inner');
  const nextButtonEl = document.querySelector('.next');
  const restartButtonEl = document.querySelector('.restart');

const q1 = new Question(
  'First President of US?',
  ['Barrack', 'Osama', 'George', 'Monkey'],
  2
);
const q2 = new Question(
  'When was javascript created?',
  ['june 1995', 'Man 1995', 'July 1885', 'Sep 1996'],
  1
);
const q3 = new Question(
  'What does CSS stand for?',
  ['Country Sheriff Service ', 'Cascading Sexy Sheets', 'Cascading Style Sheet'],
  2
);
const q4 = new Question(
  'The full form of HTML is....?',
  ['Hyper Text Markup Language', 'Hold The Mike Lisa', 'Error'],
  0
)
const q5 = new Question(
  'console.log(typeof []) would return what?',
  ['Array', 'Object', 'null', 'array'],
  1
);

const quiz = new Quiz([q1, q2, q3, q4, q5]);

const listeners = _ => {
  nextButtonEl.addEventListener('click', function() {
    const selectedRadioElem = document.querySelector('input[name="choice"]:checked');
    if (selectedRadioElem) {
      const key = Number(selectedRadioElem.getAttribute("data-order"));
      quiz.guess(key);
      renderAll();
    }
  })
  restartButtonEl.addEventListener('click', function() {
    // 1 reset the quiz
    quiz.reset();
    // 2 renderAll
    renderAll();
    // 3 restore the next button
    nextButtonEl.style.opacity = 1;
  })
}

const setValue = (elem, value) => {
  elem.innerHTML = value;
};

const renderQuestion = _ => {
  const question = quiz.getCurrentQuestion().question;
  setValue(quizQuestionEl, question);
};

const renderChoicesElements = _ => {
   let markup = '';
   const currentChoices = quiz.getCurrentQuestion().choices;
   currentChoices.forEach( (elem, index) => {
     markup += `
     <li class="jabquiz__choice">
        <input type="radio" name="choice" class="jabquiz__input" data-order="${index}" id="choice${index}">
        <label for="choice${index}" class="jabquiz__label">
          <i></i>
          <span>${elem}</span>
        </label>
      </li>
     `
   });
    // volgende regel kan vervangen worden door setValue functie.
    // choicesEl.innerHTML = markup;
   setValue(choicesEl, markup);
};

const renderTracker = _ => {
  const index = quiz.currentIndex;
  setValue(trackerEl, `${index+1} of ${quiz.questions.length}`);
};

const getPercentage = (num1, num2) => {
  return Math.round( (num1/num2) * 100 );
}

const launch = (width, maxPercent) => {
  let LoadingBar = setInterval( function() {
    if (width > maxPercent) {
      clearInterval(LoadingBar);
    } else {
      width += 1;
      progressInnerEl.style.width = width + '%';
    }
  }, 3)
}

const renderProgress = _ => {
  // 1 width
  const currentWidth = getPercentage(quiz.currentIndex, quiz.questions.length);
  // 2 launch(0, width)
  launch(0, currentWidth);
}

const renderEndScreen = _ => {
  setValue(quizQuestionEl, `Great job!`);
  setValue(taglineEl, `Complete!`);
  setValue(trackerEl, `Your score is: ${getPercentage(quiz.score, quiz.questions.length)}%`);
  nextButtonEl.style.opacity = 0;
  renderProgress();
}

const renderAll = _ => {
  if (quiz.hasEnded()) {
    // render EndScreen
    renderEndScreen();
  } else {
    // 1 render the question
    renderQuestion();
    // 2 render the choice elements
    renderChoicesElements();
    // 3 render tracker
    renderTracker();
    // 4 render ProgressBar
    renderProgress();
  }
};
 return {
   renderAll: renderAll,
   listeners: listeners
 }

})();

App.renderAll();
App.listeners();