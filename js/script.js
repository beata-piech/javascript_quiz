import items from './data.js';

let allGhosts = document.querySelectorAll(".ghost");
let newCount;	
//onClick event on the tile to uncover the hidden image, max 3 clicks available  
const hideTile = () => {
	for(let single of allGhosts){
		function onClick(event){
			event.preventDefault();
			event.stopImmediatePropagation();
			newCount = newCount + 1;		
			if(newCount < 4 ){
				this.style.visibility = "hidden";
				// console.log(event, "clicked to uncover", single);
			}else{
				alert("No clicks available");
			}
		}
		single.addEventListener("click",onClick, false);
	}
}

const quiz = document.querySelector("article");
quiz.innerHTML = `
	<h2>Do you know what's behind the wall?</h2>
	
	<form>
		<h3>Answer the question and remove any 3 tiles.</h3>
		<p class="question" >${items[0].question}</p>
		<input type="radio" id="answ0" class="answer" name="selection" value="${items[0].answers[0]}" />
			<label for="answ0" id="choice0" class="choice" value=0>${items[0].answers[0]}</label><br>
		<input type="radio" id="answ1" class="answer" name="selection" value="${items[0].answers[1]}" />
			<label for="answ1" id="choice1" class="choice">${items[0].answers[1]}</label><br>
		<input type="radio" id="answ2" class="answer" name="selection" value="${items[0].answers[2]}" />
			<label for="answ2" id="choice2" class="choice">${items[0].answers[2]}</label><br>

		<button type="submit" id="submit-btn" >Submit</button>
	</form>
	<div id="sec">
		<p id="info"></p>
		<span id="log"></span></br>
	</div>
	<button id="next-btn">Next question</button></br>	
`
let nextBtn = quiz.querySelector("#next-btn");
let submitBtn = quiz.querySelector("#submit-btn");
let itemQuestion = quiz.querySelector(".question");
let form = document.querySelector("form");
let logInfo = quiz.querySelector("#log");
let info = quiz.querySelector("#info");

let questAnswers = quiz.getElementsByTagName("label");
let statedAnswer = items[0].correctAnswer;


const nextQuestion = (questCurrentIndex = 0) => {
	nextBtn.addEventListener("click", (event) => {
		event.preventDefault();
		submitBtn.style.display = "block";
		nextBtn.style.display = "none";
		logInfo.innerText = "";
		info.innerText = "";
		
		let questNextIndex = questCurrentIndex + 1;
		
		if(questNextIndex < items.length){
			itemQuestion.innerHTML = items[questNextIndex].question;
			statedAnswer = items[questNextIndex].correctAnswer;
			questCurrentIndex = questNextIndex;
			// console.log(questCurrentIndex, "items legth: ", items.length, items[questNextIndex]);
			for (let i = 0 ; i < questAnswers.length; i++) {
				let allAnswers = questAnswers[i];
				allAnswers.innerHTML = items[questCurrentIndex].answers[i];
			}
		}else{
			submitBtn.style.display = "none";
			form.style.display = "none";
			let uncoverBtn = document.createElement("button");
			uncoverBtn.setAttribute("id", "uncover-btn");
			uncoverBtn.innerHTML = `Uncover`;
			let secSeg = document.querySelector("#sec");
			secSeg.append(uncoverBtn);
			logInfo.innerText = "That was the last question. \n \n" + "Click to see the picture"
			uncoverBtn.addEventListener('click', (event)=> {
				event.preventDefault();	
				let frontToUncover = document.querySelector("#side_front");
				frontToUncover.style.display = "none";
			})
		}
	}, false)
}
nextQuestion();

const submit = () => {
	form.addEventListener("submit", (event) => {
		event.preventDefault();
		let itemAnswers = document.getElementsByTagName("input");
		for (let r = 0; r < itemAnswers.length; r++){
			let rb = itemAnswers[r];
			if (rb.checked) {
				let tickedAnswer = rb.nextElementSibling.innerHTML;
				let ansToDisplay=`<span style="font: 1.2rem 'Verdana'; font-weight: bold;">`+ tickedAnswer + `</span>`;
				if(tickedAnswer === statedAnswer){
					newCount = 0;
					info.innerText = "Good job - remove 3 tiles!";
					info.style.color ="rgb(0, 97, 8)";	
					logInfo.innerHTML = `Your answer:  ${ansToDisplay}  is CORRECT.<br> Click 3 tiles and try to guess what place's on the picture.`;
					hideTile();
				} else {
					info.innerText = "Oops! Maybe next time.";
					info.style.color ="rgb(184, 0, 0)";
					logInfo.innerHTML = `Your answer: ${ansToDisplay}  is NOT CORRECT.`;
				}
				rb.checked = false;
				submitBtn.style.display = "none";
				nextBtn.style.display = "block";
			}
		}
	}, false );
}
submit();
