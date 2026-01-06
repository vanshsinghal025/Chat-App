import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../../utils/constant";
import { setOtherUsers } from "../store/user.slice";

const useGetOtherUsers = () => {
  const {onlineUsers} = useSelector(store => store.user)
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOtherUsers = async () => {
        try {
            const response = await axios.get(`${USER_API_END_POINT}/other-users`, {withCredentials: true})

            if (response?.data?.success){
                dispatch(setOtherUsers(response?.data?.data))
            }
        } catch (error) {
            console.error(error)
        }
    }
    fetchOtherUsers()
  }, [dispatch, onlineUsers]);
};

export default useGetOtherUsers;
