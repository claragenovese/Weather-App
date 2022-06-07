import React, { memo, useContext } from 'react'
import { Context } from '../Context';
import { MdLocationOn } from "react-icons/md";
import {motion} from "framer-motion";

const CityTemps = memo(() => {
  const {currentDayDataContainer} = useContext(Context)

  const {city, country, howIsWeather, iconUrl, actualTemp, last_updated} = currentDayDataContainer
  return (
    <motion.div 
      className='city-temp' 
      initial={{ opacity: 0 }}
      animate={{opacity: 1}}
      transition={{ ease: "easeOut", duration: 0.6 }}>
      <div className='last-updated'>
        {last_updated}
      </div>
      <h3 className='location'>
        <span> <MdLocationOn /></span>{city}, {country}
      </h3>
      <div className="temp">
        <h2 className="number-temp">{actualTemp}<span>ºC</span></h2>
        <img className='icon-temp' src={iconUrl} />
      </div>
      <h4 className='weather'>{howIsWeather}</h4>
    </motion.div>
  )
})

export default CityTemps