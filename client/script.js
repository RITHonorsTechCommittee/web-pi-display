let timeDiv;

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const init = () => {
  timeDiv = document.querySelector('#time');

  clock();
}

const getDate = () => {
    let date = new Date();
    return days[date.getDay()]
        +', '+months[date.getMonth()]
        +' '+date.getDate()
        +' '+date.getFullYear();
}

const getTime = () => {
    let date = new Date();
    let hours = date.getHours();
    let seconds = (hours > 12) ? date.getSeconds()+" PM":date.getSeconds()+" AM";
    hours = (hours > 12) ? hours % 12 : hours;
    let output = hours+':'+date.getMinutes()+':'+seconds;

    return output;
}

const clock = (timestamp) => {
    timeDiv.innerText = getTime()+'\n'+getDate();

    window.requestAnimationFrame(clock);
}

window.onload = init;