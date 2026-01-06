import SendInput from "./SendMessage";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setTypingAlert } from "../store/message.slice";
import { Menu } from "lucide-react";

const MessageContainer = ({ showSidebar, setShowSidebar }) => {
  const { user, selectedUser, onlineUsers } = useSelector(
    (store) => store.user
  );
  const { typingAlert } = useSelector((store) => store.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!typingAlert) return;

    const timer = setTimeout(() => {
      dispatch(setTypingAlert(false));
    }, 2000);

    return () => clearTimeout(timer);
  }, [dispatch, typingAlert]);

  return (
    <div
      className={`w-full flex flex-col p-4 gap-2 ${
        showSidebar ? "hidden" : "flex"
      } md:flex md:min-w-162.5`}
    >
      {selectedUser ? (
        <>
          <div>
            <div className="flex items-center gap-2 bg-purple-800 text-white text-lg rounded-md p-1 ">
              <button
                className="md:hidden"
                onClick={() => setShowSidebar(true)}
              >
                <Menu size={26} color="white"/>
              </button>
              <div
                className={`avatar ${
                  onlineUsers?.includes(selectedUser?._id)
                    ? "avatar-online"
                    : ""
                }`}
              >
                <div className="w-13 h-13 rounded-full">
                  <img src={selectedUser?.profilePicture} alt="" />
                </div>
              </div>
              <div className="flex-1">
                <p className="line-clamp-1">
                  {selectedUser?.fullName}{" "}
                  <span className="text-sm italic text-gray-200 font-bold">
                    {`(@${selectedUser?.username})`}
                  </span>
                </p>
                {typingAlert && (
                  <>
                    <p className="text-xs animate-pulse">typing...</p>
                  </>
                )}
              </div>
            </div>
            <div className="divider my-0"></div>
          </div>
          <Messages />
          <SendInput />
        </>
      ) : (
        <>
          <button className="md:hidden" onClick={() => setShowSidebar(true)}>
            <Menu />
          </button>
          <div className="h-full flex flex-col gap-2 justify-center items-center">
            <h1 className="text-4xl font-bold text-center">Hi, {user?.fullName}</h1>
            <p className="text-2xl text-center">Let's start conversation</p>
          </div>
        </>
      )}
    </div>
  );
};

export default MessageContainer;
