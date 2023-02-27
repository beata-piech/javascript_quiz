//create the picture section of the main container
let mainContainer = document.querySelector("#container");
let picture = document.querySelector("#picture");
const Picture = () => {
	picture.innerHTML = `
		<img id="side_back" class="back" src="#" alt="">
		<div id="side_front">
			<div id="forehead0" class="forehead"></div>
			<div id="forehead1" class="forehead"></div>
			<div id="forehead2" class="forehead"></div>
			<div id="forehead3" class="forehead"></div>
			<div id="forehead4" class="forehead"></div>
			<div id="forehead5" class="forehead"></div>
			<div id="forehead6" class="forehead"></div>
		</div>	
    `
	mainContainer.appendChild(picture);

	//image width in pixels
	const pictWidth = 300;
	//image height in pixels
	const pictHeight = 400;
	let sideBack = document.querySelector("#side_back");

	const addBackPict = () => {
		fetch(`https://source.unsplash.com/random/${pictWidth}x${pictHeight}/?cities`).then((response)=> {
				sideBack.src = response.url;
				console.log(sideBack.src)
		})
	}
	addBackPict();
};  
Picture();

//forehead hexagons to create and dispaly tiles as buttons
let foreheads = document.querySelectorAll(".forehead");
const hexagon = () => {
	for(let i = 0; i<9; i++){	
		for (let j =0; j <=	6; j++) {
			let tile = document.createElement('button'); 
			tile.classList.add('ghost');
			foreheads[j].appendChild(tile);
		};
	};		
};
hexagon();

