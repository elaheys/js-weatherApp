import getWeatherData from "./utils/httpReq.js";
import { showModal } from "./utils/modal.js";

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weather = document.querySelector(".weather");
const locationIcon = document.getElementById("location");
const forecast = document.querySelector(".forecast");

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


const renderCurrentWeather = (data) => {
    if(!data) return searchInput.value = "";

    const weatherJSX = `
        <h1>${data.name}, ${data.sys.country}</h1>
        <div class="main">
        <img alt="weatherIcon" src="https://api.openweathermap.org/img/w/${data.weather[0].icon}.png"/>
        <span>${data.weather[0].main}</span>
        <p>${Math.round(data.main.temp)} °C</p>
        </div>
        <div class="info">
        <p>Humidity:<span>${data.main.humidity} %</span></p>
        <p>Wind Speed:<span>${data.wind.speed} m/s</span></p>
        </div>
        `
         
    weather.innerHTML = weatherJSX
    searchInput.value = "";
}

const getWeekDay = data => {
    return days[new Date(data * 1000).getDay()]
}

const renderForecastWeather = (data) => {
    if(!data) return;

    forecast.innerHTML = " ";
    data = data.list.filter(obj => obj.dt_txt.endsWith("12:00:00"));
    data.forEach(i => {
        const forecastJSX = `
            <div>
                <img alt="icon" src="https://api.openweathermap.org/img/w/${i.weather[0].icon}.png" />
                <h3>${getWeekDay(i.dt)}</h3>
                <p>${Math.round(i.main.temp)} °C</p>
                <span>${i.weather[0].main}</span>
            </div>
        `
        forecast.innerHTML += forecastJSX; 
    })
}

const searchHandler = async() => {
    const cityName = searchInput.value

    if(!cityName){
        showModal("Please enter city name!");
        return;
    }
    
        const currentWeather = await getWeatherData("current",cityName)
        renderCurrentWeather(currentWeather)
        const forecastWeather = await getWeatherData("forecast",cityName)
        renderForecastWeather(forecastWeather)
}


const positionCallback =async (position) => {
    const currentWeather =await getWeatherData("current",position.coords)
    renderCurrentWeather(currentWeather)
    const forecastWeather =await getWeatherData("forecast",position.coords)
    renderForecastWeather(forecastWeather)
}

const errorCallback = error => {
    showModal("Please check your location or VPN connection!")
    showModal(error)
}

const locationHandler = () => {
    if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(positionCallback,errorCallback);
    }else{
    showModal("Your browser does not support geolocation!")
    }

}

const initHandler = async() => {
    const currentWeather = await getWeatherData("current","gorgan")
    renderCurrentWeather(currentWeather)
    const forecastWeather = await getWeatherData("forecast","gorgan")
    renderForecastWeather(forecastWeather)
}

searchButton.addEventListener("click" , searchHandler);
locationIcon.addEventListener("click" , locationHandler);
document.addEventListener("DOMContentLoaded",initHandler)