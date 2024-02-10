import React, { useState } from 'react';
import './TempApp.css';
import clear_weather from '../images/clear_weather.png';
import cloud_weather from '../images/cloud_weather.png';
import drizzle_weather from '../images/drizzle_weather.png';
import humidity from '../images/humidity.png';
import rain_weather from '../images/rain_weather.png';
import snow_weather from '../images/snow_weather.png';
import wind from '../images/wind.png';

function TempApp() {

  const [weatherIcon, setWeatherIcon] = useState(cloud_weather);

  const api_key='b40c62203613f08548ad3527d87c9722';


  
  const search = async ()=>{

    const element = document.getElementsByClassName("input");

    if(element[0].value ===""){
      return 0;
    }
    try{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    let response = await fetch(url);
    let data  = await response.json();

    const humidity = document.getElementsByClassName("humidity_percent");
    const wind = document.getElementsByClassName("wind");
    const temp = document.getElementsByClassName("weather_temp");
    const location = document.getElementsByClassName("weather_location");

    humidity[0].innerHTML = data.main.humidity+" %";
    wind[0].innerHTML = data.wind.speed+" KM/h";
    temp[0].innerHTML = data.main.temp+" &deg;C";
    location[0].innerHTML = data.name;


    if(data.weather[0].icon ==="01d" || data.weather[0].icon ==="01n"){
        setWeatherIcon(clear_weather);  
    }else if(data.weather[0].icon ==="02d" || data.weather[0].icon ==="02n"){
      setWeatherIcon(cloud_weather); 
    }else if(data.weather[0].icon ==="03d" || data.weather[0].icon ==="03n"){
      setWeatherIcon(drizzle_weather); 
    }else if(data.weather[0].icon ==="04d" || data.weather[0].icon ==="04n"){
      setWeatherIcon(drizzle_weather); 
    }else if(data.weather[0].icon ==="09d" || data.weather[0].icon ==="09n"){
      setWeatherIcon(rain_weather); 
    }else if(data.weather[0].icon ==="10d" || data.weather[0].icon ==="10n"){
      setWeatherIcon(rain_weather); 
    }else if(data.weather[0].icon ==="13d" || data.weather[0].icon ==="13n"){
      setWeatherIcon(snow_weather); 
    }else{
      setWeatherIcon(clear_weather); 
    }

}catch(error){
    return alert("No Internet Connection or City Not Found");
}

}


return (
  <>
  <div className='container'>
  <div className='weather_div'>
    <div className='flex'>
      <input type="text" placeholder='Search City Name' className='input' />
      <button type='button' onClick={()=>{search()}} className='btn'>Search</button>
    </div>
    <div className='weather_image flex'>
      <img className='img' src={weatherIcon} alt="" />
    </div>
    <div className='weather_temp flex'>00.00 &deg;C</div>
    <div className='weather_location flex'>City Name</div>
    <div className='flex2'>
      <div>
        <figure className='figure'>
          <img src={humidity} alt="" className='img' />
          <figcaption>
            <div className='humidity_percent'>00 %</div>
            <div className='text'>Humidity</div>
            </figcaption>
          </figure>
        </div>

        <div>
          <figure className='figure'>
            <img src={wind} alt="" />
            <figcaption>
              <div className='wind'>0 KM/h</div>
              <div className='text'>Wind</div>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
    </div>
    
    </>
  )
}

export default TempApp;