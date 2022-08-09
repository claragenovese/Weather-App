import React, { memo, useContext } from 'react'
import { Context } from '../../Context'
import {GiWaterDrop} from 'react-icons/gi'
import {IoCloudSharp} from 'react-icons/io5'
import {RiTempColdFill} from 'react-icons/ri'
import {FaRegEye} from 'react-icons/fa'
import {motion} from "framer-motion"
import EachDayDataCard from './EachDayDataCard'


const CityData = memo(() => {
  const {currentDayDataContainer} = useContext(Context)

  const {humidity, clouds, min, max, visibility} = currentDayDataContainer

  const weatherData = [
    {
      type: "Humidity",
      value: `${humidity} %`,
      icon: <GiWaterDrop className='icon'/>
    },
    {
      type: "Clouds",
      value: `${clouds} %`,
      icon: <IoCloudSharp className='icon'/>
    },
    {
      type: "Min / Max",
      value: `${min}° / ${max}°`,
      icon: <RiTempColdFill className='icon'/>
    },
    {
      type: "Visibility",
      value: `${visibility} km`,
      icon: <FaRegEye className='icon'/>
    },
  ]

  function getAllInfoCarts(){
    return weatherData.map((item, index) => (
      <EachDayDataCard 
        key={index}
        title={item.type}
        currentNumber={item.value}
        icon={item.icon}
        />
    ))
    
  }

  return (
    <motion.div 
      className='city-data'
      initial={{ opacity: 0 }}
      animate={{opacity: 1}}
      transition={{ ease: "easeOut", duration: 0.6, delay: 0.2 }}>
      {getAllInfoCarts()}
    </motion.div>
  )
})

export default CityData;