import React from "react";
import SearchBar from "./addFriends/SearchBar";
import SearchResults from "./addFriends/SearchResults";
import SearchButton from "./addFriends/SearchButton";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
const AddFriends = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    
    const search = async () => {
        if(!query) return;
        try {
            const response = await axios.get(`/api/users/search-user-for-friend?userName=${query}`);
            setResults(response.data);
        } catch (error) {
            console.log("Error searching the user");
        }
    }

    const sendFriendRequest = async (recipientId) => {
        try {
            const response = await axios.post(`/api/users/send-friend-request/${recipientId}`);
            toast.success("Friend request sent");            
        } catch (error) {
            console.log("Error sending friend request : ", error.message)
        }
    }
    return (
        <div>
            <SearchBar query={query} setQuery={setQuery} search={search} />
            
            
            <SearchResults results={results} sendFriendRequest={sendFriendRequest} />
          

        </div>
    )
}
export default AddFriends;