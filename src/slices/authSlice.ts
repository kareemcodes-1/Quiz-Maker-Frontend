import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/type";

type State = {
    userInfo: User | null;
}


const storedUserInfo = localStorage.getItem('userInfo');

const initialState: State = {
    userInfo: storedUserInfo ? JSON.parse(storedUserInfo) : null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserInfo(state: State, action: PayloadAction<User>){
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
            state.userInfo = action.payload
        },
        logout(state: State){
            state.userInfo = null;
            localStorage.removeItem('userInfo')
        }
    }
});

export const {setUserInfo, logout} = authSlice.actions;
export default authSlice.reducer;