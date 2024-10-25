import React from "react";
import SearchButton from "./SearchButton";
const SearchBar = ({query,setQuery,search}) => {
  return (
    <div className="flex justify-center items-center my-4">
      <div className="relative w-full max-w-md">
        <input
          type="text" value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter username of your friend..."
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
        <div className="absolute left-3 top-3 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16l-4-4m0 0l4-4m-4 4h12m2 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
      <SearchButton search={search} />
    </div>
  );
};

export default SearchBar;
