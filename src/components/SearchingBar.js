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
            onChange={props.updateCityName} />
        <button onClick={props.handleClick}>
            <FaSearch />
        </button>
    </form>
  )
}
