import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

const FriendsNavBar = ({setSelectedOption}) => {
  const navigate = useNavigate();
  return (
    <div className='my-2 cursor-pointer w-[40vw]'>
      <div className='flex justify-center items-center '>
        <div className='hover:bg-blue-300 hover:text-black px-7 py-2 cursor-pointer' ><Link to='/' >Back</Link> </div>
        <div className='hover:bg-blue-300 hover:text-black px-7 py-2 cursor-pointer' onClick={() => setSelectedOption("Add Friends")}>Add Friends</div>
        <div className='hover:bg-blue-300 hover:text-black px-7 py-2 cursor-pointer' onClick={() => setSelectedOption("Remove Friends")}>Remove Friends</div>
        <div className='hover:bg-blue-300 hover:text-black px-7 py-2 cursor-pointer' onClick={()=> setSelectedOption("Received Requests")}>Received Requests</div>
        {/* <div className='hover:bg-blue-300 hover:text-black px-7 py-2 cursor-pointer' onClick={()=>setSelectedOption("Block List")}>Block List</div> */}
      </div>
    </div>
  )
}

export default FriendsNavBar
