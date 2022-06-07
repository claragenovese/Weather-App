import React from 'react'
import { FaSearch } from "react-icons/fa";

export default function SearchingBar(props) {
  return (
    <form className="form">
        <input 
            id='text-input'
            type="text" 
            placeholder="Enter a City Name" 
            value={props.cityName} 
            onChange={event => props.updateCityName(event.target.value)} />
        <button onClick={e => props.handleClick(e)}>
            <FaSearch />
        </button>
    </form>
  )
}
