import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../auth/AuthSlice";
import ChatReducer from "../chat/ChatSlice";

export default configureStore({
    reducer:{
        auth: AuthReducer,
        chat: ChatReducer
    }
})