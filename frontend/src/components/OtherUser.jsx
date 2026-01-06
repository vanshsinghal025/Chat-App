import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import { setSelectedUser } from '../store/user.slice'
import { setMessageInput } from '../store/message.slice'

const OtherUser = ({user, setShowSidebar}) => {
    const dispatch = useDispatch()
    const {selectedUser, onlineUsers} = useSelector(store => store.user);
    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user))
        dispatch(setMessageInput(''))
        setShowSidebar(false)
    }
  return (
        <div onClick={() => selectedUserHandler(user)}>
            <div className={`${selectedUser?._id === user?._id ? 'bg-purple-300' : ''} flex items-center gap-2 hover:bg-purple-300 rounded-sm p-1 cursor-pointer`}>
                <div className={`avatar ${onlineUsers?.includes(user?._id) ? 'avatar-online' : ''}`}>
                    <div className='w-13 h-13 rounded-full'>
                        <img src={user?.profilePicture} alt=""/>
                    </div>
                </div>
                <div className='flex-1'>
                    <p className='line-clamp-1'>{user?.fullName}</p>
                </div>
            </div>
            <div className='divider my-0 py-0 h-1'></div>
        </div>
  )
}

export default OtherUser