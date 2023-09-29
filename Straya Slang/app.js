
function populate() {
	if(quiz.isEnded()) {
		showStrineBar();
	}
	else{
		var audio;
		//random generator
		var ran = Math.floor(Math.random()*questions.length);
		item = questions[ran];
	
		//show questions
		var element = document.getElementById("questions");
		element.innerHTML = item.text;
		//delete element
		questions = questions.slice(0,ran).concat( questions.slice(ran+1) );

		audio = new Audio(item.audio);
		audio.play();

		//show choices
		var choices = item.choices;
		for (var i = 0; i < 4; i++) {
			var ran2 = Math.floor(Math.random()*choices.length)
			var element = document.getElementById("answer" + i);
			element.innerHTML = choices[ran2];
			guess("btn"+ i, choices[ran2]);
			choices = choices.slice(0,ran2).concat( choices.slice(ran2+1) );
		}
		
	}
};

function guess(id, guess) {
	var button = document.getElementById(id);
	var aud1;
	button.onclick = function() {
		quiz.guess();
		if (item.correctAnswer(guess) == true)
			{ score++;
				aud1 = new Audio("yas.ogg");
				aud1.play();}
		else{
			aud1 = new Audio ("Nah.ogg");
			aud1.play();
		}
		populate();
	}
}

function showStrineBar() {
	window.location = "StrineBar_HTML_Vers1.html?score=" + score;

}



var questions = [
	new Question ("strewth!", "Strewth.mp3", ["good grief!", "no way!", "absolutely!", "get lost!"], "good grief!"),
	new Question ("tinny", "Tinny.mp3", ["a small boat", "an outdoor toilet", "a camping kettle", "an oil-drum firepit"], "a small boat"),
	new Question ("smoko", "Smoko.mp3", ["a break from work for smoking", "a tabacconist", "a pouch of rolling tabacco", "someone who smokes"], "a break from work for smoking"),
	new Question ("doco", "Doco.mp3", ["a documentary", "a boat harbour", "a doctor", "a tax form"], "a documentary"),
	new Question ("ranga", "Ranga.mp3", ["a person with red hair", "a poor person", "an unclean person", "someone with no manners"], "a person with red hair"),
	new Question ("sheep-shagger", "Sheep Shagger.mp3", ["a person from New Zealand", "someone who shears sheep", "someone who lives on a farm", "a rural veterinary"], "a person from New Zealand"),
	new Question ("used to refer to someone whose name isn't known", null , ["old mate", "old man", "young mate", "old fellow"], "old mate"),
	new Question ("a rolled-up canvas sleeping bag", null , ["swag", "camp-bag", "canvas", "roller"], "swag"),
	new Question ("a tin used to boil water while camping", null, ["billy", "tucker", "tinny", "canner"], "billy"),
	new Question ("tucker", "Tucker.mp3", ["food", "a sleeping bag", "a cigarette", "beer"], "food"),
	new Question ("jumbuck", "Jumbuck.mp3", ["a sheep", "a hitch hiker", "a kangaroo", "a farmer"], "a sheep"),
	new Question ("loose unit", "Loose Unit.mp3", ["a daredevil", "a cheap rental house", "a promiscuous woman", "a gambler"], "a daredevil"),
	new Question ("a fire fighter", null, ["firey", "fi-fo", "smoko", "hosie"], "firey"),
	new Question ("someone who skips school", null, ["wagger", "skipper", "bludger", "slogger"], "wagger"),
	new Question ("pash", "Pash.mp3", ["a french kiss", "a passion fruit", "a thin scarf", "a massage"], "a french kiss"),
	new Question ("unkempt/no hoper", null, ["derro", "devo", "demo", "dekko"], "derro"),
	new Question ("to be feeling unwell", null, ["crook", "crunk", "crack", "crock"], "crook"),
	new Question ("unsophisticated person", null, ["bogan", "lad", "wanker", "hillbilly"], "bogan"),
	new Question ("to take a day off work", null, ["chuck a sickey", "throw a wag", "toss a day", "kick a monday"], "chuck a sickey"),
	new Question ("piece of piss", "Piece of piss.mp3", ["easy", "unreliable", "weak", "unpleasant"], "easy"),
	new Question ("chuck a u'ey", "Chuck a u'ey.mp3", ["perform a 180 degree turn", "speed away from police", "drift around a corner", "parallel park"], "perform a 180 degree turn"),
	new Question ("bludger","Bludger.mp3", ["lazy person", "unsavoury person", "sly person", "drunkard"], "lazy person"),
	new Question ("cark it", "Cark it.mp3", ["to die", "to fart", "to get angry", "to cry"], "to die"),
	new Question ("bloody oath", "Bloody Oath.mp3", ["absolutely", "a promise", "not at all", "unbelievable"], "absolutely"),
	new Question ("sparrow's fart", "Sparrows Fart.mp3", ["very early morning", "very late evening", "midday", "midnight"], "very early morning"),
	new Question ("chockas", "Chockas.mp3", ["very full", "awesome", "large", "very expensive"], "very full"),
	new Question ("dead set", "Dead Set.mp3", ["true", "ready", "awful", "interesting"], "true"),
	new Question ("dingo's breakfast", "Dingos Breakfast1.mp3", ["no breakfast", "big breakfast", "quick breakfast", "a baby"], "no breakfast"),
	new Question ("fair dinkum", "Fair Dinkum.mp3", ["genuine", "fair", "Australian", "impressive"], "genuine"),
	new Question ("ridgey-didge", "Ridgy-didge.mp3", ["genuine", "didgeridoo", "incredible", "kangaroo"], "genuine"),
	new Question ("stoked", "Stoked.mp3", ["very pleased", "very upsed", "very angry", "very in love"], "very pleased"),
	new Question ("a reckless driver", null, ["hoon", "goon", "loon", "boon"], "hoon"),
	new Question ("a bit how ya going", "A bit how ya goin.mp3", ["not quite right", "friendly", "unbelievable", "a stressful situation"], "not quite right"),
	new Question ("dog's breakfast", "Dog's Breakfast.mp3", ["a mess", "something huge", "unintelligent", "a bad smell"], "a mess"),
	new Question ("drongo", "Drongo.mp3", ["a silly person", "a mean person", "a poor person", "an exhausted person"], "a silly person"),
	new Question ("whoop-whoop", "Whoop-Whoop.mp3", ["middle of nowhere", "a wild party", "strong alcohol", "an ambulance"], "middle of nowhere"),
	new Question ("piss", "Piss.mp3", ["beer", "wine", "vodka", "rum"], "beer"),
	new Question ("a beer bought to drink in the car", null, ["roadie", "quickie", "driver", "traveller"], "roadie"),
	new Question ("op shop","Op-Shop.mp3", ["thrift store", "hospital", "barbers", "mechanic"], "thrift store"),
	new Question ("a paramedic/ambulance crew member", null, ["ambo", "parrie", "ambie", "medo"], "ambo"),
	new Question ("chook", "Chook.mp3", ["a chicken", "to have a quick look", "to throw something with force", "to be ill"], "a chicken"),
	new Question ("a wild Australian horse", null, ["brumby", "skipper", "jumbuck", "boomer"], "brumby"),
	new Question ("buck's night", "Buck's Night.mp3", ["a bachelor party", "an awful night", "a one night stand", "not getting much sleep"], "a bachelor party"),
	new Question ("to be broken or useless", null, ["bung", "bang", "bing", "bong"], "bung"),
	new Question ("to fawn over children or act motherly", null, ["clucky", "babying", "mumming", "cocky"], "clucky"),
	new Question ("to go quickly or surrepitiously", null, ["nick off", "whack on", "run loose", "whip up"], "nick off"),
	new Question ("alcohol shop", null, ["bottle-o", "alco", "wino", "drop shop"], "bottle-o"),
	new Question ("a sandwich", null, ["sanga", "banger", "doughie", "monga"], "sanga"),
	new Question ("rack off!", "Rack Off.mp3", ["get lost!", "stop talking!", "you don't say?", "good grief!"], "get lost!"),
	new Question ("she'll be apples", "She'll Be Apples.mp3", ["everything will be okay", "someone will be angry", "things will get worse", "nothing will happen"], "everything will be okay"),
	

]
function getScore(){
	return score;
}


var quiz = new Quiz(questions);
var score = 0;
var item;

populate();