var ELEMENT_ID = 'temp'

let newWindow;

function openDataWindow() {
  newWindow = window.open('', '_blank');
  newWindow.document.write('<html><head><title>Data Logger: ' + ELEMENT_ID + '</title></head></html><table>');
  newWindow.document.write('<tr><td>Time</td><td>Temperature</td></tr>');
}

function appendDataToWindow(time, value) {
  if (newWindow) {
    newWindow.document.write('<tr><td>' + time + '</td><td>' + value + '</td></tr>');
  }
}

function monitorData() {
  const element = document.getElementById(ELEMENT_ID);
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
    appendDataToWindow(currentTime, value);
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
