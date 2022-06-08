import React, { memo, useContext } from 'react'
import { Context } from '../../Context'
import moment from 'moment'
import { motion } from 'framer-motion'
import ForecastDay from '../secondary/ForecastDay'

const DailyForecast = memo((props) => {

  const {forecastDayContainer} = useContext(Context)
  const currentDay = moment().format("dddd")

  function getTomorrowAndAfterTomorrowNames(currentDay){
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday", "Monday"]
    const currentDayPosition = daysOfWeek.findIndex(day => day === currentDay)

    const tomorrowAndAfter = [daysOfWeek[currentDayPosition + 1], daysOfWeek[currentDayPosition + 2]]

    return tomorrowAndAfter
  }

  function getEachForecastComponent(){
    return forecastDayContainer.map((item, index) => (
      <ForecastDay 
        key={index}
        nameOfDay={getTomorrowAndAfterTomorrowNames(currentDay)[index]}
        minTemp={item.minTemp}
        maxTemp={item.maxTemp}
        weatherIcon={item.weatherIcon}
        />
    ))
  }

  return (
    <motion.div 
      className='daily'
      initial={{ opacity: 0 }}
      animate={{opacity: 1}}
      transition={{ ease: "easeOut", duration: 0.6, delay: 0.4 }}>
        {getEachForecastComponent()}
    </motion.div>
  )
})

export default DailyForecast