import { useState } from "react"
import { Search } from "lucide-react"

interface SearchBarProps {
  onSearchResults: (results: any[]) => void
}

export function SearchBar({ onSearchResults }: SearchBarProps) {
  const [input, setInput] = useState("")

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/recipe/search/${input}`, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      })
      const data = await response.json()
      onSearchResults(data)
    } catch (error) {
      console.error("Error fetching search results:", error)
      onSearchResults([])
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="mx-auto max-w-4xl mt-5">
      <div className="flex items-center bg-white shadow-lg rounded-full p-1">
        <Search className="ml-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Search recipes..."
          className="flex-grow px-4 py-2 bg-transparent border-none outline-none focus:ring-0 text-gray-800 placeholder-gray-400"
        />
        <button
          onClick={handleSearch}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-full px-6 py-2 transition-colors duration-200"
        >
          Search
        </button>
      </div>
    </div>
  )
}