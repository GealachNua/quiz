import Question from './question.js';

const q1 = new Question(
  'What is 1 + 1?',
  [2, 3, 7, 4],
  0
)

console.log(q1.isCorrect(1));
