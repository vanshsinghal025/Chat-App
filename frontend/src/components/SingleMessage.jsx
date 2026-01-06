import React from "react";
import { useSelector } from "react-redux";

const SingleMessage = ({msg}) => {
  const {user, selectedUser} = useSelector(store => store.user)
  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replaceAll('/', '-')
  }

  const formattedTime = (date) => {
    return new Date(date).toLocaleTimeString('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  return (
    <div className={`chat ${selectedUser?._id === msg?.senderId?._id ? 'chat-start' : 'chat-end'}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={selectedUser?._id === msg?.senderId?._id ? selectedUser?.profilePicture : user?.profilePicture}
          />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs font-medium text-gray">{`${formattedDate(msg?.createdAt)} ${formattedTime(msg?.createdAt)}`}</time>
      </div>
      <div className={`${msg?.contentType === 'combined' ? 'max-w-[50%]' : msg?.contentType === 'image' ? 'max-w-[50%]' : 'max-w-[70%]'} px-2 py-1 md:px-4 md:py-2 wrap-break-word chat-bubble ${selectedUser?._id === msg?.senderId?._id ? 'bg-cyan-800 text-white' : 'bg-gray-700 text-white'} `}>
        {
          msg?.contentType === 'image' 
          ?
          (
            <>
              <img src={msg?.imageUrl} alt='image' className="max-w-full max-h-80 object-contain mx-auto rounded-md" />
            </>
          )
          :
          msg?.contentType === 'combined'
          ?
          (
            <>
              <img src={msg?.imageUrl} alt='image' className="max-w-full max-h-80 object-contain mx-auto rounded-md" />
              <p className="my-1">{msg?.content}</p>
            </>
          )
          :
          (
            <>
              <p>{msg?.content}</p>
            </>
          )
        }
      </div>
    </div>
  );
};

export default SingleMessage;
