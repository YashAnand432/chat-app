import React from 'react'
import AddFriends from './AddFriends'
import RemoveFriends from './RemoveFriends'
import FriendList from './FriendList'
import BlockList from './BlockList'
import ReceivedRequests from './ReceivedRequests'
const FriendsContainer = ({selectedOption}) => {
  return (
    <div className='border border-white h-[60vh] w-[40vw]'>
        {selectedOption==="Add Friends" && <AddFriends />}
        {selectedOption==="Remove Friends" && <RemoveFriends />}
        {selectedOption==="Friend List" && <FriendList />}
        {selectedOption==="Block List" && <BlockList />}
        {selectedOption==="Received Requests" && <ReceivedRequests />}
    </div>
  )
}

export default FriendsContainer
