import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    typingAlert: false,
    messageInput: ''
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setTypingAlert: (state, action) => {
      state.typingAlert = action.payload;
    },
    setMessageInput: (state, action) => {
      state.messageInput = action.payload
    }
  },
});

export const { setMessages, addMessage, setTypingAlert, setMessageInput } = messageSlice.actions;
export default messageSlice.reducer;
