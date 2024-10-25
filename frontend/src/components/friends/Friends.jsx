import React, { useState } from "react";
import FriendsNavBar from "./FriendsNavBar";
import FriendsContainer from "./FriendsContainer";
const Friends = () => {
    const [selectedOption , setSelectedOption] = useState("Add friends");
    return (
        <div>
            <FriendsNavBar setSelectedOption={setSelectedOption}/>
            <FriendsContainer selectedOption={selectedOption} />
        </div>
    )
}

export default Friends;