function Quiz(questions) {
	this.questions = questions;
	this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
	return this.questions[this.questionIndex];
}

Quiz.prototype.isEnded = function() {
	if (this.questionIndex == 15){
		return true;
	}
	else {
		return false;
	}
}

Quiz.prototype.guess = function() {
	this.questionIndex++;
}