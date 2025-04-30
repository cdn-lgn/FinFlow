import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { user: null },
  reducers: {
    setUser: (state, action) => { state.user = action.payload },
    removeUser: (state) => { state.user = null },
    updateBalance: (state, action) => {
      if (state.user) {
        state.user.balance = action.payload;
      }
    }
  }
});

export const { setUser, removeUser, updateBalance } = userSlice.actions;
export default userSlice.reducer;
