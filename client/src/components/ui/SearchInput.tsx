import React from "react"
import { FaSearch } from "react-icons/fa"

interface Props {
  onSearch: (value: string) => void
}

const SearchInput = ({ onSearch }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value)
  }

  return (
    <div className="flex items-center border font-light border-gray-300 rounded-md p-2">
      <FaSearch className="text-gray-500 ml-2 mr-2" />
      <input
        onChange={handleChange}
        placeholder="Search..."
        className="flex-grow outline-none"
      />
    </div>
  )
}

export default SearchInput
