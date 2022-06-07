import React, { memo, useContext } from 'react'
import { Context } from '../Context'
import {GiWaterDrop} from 'react-icons/gi'
import {IoCloudSharp} from 'react-icons/io5'
import {RiTempColdFill} from 'react-icons/ri'
import {FaRegEye} from 'react-icons/fa'
import {motion} from "framer-motion"
import EachDayDataCard from '../sec-components/EachDayDataCard'


const CityData = memo((props) => {
  const {currentDayDataContainer} = useContext(Context)

  const {humidity, clouds, min, max, visibility} = currentDayDataContainer

  const arrayOfAllData = [
    {
      title: "Humidity",
      currentNumber: `${humidity} %`,
      icon: <GiWaterDrop className='icon'/>
    },
    {
      title: "Clouds",
      currentNumber: `${clouds} %`,
      icon: <IoCloudSharp className='icon'/>
    },
    {
      title: "Min / Max",
      currentNumber: `${min}° / ${max}°`,
      icon: <RiTempColdFill className='icon'/>
    },
    {
      title: "Visibility",
      currentNumber: `${visibility} km`,
      icon: <FaRegEye className='icon'/>
    },
  ]

  function getAllInfoCarts(){
    return arrayOfAllData.map((item, index) => (
      <EachDayDataCard 
        key={index}
        title={item.title}
        currentNumber={item.currentNumber}
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