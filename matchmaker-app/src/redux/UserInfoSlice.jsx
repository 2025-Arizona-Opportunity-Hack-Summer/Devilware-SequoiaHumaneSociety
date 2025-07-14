import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

const UserInfoSlice = {
  [userSlice.name]: userSlice.reducer,
};

export default UserInfoSlice;
