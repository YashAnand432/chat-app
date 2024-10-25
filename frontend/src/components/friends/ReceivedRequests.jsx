import React, { useEffect, useState } from 'react'
import axios from "axios"
import toast from "react-hot-toast"
import { IoMdPersonAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const ReceivedRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading]  = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReceivedRequests = async () => {
      try {
        const response = await axios.get('/api/users/get-received-requests');
        setRequests(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetched received requests');
        setLoading(false);
      }
    }

    fetchReceivedRequests();
  }, []);

  const acceptButtonHandler = async (requestId) => {
    try {
      const response = await axios.post(`/api/users/accept-friend-request/${requestId}`);
      setRequests((prevRequests) => prevRequests.filter(request => request._id !== requestId));
      toast.success("Friend request accepted");
    } catch (error) {
      console.log("Error accepting friend request");
    }
  }

  const rejectButtonHandler = async (requestId) => {
    try {
      const response = await axios.post(`/api/users/reject-friend-request/${requestId}`);
      setRequests((prevRequests) => prevRequests.filter(request => request._id !== requestId));
      toast.error("Friend request rejected")
    } catch (error) {
      console.log("Error rejecting a friend");
    }
  }
  if(loading){
    return <div>Loading...</div>
  }

  if(error){
    return <div>{error}</div>
  }
  return (
    <div>
      <h2 className='text-xl'>Received Requests</h2>
      {Array.isArray(requests) && requests.length>0 ?
        (
          <ul className='space-y-2'>
            {requests.map((request, index) => (
              <li key={index} className='flex justify-between items-center p-3 rounded-lg shadow-md' > 
                {request.fullName} - {request.userName}
                <div className='flex items-center space-x-2'>
                  {/* accept button */}
                  <div>
                    <IoMdPersonAdd className='cursor-pointer' onClick={() => acceptButtonHandler(request._id)} />
                  </div>
                  {/* reject button */}
                  <div>
                    <RxCross2 className='h-5 w-5 cursor-pointer' onClick={() => rejectButtonHandler(request._id)} />
                  </div>

                </div>
              </li>
            ))}
          </ul>
        )
      : (
          <p>No requests yet..</p>
        )}
    </div>
  )
}

export default ReceivedRequests
