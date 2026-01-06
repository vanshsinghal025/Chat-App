import { imageUploader } from "../config/cloudinary.config.js";
import { conversationModel } from "../models/conversation.model.js";
import { messageModel } from "../models/message.model.js";
import { userModel } from "../models/user.model.js";
import responseHandler from "../utils/responseHandler.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const { id: receiverId } = req.params;
    const { content } = req.body;
    const file = req.file;
    let imageUrl = ''
    let contentType = 'text'

    const receiver = await userModel.findById(receiverId);
    if (!receiver) {
      return responseHandler(res, 404, "user not found");
    }

    if (file){
      imageUrl = await imageUploader(file)
      contentType = 'image'
    }

    if (!file && !content){
      return responseHandler(res, 400, "message cannot be empty");
    }

    if (file && content){
      contentType = 'combined'
    }

    let conversation = await conversationModel.findOne({
      participants: {$all: [senderId, receiverId]}
    });

    if (!conversation) {
        conversation = await conversationModel.create({
            participants: [senderId, receiverId].sort()
        })
    }

    const message = await messageModel.create({
        senderId, receiverId, content, imageUrl, contentType
    })

    conversation.messages.push(message?._id);
    await conversation.save();
    await message.populate([{path: 'senderId', select: 'username fullName'}, {path: 'receiverId', select: 'username fullName'}])

    
    // SOCKET IO
    if (req.userSocketMap.has(receiverId)){
      req.io.to(req.userSocketMap.get(receiverId)).emit('receive-message', message)
    }
    
    return responseHandler(res, 200, 'message sent successfully', message)
  } catch (error) {
    console.error("Error in sending message", error);
  }
};


export const getMessage = async (req, res) => {
    try {
        const {id : receiverId} = req.params;

        const receiver = await userModel.findById(receiverId)
        const senderId = req.id

        if (!receiver){
            return responseHandler(res, 404, 'User not found')
        }

        const conversation = await conversationModel.findOne({
            participants: {$all: [senderId, receiverId]}
        })

        if (!conversation){
            return responseHandler(res, 200, 'New conversation', {messages: []})
        }

        await conversation.populate({path: 'messages', sort: {createdAt: 1}, populate: [{path: 'senderId', select: 'username fullName profilePicture'}, {path: 'receiverId', select: 'username fullName profilePicture'}]})

        return responseHandler(res, 200, 'Messages found', conversation)
    } catch (error) {
        console.error('Error in getting message', error)
    }
}