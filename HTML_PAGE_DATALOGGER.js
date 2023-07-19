var ELEMENT_ID = 'temp'
var ELEMENT_ID_2 = 'uptime'

let newWindow;

var arrVal2 = [];
const allEqual = arr => arr.every(val => val === arr[0]);

function openDataWindow() {
  newWindow = window.open('', '_blank');
  newWindow.document.write('<html><head><title>Data Logger: ' + ELEMENT_ID + '</title></head></html><table>');
  newWindow.document.write('<tr><td>Time</td><td>Temperature</td></tr>');
}

function appendDataToWindow(time, value, value_2 = undefined) {
  if (newWindow) {
    if (value_2 == undefined) {
		newWindow.document.write('<tr><td>' + time + '</td><td>' + value + '</td></tr>');
	} else {
		newWindow.document.write('<tr><td>' + time + '</td><td>' + value + '</td><td>' + value_2 + '</td></tr>');
	}
	divPointer.innerHTML = "Time : " + time + "<br>Value : " + value + "<br>Value 2 : " + value_2
  }
}

function monitorData() {
  const element = document.getElementById(ELEMENT_ID);
  const element2 = document.getElementById(ELEMENT_ID_2);
  if (element) {
  
	let date = new Date();
	let hours = 	("0" + date.getHours()).slice (-2);
	let minutes = 	("0" + date.getMinutes()).slice (-2);
	let seconds = 	("0" + date.getSeconds()).slice (-2);
	const currentTime = hours + ':' + minutes + ':' + seconds
	//console.log("currentTime: " + currentTime)
	
    var value = element.innerText;
	value = value.replace(/\./g, ',');
	value = value.replace(/[^0-9,]/g, '');

	if (element2 == undefined) {
    	appendDataToWindow(currentTime, value);
	} else {
		var value_2 = element2.innerText;
		appendDataToWindow(currentTime, value, value_2);
		arrVal2.push(value_2)
		if (arrVal2.length > 10) {
			arrVal2.slice(arrVal2, 1)
		}

		
		if (allEqual(arrVal2)) {
			div.style.backgroundColor = "rgba(255, 0, 0, 0.3)";
		} else {
			div.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
		}
	}
  }
  else {
	console.log("element ID " + ELEMENT_ID + " not found")
  }
}

var LastTime = 0;	//set var once
function CheckTime() {
	let date = new Date();
	let seconds = date.getSeconds();
	if (seconds > LastTime) {
		monitorData();
	}
	LastTime = seconds
}

openDataWindow();

//setInterval(monitorData, 1000);		//not perfect, skip seconds sometimes
setInterval(CheckTime, 100);					//detect date.seconds change at an 0,1s interval

var div = document.createElement("div");
div.id = "Front_screen"
div.style.width = "20%";
div.style.height = "10%";
div.style.borderRadius = "1em";
div.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
div.style.color = "black";
div.style.position = "absolute";
div.style.top = "50%";
div.style.left = "50%";
div.style.transform = "translate(-50%, -50%)";
div.innerHTML = "Hello";
div.style.display = "flex";
div.style.alignItems = "center";
div.style.justifyContent = "center";
newWindow.document.body.appendChild(div);

var divPointer = newWindow.document.getElementById("Front_screen")




