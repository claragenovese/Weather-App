import React, {useContext} from "react";
import { Context } from "./Context";
import './style/App.css'
import BeatLoader from "react-spinners/BeatLoader";
import CityData from "./components/CityData/CityData";
import CityTemps from "./components/CityTemps/CityTemps";
import HourlyForecast from './components/HourlyForecast/HourlyForecast';
import DailyForecast from './components/DailyForecast/DailyForecast';
import StartingAnimation from "./animation/StartingAnimation";
import SearchingBar from "./components/SearchingBar";

function App() {
  const {isLoading,
        errorFromApi, 
        callApiAndUpdateData, 
        currentDayDataContainer, 
        updateCityName, 
        cityName} = useContext(Context)

  function handleClick(e){
    e.preventDefault()
    callApiAndUpdateData(cityName)
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
        <CityTemps />
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
