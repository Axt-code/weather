function myDate() {
    let d = new Date();
    let day = d.getDay();
    let date = d.getDate();
    let month = d.getMonth();
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    weak = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    document.querySelector('#day').textContent = weak[day];
    console.log(weak[day]);
    document.querySelector('#date').innerHTML = date;
    document.querySelector('#month').innerHTML = months[month];
}
myDate();


function weather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
const key = "82005d27a116c2880c8f0fcb866998a0";

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(Response => Response.json())
        .then(data => {
            document.querySelector('.city').innerHTML = data.name;
            console.log(data.name);
            document.querySelector('#temp').innerHTML = `${parseInt(data.main.temp-273)}`;
            console.log(`${parseInt(data.main.temp-273)}`);
            document.querySelector('.weather-icon').innerHTML = `<img src="icons/${data.weather[0].icon}.png"/>`;
            document.querySelector('.des').innerHTML = `${data.weather[0].main}`;
            document.querySelector('#min-temp').innerHTML = `${parseInt(data.main.temp_min-273)}`;
            document.querySelector('#max-temp').innerHTML = `${parseInt(data.main.temp_max-273)}`;
            document.querySelector('#Visib').innerHTML = `${data.visibility}`;
            document.querySelector('#Pressure').innerHTML = `${data.main.pressure}`;
            document.querySelector('#Humidity').innerHTML = `${data.main.humidity}`;

        });
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}