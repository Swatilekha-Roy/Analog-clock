//Toggle Button
function toggleClass()
{
	const body=document.querySelector('body');
	body.classList.toggle('light');
	body.style.transition= '0.5s linear';
}


//Running the clock
const deg=360/(12*5);

const HRHAND=document.querySelector("#hr");
const MNHAND=document.querySelector("#mn");
const SCHAND=document.querySelector("#sc");

setInterval(() => 
{
	let date=new Date();
	let h=date.getHours()*30;
	let m=date.getMinutes()*deg;
	let s=date.getSeconds()*deg;
	let ms=date.getMilliseconds();

	HRHAND.style.transform=`rotateZ(${h+(m/12)}deg)`;
	MNHAND.style.transform=`rotateZ(${m}deg`;
	SCHAND.style.transform=`rotateZ(${s}deg`;
});

//Returning full date to be displayed on hover
var d=new Date().toLocaleString();
document.getElementById("full-date").innerHTML = d;


// Alternate method to run the clock

/*
const HRHAND=document.querySelector("#hr");
const MNHAND=document.querySelector("#mn");
const SCHAND=document.querySelector("#sc");

function runTheClock()
{
	var date=new Date();
	console.log(date);
	let h=date.getHours();
	let m=date.getMinutes();
	let s=date.getSeconds();
	console.log("Hours: "+h+", Minutes: "+m+", Seconds: "+s);

	let hrPosition=(h*360/12)+(m*(360/60)/12);
	let mnPosition=(m*360/60)+(s*(360/60)/60);
	let scPosition=s*360/60;

	HRHAND.style.transform="rotate("+hrPosition+"deg)";
	MNHAND.style.transform="rotate("+mnPosition+"deg)";
	SCHAND.style.transform="rotate("+scPosition+"deg)";
}

var interval=setInterval(runTheClock,1000); */



/* Running the stopwatch */

// Converting time into a format of hours, minutes and seconds
function timeToString(time)
{
	let diffInHr=time/3600000;
	let hh=Math.floor(diffInHr);

	let diffInMn=(diffInHr-hh)*60;
	let mm=Math.floor(diffInMn);

	let diffInSc=(diffInMn-mm)*60;
	let ss=Math.floor(diffInSc);

	let diffInMs=(diffInSc-ss)*100;
	let milis=Math.floor(diffInMs);

	let formattedMn=mm.toString().padStart(2,"0");
	let formattedS=ss.toString().padStart(2,"0");
	let formattedMs=milis.toString().padStart(2,"0");

	return `${formattedMn}:${formattedS}:${formattedMs}`;
}

let startTime,elapsedTime=0,timerInterval;

function print(txt)
{
	document.querySelector("#display").innerHTML=txt;
}

// Start the timer when 'Play' button is clicked
function start()
{
	startTime=Date.now()-elapsedTime;
	// Calculate time elapsed
	timerInterval=setInterval(function printTime()
	{
		elapsedTime=Date.now()-startTime;
		print(timeToString(elapsedTime));
	},10);
	showButton("PAUSE");
}

// Pauses the timer when 'Pause' button is clicked
function pause()
{
	clearInterval(timerInterval);
	showButton("PLAY");
}

// Resets the timer
function reset()
{
	clearInterval(timerInterval);
	print("00:00:00");
	elapsedTime=0;
	showButton("PLAY");
}


// Add event triggers to buttons
let playButton=document.querySelector("#playButton");
let pauseButton=document.querySelector("#pauseButton");
let resetButton=document.querySelector("#resetButton");

function showButton(buttonKey)
{
	const buttonToShow=buttonKey==="PLAY"?playButton:pauseButton;
	const buttonToHide=buttonKey==="PLAY"?pauseButton:playButton;
	buttonToShow.style.display="block";
	buttonToHide.style.display="none";
}


playButton.addEventListener("click",start);
pauseButton.addEventListener("click",pause);
resetButton.addEventListener("click",reset);
