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
    console.log("elemet ID " + ELEMENT_ID + " not found")
  }
}

openDataWindow();
setInterval(monitorData, 1000);
