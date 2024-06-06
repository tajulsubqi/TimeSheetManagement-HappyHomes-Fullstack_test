import React from "react"
import { FaSearch } from "react-icons/fa"

const SearchInput = () => {
  return (
    <div className="flex items-center border font-light border-gray-300 rounded-md p-2">
      <FaSearch className="text-gray-500 ml-2 mr-2" />
      <input type="text" placeholder="Search..." className="flex-grow outline-none" />
    </div>
  )
}

export default SearchInput
