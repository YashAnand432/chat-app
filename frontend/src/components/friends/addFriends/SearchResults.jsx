import React, { useState } from 'react'
import Add from './Add';
const SearchResults = ({results, sendFriendRequest}) => {
  return (
    <div className="mt-2 bg-transparent shadow-md w-full">
      {results.length > 0 ? (
        results.map((user) => (
          <div key={user._id}  className="p-2 font-bold bg-transparent cursor-pointer transition duration-200 hover:bg-blue-300 hover:text-black flex items-center justify-between mx-5">
            <div>{user.userName}</div>
            <div> <Add sendFriendRequest={sendFriendRequest} recipientId={user._id} /> </div>
            
          </div>
        ))
      ) : (
        <div className="p-2">No results found</div>
      )}
    </div>
  );
}

export default SearchResults
