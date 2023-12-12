var interval;
const DAYS_TO_DISPLAY = 6;
const REQUEST_DELAY = 100; // 100ms between requests to display temp for each day
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
var audio = document.createElement("audio")


//different functions for each of the music types to play and keep track of song name + artist
//Cloudy Music
function cloudyMusic(){

    document.body.appendChild(audio);
    audio.src = "/final-project/audio/cloudy.mp3"

    repeatMusic()

    let songName = document.getElementById("songName")
    songName.innerText = "There are Sunshine"

    let songArtist = document.getElementById("songArtist")
    songArtist.innerText = "Vigudo"
}

//Rainy Music
function rainyMusic(){

    document.body.appendChild(audio);
    audio.src = "/final-project/audio/rainy.mp3"

    repeatMusic()

    let songName = document.getElementById("songName")
    songName.innerText = "Crescent Moon"

    let songArtist = document.getElementById("songArtist")
    songArtist.innerText = "Purrple Cat"

}

//snowy music
function snowyMusic(){

    document.body.appendChild(audio);
    audio.src = "/final-project/audio/snowy.mp3"

    repeatMusic()

    let songName = document.getElementById("songName")
    songName.innerText = "Winter Night"

    let songArtist = document.getElementById("songArtist")
    songArtist.innerText = "Sakura Girl"

}

//sunny music
function sunnyMusic(){

    document.body.appendChild(audio);
    audio.src = "/final-project/audio/sunny.mp3"

    repeatMusic()

    let songName = document.getElementById("songName")
    songName.innerText = "Colorful Flowers"

    let songArtist = document.getElementById("songArtist")
    songArtist.innerText = "Tokyo Music Walker"

}

//repeats music after it ends/finishes
function repeatMusic(){
    document.body.addEventListener("mousemove", function () {
        audio.play()
    })

    audio.addEventListener('ended', function() {
        // Reset the currentTime to 0 to replay the sound
        audio.currentTime = 0;
        audio.play();
    });
}

//for each of the days, depending on the weather, the icons/images changes
function displayWeather(result, idx) {
    console.log("result", result)
    console.log("curr idx", idx)
    bigWeatherTextElem = document.getElementById('displayWeather');
    bigWeatherIconElem = document.getElementById('bigWeatherImg');
    weatherIcon = document.getElementById('weatherIcon' + (idx+1));
    console.log("weather", result.day.condition.text)

    var curr_weather = result.day.condition.text
    
    //for overcast or cloudy
    if (curr_weather.includes('Overcast') || curr_weather.includes('cloudy')) {
        if (idx == 0) {
            bigWeatherTextElem.innerText = 'Pretty Cloudy!';
            bigWeatherIconElem.src = '/final-project/images/Cloudy.png';
        }
        cloudyMusic();
        weatherIcon.src = '/final-project/images/Cloudy.png';
    }

    //for rainy
    if (curr_weather.includes('rain')) {
        if (idx == 0) {
            bigWeatherTextElem.innerText = 'Rainy!';
            bigWeatherIconElem.src = '/final-project/images/Rain.svg';
        }
        rainyMusic();
        weatherIcon.src = '/final-project/images/Rain.svg';
    }

    //for snowy
    if (curr_weather.includes('snow')) {
        if (idx == 0) {
            bigWeatherTextElem.innerText = 'Snowy!';
            bigWeatherIconElem.src = '/final-project/images/Snow.svg';
        }
        snowyMusic();
        weatherIcon.src = '/final-project/images/Snow.svg';

    }

    //for sunny
    if (curr_weather.includes('Sun')) {
        if (idx == 0) {
            bigWeatherTextElem.innerText = 'Sunny!';
            bigWeatherIconElem.src = '/final-project/images/Sun.svg';
        }
        sunnyMusic();
        weatherIcon.src = '/final-project/images/Sun.svg';

    }
}


//calls api + uses it to get data about the specific day's forecast
async function getWeather() {
    var days = [0,1,2,3,4,5]
    var urls = days.map((day) => 
    'https://weatherapi-com.p.rapidapi.com/forecast.json?q=Pittsburgh&days=5&dt=' + getDay(day));
    
    //get's today's date
    var currDay = new Date()
    setDays(currDay.getDay());

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '062bb76ba5msh0ac0cc6e5d02b16p13e92ajsnd32e253d105a',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    const temps = []
    var dayIdx = 0
    for (const url of urls) {
        try {
            const response = await fetch(url, options);
            const data = await response.text();
            let final = JSON.parse(data)


            let temp = final.forecast.forecastday[0].day.avgtemp_f;   
            console.log(temp);
            console.log(final);
            temps.push(temp)
            displayTemp(temp, dayIdx);
            displayWeather(final.forecast.forecastday[0], dayIdx);
            dayIdx += 1;
            } catch (error) {
            console.error(`Error fetching data from ${url}:`, error);
            }
        
        // Introduce a delay between fetch requests
        await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY));
      }
    console.log(temps)
}


// Displays weather + temperature on the weather list
function setDays(currDayIdx) {
    let elemIdx = 1;
    for (let i = currDayIdx; i < (currDayIdx + DAYS_TO_DISPLAY); i++){
        var dayIdx = i % (DAYS.length)
        var dayElem = document.getElementById('day' + (elemIdx))
        dayElem.innerText = DAYS[dayIdx]
        elemIdx += 1
    }
}

//displays temperature
function displayTemp(temp, dayIdx){
    let dayId = "temp" + (dayIdx + 1)
    var outputContainer = document.getElementById(dayId);
    outputContainer.innerText = temp + '°';
    console.log(temp);
}

function getDay(x){
      // Get the current date
  var currentDate = new Date();
  var futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + x);

// format date
  var year = futureDate.getFullYear();
  var month = String(futureDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  var day = String(futureDate.getDate()).padStart(2, '0');

  console.log(currentDate.getDay());
  return year + '-' + month + '-' + day;
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("setTime");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    console.log("button onclick eventhandler");
    if (changeButton.innerText == "Set Time"){
        modal.style.display = "block";
    }
}


// When  clicked anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


//Functionality of the set Time button (when clicked, modal pops up, choose option, replaces minute with the large displayed minute)
const getTimeElements = document.getElementsByClassName("min");

// Loop through each element and attach the click event listener
for (let i = 0; i < getTimeElements.length; i++) {
    getTimeElements[i].addEventListener('click', timerClick);
}

function timerClick() {
    const minute = document.getElementById("minuteTime");
    
    minute.innerText = this.innerText;

    console.log(this.innerText);
}

const changeButton = document.getElementById('setTime');
changeButton.addEventListener('click', change);

//different functionalities of which button is displayed, set time --> start, start --> stop, stop --> start
function change(){
    console.log("change function from " +  changeButton.innerText);
    if (changeButton.innerText == "Set Time") {
        changeButton.innerText = "Start";
    }

    else if (changeButton.innerText == "Start"){
        startTimer();
        changeButton.innerText = "Stop";
    }

    else if (changeButton.innerText == "Stop") {
        stopTimer();
        changeButton.innerText = "Start";
    }

}

//timer count down logic
const minute = document.getElementById('minuteTime');
var minuteCounter = parseInt(minute.innerText);

const second = document.getElementById('secondTime');
var secondCounter = parseInt(second.innerText);

function startTimer() {
    console.log("starting timer");
    var timerElement = document.getElementById('timer');

    // Get the current value of the minute element
    var minutes = minute.innerText;

    // Get the current value of the second element

    var seconds = parseInt(second.innerText);

    var totalSeconds = minutes * 60 + seconds;

    interval = setInterval(function() {
        var minutesLeft = Math.floor(totalSeconds / 60);
        var secondsLeft = totalSeconds % 60;

        // Format the output to display minutes and seconds separated by a colon
        minute.innerText = minutesLeft
        second.innerText = (secondsLeft < 10 ? '0' : '') + secondsLeft

        if (totalSeconds <= 0) {
            clearInterval(interval);
            timerElement.innerHTML = 'Countdown Complete!';
        } else {
            totalSeconds--;
        }
    }, 1000);


}

//stop timer function
function stopTimer() {
    console.log("stop timer");

    var timerElement = document.getElementById('timer');

    clearInterval(interval);

}

// pause and play
var pause = document.getElementById('pause');

pause.addEventListener("click", pausePlay);

function pausePlay() {
    if (pause.src.endsWith('/final-project/images/pause.svg')) {
        audio.pause();
        audio.currentTime = 0;
        pause.src = '/final-project/images/play.svg';
    } else if (pause.src.endsWith('/final-project/images/play.svg')) {
        audio.play();
        pause.src = '/final-project/images/pause.svg';
    }
}




