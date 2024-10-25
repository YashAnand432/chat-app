import React from 'react'
import Conversation from './Conversation.jsx'
import useGetConversations from '../../hooks/useGetConversations.js'
import { getRandomEmoji } from '../../utils/emojis.js'
const Conversations = () => {
  const {loading,conversations} = useGetConversations();
  console.log("Conversations : ", conversations);

  if(!Array.isArray(conversations) || conversations.length===0){
    return <p>Add friends to chat</p>
  }
  return (
    <div className='flex flex-col py-2 overflow-auto'>
        {conversations.map((conversation) => (<Conversation key={conversation._id}  conversation ={ conversation } emoji={getRandomEmoji()} lastIdx={(conversations.length)-1} />))}
        {loading ? <span className='loading loading-spinner mx-auto'></span> : null }
      
    </div>
  )
}

export default Conversations
