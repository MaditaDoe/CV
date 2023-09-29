function StrineLevel() {
	var img = new Image();
	var elem = document.getElementById("beer");
	img.style.height = "350px";
	var img2 = new Image();
	var elem2 = document.getElementById("levelpic");
	img2.style.height = "200px";
	
	//img.style.height = 500px;


	
	img.onload = function(){

	elem.appendChild(img);
	elem2.appendChild(img2);}

	if(score<=3){img.src = 'level 01.gif';
	img2.src = '2.jpg';
	document.getElementById("des").innerHTML = "DRONGO "+score+"/15<br/> Strewth! You need a bit more practice, ya drongo. Have another crack to improve your answers!";}
	if(score>3 && score <= 6) {img.src = 'level 02.gif';
	img2.src = '1.jpg';
	document.getElementById("des").innerHTML = "GALAH "+score+"/15 <br/> A fair dinkum effort, but you've got a ways to go, ya silly galah! Give the quiz another burl to improve your answers!";}
	if(score>6 && score <= 10) {img.src = 'level 03.gif';
	img2.src = '3.jpg';
	document.getElementById("des").innerHTML = "NED KELLY "+score+"/15 <br/> Nice one! Not a bad result. Keep trying and you'll be an ocker master in no time!";}
	if(score>10 && score <= 14) {img.src = 'level 04.gif';
	img2.src = '4.jpg';
	document.getElementById("des").innerHTML = "CROCODILE DUNDEE "+score+"/15 <br/> Onya! You're really good at this! Are you sure you're not secretly an Aussie?";}
	if(score>14){img.src = 'level 05.gif';
	img2.src = '5.jpg';
	document.getElementById("des").innerHTML = "STEVE IRWIN "+score+"/15 <br/> Crikey! You aced that! You're a fair dinkum Aussie slang expert. The crocodile hunter would be proud!";}

	
	
}

var urlString = window.location.href;
var score = urlString.split("?")[1].split("=")[1];

StrineLevel();