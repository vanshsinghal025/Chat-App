import axios from "axios";
import { Image, Loader2, Send, X } from "lucide-react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { MESSAGE_API_END_POINT } from "../../utils/constant";
import { addMessage, setMessageInput } from "../store/message.slice";
import { getSocket } from "../socket/socket";
import { useRef } from "react";
import { useState } from "react";

const SendMessage = () => {
  const { user, selectedUser, onlineUsers } = useSelector(
    (store) => store.user
  );
  const { messageInput } = useSelector((store) => store.message);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const imageInputRef = useRef(null);
  const inputRef = useRef(null);
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  const cancelImage = () => {
    setImagePreview(null);
    fileRef.current = null;
    if (imageInputRef) imageInputRef.current.value = "";
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!fileRef.current && !messageInput.trim()) return;

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("content", messageInput);
      formData.append("image", fileRef.current);

      const response = await axios.post(
        `${MESSAGE_API_END_POINT}/send-message/${selectedUser?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response?.data?.success) {
        cancelImage();
        dispatch(addMessage(response?.data?.data));
        dispatch(setMessageInput(""));
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response ? error?.response?.data?.message : error?.message
      );
    } finally {
      setLoading(false);
    }
  };

  const triggerImageInput = () => {
    imageInputRef.current.click();
  };

  const onChangeHandler = (e) => {
    if (loading) true;

    const selectedFile = e.target?.files?.[0]

    if (!selectedFile) return;

    fileRef.current = selectedFile;
    setImagePreview(URL.createObjectURL(selectedFile));
    inputRef.current.focus();
  };

  useEffect(() => {
    const socket = getSocket();
    const receiverId = selectedUser?._id;
    const typerId = user?._id;

    if (onlineUsers.indexOf(receiverId) !== -1 && socket) {
      socket.emit("typing-alert", { typerId, receiverId });
    }
  }, [messageInput, onlineUsers, user?._id, selectedUser?._id]);

  return (
    <form onSubmit={onSubmitHandler} className="relative">
      {imagePreview && (
        <>
          <div className="mb-2 h-37.5 absolute -top-[350%] p-2 rounded-lg bg-white">
            <img src={imagePreview} alt="image" className="h-full rounded-lg" />
          <button
            type="button"
            onClick={cancelImage}
            className="p-0.5 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 cursor-pointer z-2"
          >
            <X size={22} strokeWidth={3} color="white" />
          </button>
          </div>
        </>
      )}
      <div className="w-full relative">
        <input
          type="file"
          name="image"
          ref={imageInputRef}
          disabled={loading}
          className="hidden"
          accept="image/*"
          onChange={onChangeHandler}
        />
        <button
          type="button"
          disabled={loading}
          className={`${loading ? 'cursor-progress' : 'cursor-pointer' } absolute top-1/2 left-0 -translate-y-1/2 text-white pl-4`}
          onClick={triggerImageInput}
        >
          <Image />
        </button>
        <input
          type="text"
          ref={inputRef}
          disabled={loading}
          onKeyDown={(e) => {
            if (loading && e.key === "Enter") {
              e.preventDefault();
            }
          }}
          placeholder="Send a message..."
          className={`${loading ? 'cursor-progress' : 'cursor-pointer' } border text-sm rounded-lg block w-full bg-zinc-600 text-white p-3 px-12`}
          value={messageInput}
          onChange={(e) => dispatch(setMessageInput(e.target.value))}
        />
        {loading ? (
          <>
            <button
              type="button"
              className={`${loading ? 'cursor-progress' : '' } absolute top-1/2 right-0 -translate-y-1/2 text-white pr-4`}
            >
              <Loader2 className="animate-spin" />
            </button>
          </>
        ) : (
          <>
            <button
              type="submit"
              disabled={loading}
              className="absolute top-1/2 right-0 -translate-y-1/2 text-white pr-4 cursor-pointer"
            >
              <Send />
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default SendMessage;
