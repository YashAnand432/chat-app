import React, { useEffect, useState } from 'react'
import { IoMdPersonAdd } from "react-icons/io";
import axios from 'axios';
const Add = ({sendFriendRequest, recipientId}) => {
  const [status, setStatus] = useState('idle'); //the user hasnt interacted with this profile

  useEffect(() => {
    const checkFriendStatus = async () => {
      try {
        const response = await axios.get(`/api/users/get-friend-status/${recipientId}`);
        const {isFriend, isPending, isIdle} = response.data;
        
        if(isFriend){
          setStatus('friends');
        } else if(isPending){
          setStatus('pending');
        }else {
          setStatus('idle');
        }
      } catch (error) {
          console.log("failed to check friend status", error);
      }
    };
    checkFriendStatus();
  }, [recipientId]);

  const fetchFriendStatus = async() => {
    try {
      const response = await axios.get(`/api/users/get-friend-status/${recipientId}`);
      const {isFriend, isPending, isIdle} = response.data;

      if(isFriend){
        setStatus('friends');
      } else if(isPending){
        setStatus('pending');
      } else {
        setStatus('idle');
      }

    } catch (error) {
      console.log("Failed to check friend status", error);
      toast.error("Could not retrieve friend status.")
    }
  }

  useEffect(() => {
    fetchFriendStatus();
  }, [recipientId]);


  const handleSendRequest = async () => {
    try {
      await sendFriendRequest(recipientId); // Assume this is a passed prop for sending the request
      setStatus('pending'); // Update status to pending after sending the request
    } catch (error) {
      console.log("Failed to send friend request", error);
      setError("Failed to send friend request");
    }
  };

  return (
    <div>
       {status === 'friends' && <p>You are already friends</p>}
       {status === 'pending' && <p>Friend request pending</p>}
       {status === 'idle' && (
        <button onClick={handleSendRequest}>
          <IoMdPersonAdd />
            
        </button>
      )}
    </div>
  )
}

export default Add
