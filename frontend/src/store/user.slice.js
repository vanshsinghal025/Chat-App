import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        otherUsers: [],
        selectedUser: null,
        filteredUsers: [],
        onlineUsers: []
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setOtherUsers: (state, action) => {
            state.otherUsers = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setFilteredUsers: (state, action) => {
            state.filteredUsers = action.payload
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload
        }
    }
})

export const {setUser, setOtherUsers, setSelectedUser, setFilteredUsers, setOnlineUsers} = userSlice.actions
export default userSlice.reducer