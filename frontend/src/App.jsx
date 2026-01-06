import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { setOnlineUsers } from "./store/user.slice";
import { addMessage, setTypingAlert } from "./store/message.slice";
import toast from "react-hot-toast";
import { connectSocket } from "./socket/socket";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const App = () => {
  const { user, selectedUser } = useSelector((store) => store.user);
  const selectedUserRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    selectedUserRef.current = selectedUser;
  }, [selectedUser]);

  useEffect(() => {
    if (!user) return;
    if (user) {
      const socket = connectSocket();

      // reconnect if not connected
      if (!socket.connected) {
        socket.connect();
      }

      const getOnlineUsersHandler = (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      };

      const receiveMessageHandler = (msg) => {
        const currentSelectedUser = selectedUserRef.current;

        if (
          msg?.senderId?._id?.toString() ===
          currentSelectedUser?._id?.toString()
        ) {
          dispatch(addMessage(msg));
        } else {
          toast(`${msg?.senderId?.fullName}`, {
            icon: "📩",
          });
        }
      };

      const typingAlertHandler = (userId) => {
        const currentSelectedUser = selectedUserRef.current
        if (currentSelectedUser?._id?.toString() === userId.toString()){
          dispatch(setTypingAlert(true))
        }
      }

      const disconnectHandler = (reason) => {
        if (reason !== "io client disconnect") {
          toast.error("You got disconnected: " + reason);
        }
      };

      socket.on("getOnlineUsers", getOnlineUsersHandler);
      socket.on("receive-message", receiveMessageHandler);
      socket.on("disconnect", disconnectHandler);
      socket.on('typing-alert', typingAlertHandler)
      
      return () => {
        socket.off("getOnlineUsers", getOnlineUsersHandler);
        socket.off("receive-message", receiveMessageHandler);
        socket.off("disconnect", disconnectHandler);
        socket.off('typing-alert', typingAlertHandler)
      };
    }
  }, [dispatch, user]);

  return (
    <div className="h-screen p-4 flex items-center justify-center">
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
};

export default App;
