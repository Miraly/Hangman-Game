
var countries = ["Albania",
				 "Ecuador",
				 "Fiji",
				 "Israel",
				 "Kazakhstan",
				 "Luxembourg",
				 "Norway",
				 "Portugal",
				 "Thailand",
				 "Vietnam"];

var word;
var letterArray;
var winCounter = 0;
var guessCounter;
var correctGuessCounter;
var guessedLetters; //introducing var in global to be seen 
var guessedLettersArray = [];

function reset() {
	//initial vars
	word = countries[Math.floor(Math.random()*countries.length)];
	letterArray = [];
	guessCounter = 15;
	correctGuessCounter = 0;
	
	var guessCounterDiv = document.getElementById("guessCounter");
	guessCounterDiv.innerHTML = "Remaining guesses: " + guessCounter;
	
	//removing letters from previous word
	var myNode = document.getElementById("letters");
	while (myNode.firstChild) {
    	myNode.removeChild(myNode.firstChild);
	}
	
	//removing previously guessed letters
	myNode = document.getElementById("guessedLetters");
	while (myNode.firstChild) {
    	myNode.removeChild(myNode.firstChild);
	}
	
	
	for (var i = 0; i < word.length; i++ ) {
		var newLetterDiv = document.createElement("div");
		newLetterDiv.innerHTML = "_" ;
		newLetterDiv.setAttribute("class", "letter");
		var letters = document.getElementById("letters");
		letters.appendChild(newLetterDiv);
		letterArray.push(newLetterDiv);
	}
}

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

var inArray = function(str) {
	for (var i = 0; i < guessedLettersArray.length; i++) {
		if (str === guessedLettersArray[i]) {
			return true;
		}
	}
	guessedLettersArray.push(str);
	return false;
}


var onload = function(){
	guessedLetters = document.getElementById("guessedLetters");//using this global var  
    reset();	
	
};
//getting letter from charachter code 
document.onkeypress = function (e){
    var charCode = e.which || e.keyCode;
	var guess = String.fromCharCode (charCode);
	
	if (isLetter(guess) && !inArray(guess)) {
		var guessDiv = document.createElement("div");
		guessDiv.innerHTML = guess ;
		guessDiv.setAttribute("class", "letter");
		guessedLetters.appendChild(guessDiv);
	

		
		var correctGuess = false; //assuming that guess is incorrect for guess counter to work
		for (var i = 0; i < word.length; i++ ) {
			if (guess.toUpperCase() === word[i].toUpperCase()) {
				letterArray[i].innerHTML = word[i];
				correctGuess = true; 
				correctGuessCounter ++; 
			}
		}
		
		if (correctGuess === false) { 
			guessCounter -- ;
			var guessCounterDiv = document.getElementById("guessCounter");
			guessCounterDiv.innerHTML = "Remaining guesses: " + guessCounter;
		}
		
		if (correctGuessCounter === word.length) {
			winCounter ++;
			var winCounterDiv = document.getElementById("winCounter");
			winCounterDiv.innerHTML = "Wins: " + winCounter;
			setTimeout(reset, 3000);
		}
		
		if (guessCounter === 0) {
			setTimeout(reset, 3000);
		}
	}
	
}



