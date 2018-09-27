let weatherkey;

let timeDiv;
let items;
let currentItem = 0;

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let parser = new DOMParser();

const init = () => {
    getOpenWeatherMapsAPIKey( (err, key) => {
        if(err) console.log('Error getting weather API key: '+ err);
        else weatherkey = key;
    });
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

const getOpenWeatherMapsAPIKey = (cb) => {
    let req = new XMLHttpRequest();
    req.onload = (res) => {
        console.log(res);
        if(this.status != 200) err = 'No key returned';
        if(this.status === 501) err = 'Key fetching not implemented on server';
        cb(err, this);
    };
    req.open('GET', '/openweathermaps_api_key');
    req.send();
};

const getWeather = () => {
    let req = new XMLHttpRequest();
    req.onload = (data) => {
        console.log(data);
    };
    req.open('GET', 'api.openweathermap.org/data/2.5/forecast?id=524901&APPID='+OPENWEATHERMAP_APIKEY);
    req.send();
};

const clock = (timestamp) => {
    timeDiv.innerText = getTime()+'\n'+getDate();

    window.requestAnimationFrame(clock);
}

const refresh = async () => {
    var response = await fetch('https://www.rit.edu/news/lib/rss/topstories.rss');
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