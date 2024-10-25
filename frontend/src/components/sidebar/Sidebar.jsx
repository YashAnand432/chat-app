import React from 'react'
import SearchInput from './SearchInput.jsx'
import Conversations from './Conversations.jsx'
import LogoutButton from './LogoutButton.jsx'
import FriendButton from './FriendButton.jsx'
const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      
    <SearchInput />
    <div className='divider px-3'></div>
    <Conversations />
    <div className='mt-auto flex space-x-4' >
      <div><LogoutButton /></div>
      <div><FriendButton /></div>
      
    </div>
    </div>
  )
}

export default Sidebar
