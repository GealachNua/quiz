import Question from './Question.js'

export default function Quiz (questions) {
  this.question = question;
  this.score = 0;
  this.currentIndex = 0;
}

Quiz.prototype.getCurrentQuestion = function() {
  return this.questions[this.currentIndex];
}
Quiz.prototype.nextIndex = function() {
  this.currentIndex += 1;
}
Quiz.prototype.hasEnded = function() {
  return this.currentIndex === this.question.length;
}
Quiz.prototype.guess = function(userGuess) {
  const currentQuestion = this.questions[this.currentIndex];
  if (currentQuestion.isCorrect(userGuess)) {
    this.score += 1;
  }
  this.nextIndex;
}
