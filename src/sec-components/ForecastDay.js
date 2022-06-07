import React from 'react'

export default function ForecastDay({nameOfDay, minTemp, maxTemp, weatherIcon}) {
  return (
    <div className='each-day'>
        <h4>{nameOfDay}</h4>
        <img src={weatherIcon} className="weather-icon" />
        <h4 className="min-max">{minTemp}°  /  {maxTemp}°</h4>
    </div>
  )
}
