import SingleMessage from './SingleMessage'
import useGetMessages from '../hooks/useGetMessages'
import { useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'

const Messages = () => {
    
  const {selectedUser} = useSelector(store => store.user)
  const {messages} = useSelector(store => store.message)

  
  const messagesRef = useRef(null)
  useGetMessages()


    useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop =
        messagesRef.current.scrollHeight
    }
  }, [messages])
  return (
    <div ref={messagesRef} className='px-4 flex-1 overflow-auto'>
      {
        messages && messages?.length > 0
        ?
        (
          <>

          { messages?.map((msg, index) => {
            return <SingleMessage key={index} msg={msg} />
          })}
          </>
        )
        :
        (
          <>
            <p className='h-full flex justify-center items-center text-2xl font-semibold'>Say Hello 👋! to {selectedUser?.fullName}</p>
          </>
        )
      }
    </div>
  )
}

export default Messages