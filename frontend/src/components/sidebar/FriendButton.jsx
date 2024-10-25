import React from 'react';
import { FaUserFriends } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const FriendButton = () => {
  const navigate = useNavigate();  

  const handleNavigation = () => {
    // Navigate to the Friends page when the button is clicked
    navigate('/friends');
  };

  return (
    <button 
      onClick={handleNavigation} 
      className="friend-button flex items-center justify-center  text-white"
      title="Friends"
    >
      <FaUserFriends className="h-6 w-6" />
    </button>
  );
};

export default FriendButton;
