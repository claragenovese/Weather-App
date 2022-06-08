import React, { memo } from 'react'
import LineChart from '../../charts/LineChart'
import { motion } from 'framer-motion'

const HourlyForecast = memo(() => {
  return (
    <motion.div 
      className='hourly'
      initial={{ opacity: 0 }}
      animate={{opacity: 1}}
      transition={{ ease: "easeOut", duration: 0.6, delay: 0.2 }}>
        <div className='chart-container'>
          <LineChart />
        </div>
    </motion.div>
  )
})

export default HourlyForecast