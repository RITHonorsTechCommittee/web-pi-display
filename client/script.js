let timeDiv;
let items;
let currentItem = 0;

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let parser = new DOMParser();

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
    var period = (hours > 12) ? 'PM' : 'AM';
    hours = hours % 12;
    if(hours == 0) {
        hours = 12;
    }
    let output = `${hours}:${zeroPad(date.getMinutes(), 2)}:${zeroPad(date.getSeconds(), 2)} ${period}`;

    return output;
}

const clock = (timestamp) => {
    timeDiv.innerText = getTime()+'\n'+getDate();

    window.requestAnimationFrame(clock);
}

const refresh = async () => {
    var response = await fetch('http://tgwth.rh.rit.edu:3000/feed.json');
    var newItems = await response.json();

    var currentDate = Date.now();
    items = newItems.filter((item) => { return item.expirationDate > currentDate });

    var itemsString = '';
    for(item of items) {
        itemsString += `<div class="item content"><h2>${item.title}</h2></div>`
    }

    document.getElementById('items').innerHTML = itemsString;

    document.getElementById('details').innerHTML = `<h2>${items[currentItem].title}</h2><p>${items[currentItem].description}</p>`;
    currentItem = (currentItem + 1) % items.length;
};

setInterval(refresh, 15000);

window.onload = init;

refresh();