// Open weather API key and //Giphy API Key
const apiKey = "a1c476fa4f69d87eb6f99463dd7ed7b6";
const giphyKey = "WqFJ3CXUPLV8g0fEWPfJ2thqHPVbpT9E&s"

// get the DOm elements
let locations = document.getElementById("location");
let search = document.getElementById("search");
let weather = document.getElementById("weather");

// initialize variable for location searched, and add event listener for input data entered, to update the searched data variable with the input value
let searchedLocation = "";
locations.addEventListener("input", (event) => {
  searchedLocation = event.target.value;
})


  // event listener for when search button is clicked, and for when Enter key is pressed
  search.addEventListener("click", fetchData);
  locations.addEventListener("keypress", (event) => {
    event.key === "Enter"? fetchData(): "";
  })

  // fetch data from open weather API based on input value
  function fetchData() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchedLocation}&appid=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      weatherForecast(data);
      
    })
    .catch((error) => console.log("Error", error))
  }

  //function to check if the weather property exists in the data object
  // if true, update weather information in the html, if false, display an error message
function weatherForecast(data) {   
    if(data.weather) {
      console.log(data)
      document.getElementById("weather-location").innerHTML = searchedLocation.toUpperCase();

      document.getElementById("weather-condition").innerHTML = data.weather[0].main.toUpperCase();

      document.getElementById("weather-description").innerHTML = data.weather[0].description.toUpperCase();

      const iconCode = data.weather[0].icon; //get iconCode from data obj

      document.getElementById("weather-icon").style.visibility = "visible"

      document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

      

      document.getElementById("temperature-celsius").innerHTML = (data.main.temp - 273.15).toFixed(1) + "°C" + " |";

      document.getElementById("temperature-fahrenheit").innerHTML = ((data.main.temp - 273.15) * 9/5 + 32).toFixed(1) + "°F";
      
    } else {
      weather.innerHTML = "Location not found";
      setTimeout(() => {
        document.location.reload();
      }, 3000);
         
    }  
    
    const weatherCondition = data.weather[0].main;   //get weather condition from the data object

    let backgroundStyle = document.getElementById("weather");
    backgroundStyle.style.backgroundRepeat = "no-repeat";
    backgroundStyle.style.backgroundSize = "cover";

    

    // async & await function to get a Gif based on weather condition, which we pass as a parameter
     // fetch the data from giphy API
      // convert the response using JSON
      // use the image url to set the background gif
    async function getWeatherGif(weatherCondition) {    
      const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${giphyKey}=${weatherCondition}`, {mode: 'cors'})

     const weatherData = await response.json();
      backgroundStyle.style.backgroundImage = `url(${weatherData.data.images.original.url})`;
    }
    
    // call the function in the switch cases based on the weather condition and enter a string for the specific gif with a similar name to appear in the div
    switch (weatherCondition) {      
      case "Clouds":
        getWeatherGif("clouds");
        break;
      case "Thunderstorm":
        getWeatherGif("thunderstorm");
        break;
      case "Rain":
        getWeatherGif("rain");
        break;
      case "Drizzle":
        getWeatherGif("drizzle");
        break;
      case "Snow":
        getWeatherGif("snow");;
        break;
      case "Mist":
        getWeatherGif("mist");
        break;
      case "Smoke":
        getWeatherGif("smoke");
        break;
      case "Haze":
        getWeatherGif("haze");
        break;
      case "Dust":
        getWeatherGif("dust");
        break;
      case "Fog":
        getWeatherGif("fog");
        break;
      case "Sand":
        getWeatherGif("sand");
        break;
      case "Ash":
        getWeatherGif("ash");
        break;
      case "Squall":
        getWeatherGif("squall");
        break;
      case "Tornado":
        getWeatherGif("tornado");
        break;
      case "Clear":
        getWeatherGif("clear sky");
        break;
      default:
        getWeatherGif("");
        break;
    }
}




  
  

