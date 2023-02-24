import items from './data.js';

let allGhosts = document.querySelectorAll(".ghost");
let newCount;	
//onClick event on the tile to uncover the hidden image, max 3 clicks available  
const hideTile = () => {
// for(let single = 0; single < allGhosts.length; single++){
	for(let single of allGhosts){
	// console.log();
	// singleGost = allGhosts[single];
	single.addEventListener("click",onClick, false);

	function onClick(event){
		event.stopImmediatePropagation();
		newCount = newCount + 1;		
		if(newCount < 4 ){
		console.log(event, "clicked to uncover", single);
		this.style.visibility = "hidden";
		}else{
		console.log("Whatahack");
	}
	event.preventDefault;
	}
}
console.log(newCount);
}

const quiz = document.querySelector("article");
quiz.innerHTML = `
	<h2>Do you know what's behind the wall?</h2>
	
	<form>
		<h3>Answer each question and remove any 3 tiles.</h3>
		<p class="question" >${items[0].question}</p>
		<input type="radio" name="answer" value="${items[0].answers[0]}" id="answ0" class="answer" />
					<label for="answ0" id="choice0" class="choice" value="0">${items[0].answers[0]}</label><br>
		<input type="radio" name="answer" value="${items[0].answers[1]}" id="answ1" class="answer" />
					<label for="answ1" id="choice1" class="choice">${items[0].answers[1]}</label><br>
		<input type="radio" name="answer" value="${items[0].answers[2]}" id="answ2" class="answer" />
					<label for="answ2" id="choice2" class="choice">${items[0].answers[2]}</label><br>

		<button type="submit" id="submit-btn" >Submit</button>
	</form>
	<p id="info"></p>
	<span id="log"></span></br>
	<button id="next-btn">Next question</button></br>	
`
let nextBtn = quiz.querySelector("#next-btn");
let submitBtn = quiz.querySelector("#submit-btn");
let itemQuestion = quiz.querySelector(".question");
const form = document.querySelector("form");
let logInfo = quiz.querySelector("#log");
let info = quiz.querySelector("#info");

let questAnswers = quiz.getElementsByTagName("label");
let statedAnswer = items[0].correctAnswer;


const nextQuestion = (questCurrentIndex = 0) => {
	nextBtn.addEventListener("click", (event) => {
		
		submitBtn.style.display = "block";
		nextBtn.style.display = "none";
		logInfo.innerText = "";
		info.innerText = "";
		
		let questNextIndex = questCurrentIndex + 1;
		
		if(questNextIndex < items.length){
			itemQuestion.innerHTML = items[questNextIndex].question;
			statedAnswer = items[questNextIndex].correctAnswer;
			questCurrentIndex = questNextIndex;
			console.log(questCurrentIndex, "items legth: ", items.length, items[questNextIndex]);
			for (let e = 0 ; e < questAnswers.length; e++) {
				let allAnswers = questAnswers[e];
				allAnswers.innerHTML = items[questCurrentIndex].answers[e];
			}
			//  !!!!!-don't delete this, check it again
			event.preventDefault();
		}else{
			submitBtn.style.display = "none";
			form.style.display = "none";
			console.log("nothing to display");
			console.log(picture);
			let uncoverBtn = document.createElement("button");
			uncoverBtn.setAttribute("id", "uncover-btn");
			uncoverBtn.innerHTML = `Uncover`;
			quiz.append(uncoverBtn);
console.log(uncoverBtn);
			logInfo.innerText = "That was the last question. \n" + "Click to see the picture"
			uncoverBtn.addEventListener('click', (event)=> {
				event.preventDefault;
				let frontToUncover = document.querySelector("#side_front");
				frontToUncover.style.display = "none";
			event.preventDefault();	
			})

		}
	}, 
	false)
}
nextQuestion();

const submit = () => {
	form.addEventListener("submit", 
	(event) => {
		let itemAnswers = document.getElementsByTagName("input");
		for (let r = 0; r < itemAnswers.length; r++){
			let rb = itemAnswers[r];
			if (rb.checked) {
				let tickedAnswer = rb.nextElementSibling.innerHTML;
				if(tickedAnswer === statedAnswer){
					 newCount = 0;
					console.log("OK")
					
					info.innerText = "Good job - remove 3 tiles!";
					info.style.color ="rgb(0, 97, 8)";	
					logInfo.innerText = "Your answer: ' " + `${tickedAnswer}` + " ' is CORRECT. \n" 
					+ "Click 3 tiles and try to guess what place is on the picture.";
					hideTile();
					
					submitBtn.style.display = "none";
					nextBtn.style.display = "block";
				} else {
						console.log("NOT");
					info.innerText = "Oops! Maybe next time.";
					info.style.color ="rgb(184, 0, 0)";
					logInfo.innerText = "Your answer: ' " + `${tickedAnswer}` + " ' is NOT CORRECT.";
					submitBtn.style.display = "none";
					nextBtn.style.display = "block";
				}
					rb.checked = false;
			}
			event.preventDefault();
		}
		
	}			, false );
}

submit();
