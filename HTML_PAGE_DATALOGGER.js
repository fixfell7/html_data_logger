var ELEMENT_ID = 'temp'
var ELEMENT_ID_2 = 'uptime'

let newWindow;

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
		var value_2 = elemen2.innerText;
		appendDataToWindow(currentTime, value, value_2);
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

//setInterval(monitorData, 1000);		//not perfect, skip seconds sometimes
setInterval(CheckTime, 100);					//detect date.seconds change at an 0,1s interval
openDataWindow();
