import React, { useEffect, useState } from "react";
import { ArrowBigRight } from "lucide-react";
import OtherUsers from "./OtherUsers";
import toast from "react-hot-toast";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilteredUsers,
  setOnlineUsers,
  setOtherUsers,
  setSelectedUser,
  setUser,
} from "../store/user.slice";
import { setMessageInput, setMessages, setTypingAlert } from "../store/message.slice";
import { disconnectSocket } from "../socket/socket";

const Sidebar = ({showSidebar, setShowSidebar}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user, otherUsers, onlineUsers } = useSelector((store) => store.user);
  const [input, setInput] = useState("");

  const logoutUser = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (response?.data?.success) {
        dispatch(setUser(null));
        dispatch(setOtherUsers([]));
        dispatch(setSelectedUser(null));
        dispatch(setFilteredUsers([]));
        dispatch(setOnlineUsers([]))
        dispatch(setMessages([]));
        dispatch(setTypingAlert(false))
        dispatch(setMessageInput(''))
        disconnectSocket()
        toast.success(response?.data?.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(
        error?.response ? error?.response?.data?.message : error?.message
      );
    } finally {
      setLoading(false);
    }
  };

  const searchUser = () => {
    const filtered = otherUsers?.filter((user) =>
      user?.fullName?.toLowerCase()?.includes(input?.toLowerCase())
    );
    const online = []
    const offline = []
    filtered?.forEach(user => {
        if (onlineUsers?.includes(user?._id)) {online.push(user)}
        else {offline.push(user)} 
    })

    dispatch(setFilteredUsers([...online, ...offline]));
  };

  useEffect(searchUser, [dispatch, otherUsers, input, onlineUsers]);

  return (
    <div className={`flex fixed md:static z-20 h-full w-full md:w-72 border-r border-slate-500 p-4 flex-col justify-between transition-transform duration-300 ${showSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div>
        <div className="flex items-center gap-6">
          <input
            className="input input-bordered rounded-md w-full"
            type="text"
            placeholder="Search..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="md:hidden cursor-pointer bg-purple-900 rounded-md p-1" onClick={() => setShowSidebar(false)}>
            <ArrowBigRight size={26} color="white"/>
          </button>
        </div>
        <div className="divider px-3 h-1"></div>
      </div>
      <div className="flex-1 overflow-auto pr-4">
        <OtherUsers setShowSidebar={setShowSidebar} />
      </div>
      <div className="mt-2">
        <div className="divider px-3 h-1"></div>
        <div className="flex justify-between items-center">
          {loading ? (
            <>
              <button className="btn btn-sm">
                <span className="loading loading-spinner"></span>
                loading
              </button>
            </>
          ) : (
            <>
              <button onClick={logoutUser} className="btn btn-sm">
                Logout
              </button>
            </>
          )}
          <div className="avatar border-2 border-cyan-500 rounded-full p-0.75" title={user?.fullName}>
            <div className="w-9 h-9 rounded-full">
              <img src={user?.profilePicture} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
