import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MESSAGE_API_END_POINT } from "../../utils/constant";
import { setMessages } from "../store/message.slice";

const useGetMessages = () => {
  const dispatch = useDispatch();
  const {selectedUser} = useSelector(store => store.user)
  useEffect(() => {
    const fetchMessages = async () => {
      const currentUserId = selectedUser?._id
      try {
        const response = await axios.get(
          `${MESSAGE_API_END_POINT}/get-message/${currentUserId}`,
          { withCredentials: true }
        );

        if (response?.data?.success && currentUserId === selectedUser?._id) {
          dispatch(setMessages(response?.data?.data?.messages))
        }
      } catch (error) {
        console.error(error)
      }
    };
    if (!selectedUser) return;
    fetchMessages();
  }, [dispatch, selectedUser]);
};

export default useGetMessages;
