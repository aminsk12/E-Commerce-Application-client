import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  user: {
    email: string;
    role: string;
  } | null;
  token: string | null;
}

// Define the initial state using that type
const initialState: IAuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "authSlice",

  initialState,
  reducers: {
    saveUserInfo: (
      state,
      action: PayloadAction<{
        user: { email: string; role: string };
        token: string;
      }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

export const { saveUserInfo } = authSlice.actions;

export default authSlice.reducer;
