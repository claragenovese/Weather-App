import React, {useEffect, useState} from "react";
import axios from "axios";
import {getGeo} from "geoplugin";

const Context = React.createContext()

const API_BASE = "https://api.weatherapi.com/v1/forecast.json"
const API_KEY = "86f5c8bf793c454fad4130221220505"
  
function ContextProvider(props){

  const [cityName, setCityName] = useState("")
  const [userLocation, setUserLocation] = useState("")

  const [currentDayDataContainer, setCurrentDayDataContainer] = useState({}) 
  const [hourlyForecastContainer, setHourlyForecastContainer] = useState({})
  const [forecastDayContainer, setForecastDayContainer] = useState({})

  const [isLoading, setIsLoading] = useState(true)
  const [errorFromApi, setErrorFromApi] = useState({state: false, message: ""})

  
  async function getApiData (city){
    const link = `${API_BASE}?key=${API_KEY}&q=${city}&days=3&aqi=no`
    try{
      const res = await axios.get(link)
      return res.data      
    }
    catch(err){
      setErrorFromApi({state: true, message: err.message})
      resetStates()
    }
  }
 
  function setSates(){
    setIsLoading(true)
    setCityName("")
  }

  function resetStates(){
    setIsLoading(false)
    setCityName("")
  }

  function fillDataWeNeedWithApiResponse(apiData){
    const current = apiData.current
    const location = apiData.location
    const forecast = apiData.forecast.forecastday 

    fillCurrentDayData(current, location, forecast)
    fillDailyForecastData(forecast)
    fillCurrentHourlyForecast(forecast)
  }

  function fillCurrentDayData(current, location, forecast){
    setCurrentDayDataContainer({
      last_updated: current.last_updated,
      city: location.name,
      country: location.country,
      actualTemp: current.temp_c,
      howIsWeather: current.condition.text,
      iconUrl: current.condition.icon,
      humidity: current.humidity,
      clouds: current.cloud,
      min: forecast[0].day.mintemp_c,
      max: forecast[0].day.maxtemp_c,
      visibility: current.vis_km
    })
  }
  
  function fillDailyForecastData(forecast){
    setForecastDayContainer(
      [getForecastDayData(forecast, 1), // Tomorrow
      getForecastDayData(forecast, 2)] // After tomorrow
    )
  }

  function getForecastDayData(forecast, numberOfDay){
    return(
      {
        minTemp: forecast[numberOfDay].day.mintemp_c,
        maxTemp: forecast[numberOfDay].day.maxtemp_c,
        weatherIcon: forecast[numberOfDay].day.condition.icon
      }
    )
  }

  function fillCurrentHourlyForecast(forecast){
    const eachHour = forecast[0].hour.map(item => item.time.slice(-5))
    const tempForEachHour = forecast[0].hour.map(item => item.temp_c)
    const hourlyData = [eachHour, tempForEachHour]

    setHourlyForecastContainer(hourlyData)
  }
  
  function updateCityName(name){
      setCityName(name)
  }
  

// HEAD FUNCTION

  async function callApiAndUpdateData(city){
    setSates()
    const apiData = await getApiData(city)
    fillDataWeNeedWithApiResponse(apiData)
    resetStates()
  }

// END HEAD FUNCTION

  function getUserLocationAndUpdateData(){
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude}}) => {

      callApiAndUpdateData(`${latitude},${longitude}`)

    }, showIfgeolocationError, {timeout: 10000})
  }

  function showIfgeolocationError(err) {
    if (err.code == err.TIMEOUT) 
        alert("Waiting time has been exceeded");
    if (err.code == err.PERMISSION_DENIED)     
        alert("El usuario no permitió informar su posición");
    if (err.code == err.POSITION_UNAVAILABLE)                 
        alert("El dispositivo no pudo recuperar la posición actual");
}

  useEffect(()=>{ //time out to wait the intro animation ends

    setTimeout(() => {
      getUserLocationAndUpdateData()
    }, 1000);

  }, []);
  

  return (
    <Context.Provider value={{isLoading, errorFromApi, currentDayDataContainer, hourlyForecastContainer, forecastDayContainer, cityName, updateCityName, callApiAndUpdateData}}>
        {props.children}
    </Context.Provider>
  );
}

export {ContextProvider, Context};