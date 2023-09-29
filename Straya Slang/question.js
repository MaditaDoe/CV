function Question(text, audio, choices, answer) {
	this.text = text;
	this.choices = choices;
	this.answer = answer;
	this.audio = audio;
}

Question.prototype.correctAnswer = function(choice) {
	return choice === this.answer;
}