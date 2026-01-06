import React from 'react'
import OtherUser from './OtherUser'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import { useSelector } from 'react-redux'

const OtherUsers = ({setShowSidebar}) => {
  useGetOtherUsers()
  const {filteredUsers} = useSelector(store => store.user)

  return (
    <div className='h-full'>
        {filteredUsers && filteredUsers?.length > 0 
        ?
      (
      <>
        {filteredUsers?.map((user, index) => {
          return <OtherUser key={index} user={user} setShowSidebar={setShowSidebar}/>
        })}
      </>
      )
    :
    (
    <>
      <p className='h-full flex justify-center items-center text-xl font-semibold'>❌ No User Found!</p>
    </>
      
    )}
    </div>
  )
}

export default OtherUsers