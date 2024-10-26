import Conversation from "../models/conversation.models.js"
import Message from "../models/message.models.js"
import User from "../models/user.models.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
export const sendMessage = async(req, res) => {
    try {
        const {message} = req.body;
        const {id : receiverId} = req.params; //we could also go for const {id} = req.params;
        const senderId = req.user._id;
        const sender = await User.findById(senderId);
        if(!sender.friends.includes(receiverId)){
            return res.status(500).json({message: "You can only send messages to friends."});
        }
        let conversation = await Conversation.findOne({
            participants : { $all : [senderId, receiverId]},
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]); 
        const ReceiverSocketId = getReceiverSocketId(receiverId);
        if(ReceiverSocketId){
            io.to(ReceiverSocketId).emit("newMessage", newMessage)
        }
        res.status(201).json({newMessage})
    } catch (error) {
        console.log("Error in send message controller : ", error.message)
        res.status(500).json({error : "Internal server error "});
    }
}

export const getMessages = async (req, res) => {
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants : {$all: [senderId, userToChatId]},
        }).populate("messages");

        if(!conversation){
            return res.status(200).json([]);
        }
        const messages = conversation.messages;
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in message controller", error.message);
        res.status(500).json({error : "Internal server error "})
    }
}