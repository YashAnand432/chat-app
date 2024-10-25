import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"; 

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);
	const [friendList, setFriendList] = useState([]);
	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const {data : friendsData} = await axios.get("/api/users/get-friend-list");
				if (!friendsData || friendsData.length === 0) {
					// If no friendsData or friendsData is an empty array, set the list to empty and show a toast
					setFriendList([]);
					setConversations([]);
					toast("You have no friends yet."); // Display a message but no error
				  } else {
					setFriendList(friendsData);
					setConversations(friendsData); // Assuming conversations are derived from friendsData
				  }
				if (friendsData.error) {
					throw new Error(data.error);
				}
				
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;