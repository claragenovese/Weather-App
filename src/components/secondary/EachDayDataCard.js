import React from 'react'

export default function EachDayDataCard({title, currentNumber, icon}) {
  return (
    <div className="card">
        {icon}
        <h3 className='title'>{title}</h3>
        <h3 className='number'>{currentNumber}</h3>
    </div>
  )
}
