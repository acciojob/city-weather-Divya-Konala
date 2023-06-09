import React, { useState } from 'react'
import Axios from 'axios'

const key="2f21fa30b1082fee9e850a9b52541b90";
const Weather = () => {
    const [cityName,setCityName]=useState("");
    const [weatherData,setWeatherData]=useState();
    const handleSearch=()=>{
        Axios.get('https://api.openweathermap.org/data/2.5/weather',{
            params:{
                appid:key,
                q:cityName
            },
        })
        .then((res)=>{
            console.log(res);
            setWeatherData(res.data);
            setCityName("");
        })
        .catch((error)=>console.log(error.message))
    }
  return (
    <div>
        <form>
            <input className='search' type='text' placeholder='Enter a city' value={cityName} onChange={(e)=>setCityName(e.target.value)} onBlur={handleSearch}/>
            {/* <button type='button' onClick={handleSearch}>Search</button> */}
        </form>
        <div className='weather'>
        {
            (weatherData!==undefined)
            ?<>
                <p>{weatherData.name}</p>
                <h1>{Math.round((weatherData.main.temp-273.15)*(9/5)+32)}°F</h1>
                <p>{weatherData.weather[0].description}</p>
                <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weather_img"/>
            </>
            :""
        }
        </div>
    </div>
  )
}

export default Weather