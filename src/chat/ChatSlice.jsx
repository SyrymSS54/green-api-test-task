import { createSlice } from "@reduxjs/toolkit";

export const ChatSlice = createSlice({
    name: 'Chat',
    initialState:{
        chatList: []
    },
    reducers:{
        addChatId: (state,action) => {
            state.chatList = action.payload.chat
        }
    }
})

export const {addChatId} = ChatSlice.actions;

export default ChatSlice.reducer;