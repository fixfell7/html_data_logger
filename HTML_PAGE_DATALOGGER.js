var ELEMENT_ID = 'time'

let newWindow;

function openDataWindow() {
  newWindow = window.open('', '_blank');
  newWindow.document.write('<html><head><title>Data</title></head><body><table>');
}

function closeDataWindow() {
  if (newWindow) {
    newWindow.document.write('</table></body></html>');
    newWindow.document.close();
    newWindow = null;
  }
}

function appendDataToWindow(time, value) {
  if (newWindow) {
    newWindow.document.write('<tr><td>' + time + '</td>,<td>' + value + '</td></tr>');
  }
}


function monitorData() {
  const element = document.getElementById(ELEMENT_ID);
  if (element) {
  
	let date = new Date();
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();
	const currentTime = hours + ':' + minutes + ':' + seconds
	
    const value = element.innerText;
    appendDataToWindow(currentTime, value);
  }
}

openDataWindow();
setInterval(monitorData, 1000);