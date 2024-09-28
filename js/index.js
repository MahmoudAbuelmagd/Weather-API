const searchInput = document.querySelector('.locationInput')

async function getWeather(city) {
  let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=379a0fd08c3542a6835225335242509&q=${city}&days=3`)
  let weatherData = await response.json();
  if (!weatherData.error) {
    currentTodayForecast(weatherData);
    tomorrowForecast(weatherData);
    tomorrowAfterForecast(weatherData);
  }
  // console.log(weatherData);
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {  
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(`${latitude}, ${longitude}`)
  })
}


searchInput.addEventListener('input',function () {
  getWeather(this.value);
})

const dayNames = ["Sunday", "Monday", "Tuesday" ,"Wednesday" , "Thursday" ,"Friday","Saturday"];
function currentTodayForecast(data) {
  let { last_updated, temp_c, condition, humidity, wind_dir, wind_kph} = data.current;
  let pureDate = last_updated.slice(0, 10);  
  const date = new Date(pureDate);
  const day = date.getDay();
  const month = date.getMonth();
  const monthNames = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
  document.querySelector(".day").innerHTML = dayNames[day];
  document.querySelector(".date").innerHTML = last_updated.slice(8, 11)+ monthNames[month];
  document.querySelector(".location").innerHTML = data.location.name;
  document.querySelector(".temp").innerHTML = temp_c + '°C';
  document.querySelector(".img").setAttribute("src", condition.icon);
  document.querySelector(".status").innerHTML = condition.text;
  document.querySelector(".humidity").innerHTML = humidity + '%';
  document.querySelector(".speed").innerHTML = wind_kph + 'Km/h';
  document.querySelector(".direction").innerHTML = wind_dir;
  
}
function tomorrowForecast(data) {
  let { date, day} = data.forecast.forecastday[1];
  let tomorrowDate = date;
  const dateObj = new Date(tomorrowDate);
  const Day = dateObj.getDay();
  document.querySelector('.nextDay').innerHTML = dayNames[Day];
  document.querySelector(".main-temp").innerHTML = day.maxtemp_c + '°C';
  document.querySelector(".tempurature").innerHTML = day.mintemp_c + '°C';
  document.querySelector(".nextStatus").innerHTML= day.condition.text ;
  document.querySelector(".forecastIcon").setAttribute("src", day.condition.icon);
}

function tomorrowAfterForecast(data) {
  let { date, day} = data.forecast.forecastday[2];
  let tomorrowAfterDate = date;
  const dateObj = new Date(tomorrowAfterDate)
  const tomorrowAfterDay = dateObj.getDay();
  document.querySelector('.after_forecast span.day').innerHTML = dayNames[tomorrowAfterDay];
  document.querySelector(".after_forecast .main-temp").innerHTML = day.maxtemp_c + '°C';
  document.querySelector(".after_forecast .tempurature").innerHTML = day.mintemp_c + '°C';
  document.querySelector(".after_forecast .status").innerHTML= day.condition.text ;
  document.querySelector(".after_forecast img").setAttribute("src", day.condition.icon);
}

