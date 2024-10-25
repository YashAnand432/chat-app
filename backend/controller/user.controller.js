import User from "../models/user.models.js";

export const getUsersForSidebar = async(req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id : { $ne : loggedInUserId}}).select("-password");
        return res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSidebar", error.message);
        res.status(500).json({error :"Internal server error "})
    }
}

export const searchUsersForFriend = async(req,res) => {
    try {
        const searcherId = req.user._id;
        const {userName} = req.query;
        if(!userName){
            return res.status(400).json({error : "Username is required"});
        }
        const users = await User.find({
            userName: { $regex: userName, $options: 'i' }
        }).select('userName');
        console.log("Users found : ", users);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error : "Internal server error "});
    }
}
export const sendFriendRequest = async(req,res) => {
    try{
        const senderId = req.user._id;
        const recipientId = req.params.id;
         //logic for sendFriendRequest
        const sender = await User.findById(senderId);
        const recipient = await User.findById(recipientId);
        if(!recipient || !sender){
            return res.status(500).json({ message : "User not found"});
        }
        if(recipient == sender){
            return res.status(500).json({message : "Recipient and sender are same"});
        }
        if(sender.friends.includes(recipientId) || sender.friendRequestsSent.includes(recipientId)){
            return res.status(500).json({message : "Request already sent or user already a friend"});
        }

        sender.friendRequestsSent.push(recipientId);
        recipient.friendRequestsReceived.push(senderId);

        await sender.save();
        await recipient.save();

        res.status(200).json({message : "Friend request sent!"});
    } catch(error){
        res.status(500).json({message : error.message});
    }
}

export const getFriendStatus = async(req,res) => {
    try {
        const senderId = req.user._id;
        const recipientId = req.params.id;
        const sender = await User.findById(senderId);
        const recipient = await User.findById(recipientId);

        console.log("Recipient ID:", recipientId);
        console.log("Sender ID:", req.user._id);  // Check if senderId is correct
        if(!recipient || !sender){
            return res.status(400).json({message : "User not found "});
        }
        if(sender.friends.includes(recipientId)){
            console.log("isfriend");
            return res.status(200).json({isFriend : true, isPending: false , isIdle:false})
        }
        if(sender.friendRequestsSent.includes(recipientId)){
            console.log("is pending")
            return res.status(200).json({isFriend : false, isPending: true, isIdle:false})
        }
        return res.status(200).json({isFriend:false, isPending:false, isIdle:true});

    } catch (error) {
        res.status(500).json({error : "Internal server error"});
    }
}
export const acceptFriendRequest = async(req,res) => {
    try{
        const userId = req.user._id;
    const senderId = req.params.id;

    const user = await User.findById(userId);
    const sender = await User.findById(senderId);

    if (!sender || !user) return res.status(404).json({message: "User not found"});

    // Check if a request exists
    if (!user.friendRequestsReceived.includes(senderId)) {
        return res.status(400).json({message: "No friend request from this user"});
    }

    // Add to friends list and remove from requests
    user.friends.push(senderId);
    sender.friends.push(userId);

    user.friendRequestsReceived = user.friendRequestsReceived.filter(id => !id.equals(senderId));
    sender.friendRequestsSent = sender.friendRequestsSent.filter(id => !id.equals(userId));

    await user.save();
    await sender.save();

    res.status(200).json({message: "Friend request accepted"});

    } catch(error){
        res.status(500).json({message : error.message});
    }
}

export const rejectFriendRequest = async (req, res) => {
    try {
        const userId = req.user._id;
        const senderId = req.params.id;

        // Logic to reject friend request (remove from received requests)
        const user = await User.findById(userId);
        const sender = await User.findById(senderId);

        if (!sender || !user) return res.status(404).json({message: "User not found"});
        
        if (!user.friendRequestsReceived.includes(senderId)) {
            return res.status(400).json({message: "No friend request from this user"});
        }

        user.friendRequestsReceived = user.friendRequestsReceived.filter(id => id.toString() !== senderId);
        sender.friendRequestsSent = sender.friendRequestsSent.filter(id => id.toString() !== userId);

        await user.save();
        await sender.save();

        res.status(200).json({message : "friend request rejected"});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteFriend = async(req,res) => {
    try {
        const userId = req.user._id;
        const recipientId = req.params.id;

        await User.findByIdAndUpdate(userId, { $pull : { friends : recipientId}});
        await User.findByIdAndUpdate(recipientId, { $pull : { friends : userId}});
    
        res.status(200).json({message : 'Friend removed successfully.'});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

export const getFriendList = async(req,res) => {
    try {
        const userId = req.user._id; // Get the authenticated user's ID
    
        const user = await User.findById(userId).populate('friends', '-password'); // Populate friends and exclude password

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if(user.friends.length === 0){
            return res.status(200).json({message : "You have no friends yet."})
        }
        
        res.status(200).json(user.friends); // Return the friends list
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

export const getReceivedRequests = async(req,res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate('friendRequestsReceived', '-password');
        if(!user){
            return res.status(400).json({message : "User does not exist"});
        }
        if(user.friendRequestsReceived.length===0){
            return res.status(200).json({message : "You have no requests yet"});
        }
        return res.status(200).json(user.friendRequestsReceived);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
} 