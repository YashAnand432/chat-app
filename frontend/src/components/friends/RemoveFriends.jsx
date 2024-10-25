import React, { useEffect } from 'react'
import { useState } from 'react';
import { MdDelete } from "react-icons/md";
import axios from "axios";

const RemoveFriends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchFriends = async() => {
      try {
        const response = await axios.get(`/api/users/get-friend-list`);
        setFriends(response.data);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching friends', error.message);
        setError('Failed to fetch friends');
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  const handleRemoveFriend = async (friendId) => {
    try {
      await axios.post(`/api/users/delete/${friendId}`);
      setFriends(friends.filter((friend) => friend._id !== friendId));
    } catch (error) {
      console.log('Failed to delete friend : ', error.message);
    }
  }


  if(loading) return <p>Loading friends...</p>
  if(error) return <p> {error} </p>

  if(friends.length===0 || !Array.isArray(friends)){
    return (
      <p>You dont have any friends</p>
    )
  }
  return (
    <div>
      <h1 className='text-2xl font-bold my-2 underline'>Your friends</h1>
      <ul className='flex flex-col justify-around'>
        
        {friends.map((friend) => (
          <li key={friend._id} className='flex justify-between items-center border-b-2 p-2'>
          {/* Left side: Friend's details */}
          <div>
            <h2 className='text-xl font-bold'>{friend.userName}</h2>
            <h3 className='text-gray-600 text-lg font-semibold'>{friend.fullName}</h3>
          </div>

          {/* Right side: Delete button */}
          <button 
            onClick={() => handleRemoveFriend(friend._id)} 
            className='bg-transparent hover:bg-blue-300 text-white rounded-full py-2 px-2'
          >
            <MdDelete className='h-6 w-6' />
          </button>
        </li>
        ))}
      </ul>
      <div className=''></div>
    </div>
  )
}

export default RemoveFriends
