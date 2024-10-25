import React from 'react'
import {FaSearch} from 'react-icons/fa';
const SearchButton = ({search}) => {
  return (
    <div>
        <button onClick={search} className="flex items-center justify-center text-white bg-transparent hover:bg-blue-300 px-3 py-3 rounded-full transition duration-200"
      >
        <FaSearch />
      </button>
    </div>
  )
}

export default SearchButton
