import React, {useContext} from "react";
import { Context } from "./Context";
import './style/App.css'
import BeatLoader from "react-spinners/BeatLoader";
import CityTemp from './hero-components/CityTemps';
import CityData from './hero-components/CityData';
import HourlyForecast from './hero-components/HourlyForecast';
import DailyForecast from './hero-components/DailyForecast';
import StartingAnimation from "./sec-components/StartingAnimation";
import SearchingBar from "./sec-components/SearchingBar";

function App() {
  const {isLoading, errorFromApi, callApiAndUpdateData, currentDayDataContainer, updateCityName, cityName} = useContext(Context)

  function handleClick(e){
    e.preventDefault()
    callApiAndUpdateData(cityName);
    document.getElementById('text-input').blur()
  }

  function setBackground(){
    return isTemperatureWarm() ? "warm" : "cold"
  }
  
  function isTemperatureWarm(){
    return isLoading === false && currentDayDataContainer.actualTemp > 16
  }

  function displayLoader(){
    return (
      <div className="loader-container">
        <BeatLoader color="rgba(255, 255, 255, 0.8)" size={20}/>
      </div>
    )
  }

  function displayPrimaryComponents(){
    return (
      <div className="container">
        <CityTemp />
        <CityData />
        <HourlyForecast />
        <DailyForecast />
      </div>
    )
  }

  function displayError() {
    return (
      <h1 className="error">{errorFromApi.message}</h1>
    )
  }

  return (
    <div className={`App ${setBackground()}`}>
      <StartingAnimation />
      
      <SearchingBar 
        cityName={cityName}
        updateCityName={updateCityName}
        handleClick={handleClick}/>
      {
        errorFromApi.state ? 
        displayError() : 
        isLoading ? 
          displayLoader():  
          displayPrimaryComponents() 
      } 
    </div>
  );
}

export default App;
