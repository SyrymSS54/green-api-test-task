import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
    name: 'Auth',
    initialState: {
        idInstance:'',
        apiTokenInstance:''
    },
    reducers:{
        setAuth: (state,action) => {
            state.idInstance = action.payload.idInstance
            state.apiTokenInstance = action.payload.apiTokenInstance
        },
        logout: state => {
            state.apiTokenInstance = ''
            state.idInstance = ''
        }
    }
})

export const {setAuth,logout} = AuthSlice.actions;

export default AuthSlice.reducer;