let timeDiv;

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const init = () => {
    timeDiv = document.querySelector('#time');

    clock();
}

const zeroPad = (str, length) => {
    var zeroes = '';
    for(var i = 0; i < length; i++) {
        zeroes += '0';
    }
    return (zeroes + str).slice(-length);
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
    var period = (hours > 12) ? "PM" : "AM";
    hours = hours % 12;
    let output = `${hours}:${zeroPad(date.getMinutes(), 2)}:${zeroPad(date.getSeconds(), 2)} ${period}`;

    return output;
}

const clock = (timestamp) => {
    timeDiv.innerText = getTime()+'\n'+getDate();

    window.requestAnimationFrame(clock);
}

window.onload = init;