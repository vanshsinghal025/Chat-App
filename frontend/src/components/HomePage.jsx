import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  const [showSidebar, setShowSidebar] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <div className="flex h-[90%] w-[90%] overflow-hidden rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100">
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <MessageContainer showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </div>
    </>
  );
};

export default HomePage;
