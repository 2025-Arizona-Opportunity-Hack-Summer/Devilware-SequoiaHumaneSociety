// import { createSlice } from "@reduxjs/toolkit";

// export const userSlice = createSlice({
//   name: "user",
//   initialState: null,
//   reducers: {
//     assign(state, action) {
//       return action.payload;
//     },
//     addFavorites(state, action) {
//       if (state.favoritePets.includes(action.payload) === false) {
//         state.favoritePets = [...state.favoritePets, action.payload];
//       } else {
//         state.favoritePets = state.favoritePets.filter((petId) => action.payload !== petId);
//       }
//       return state;
//     },
//   },
// });

// const UserInfoSlice = {
//   [userSlice.name]: userSlice.reducer,
// };

// export default UserInfoSlice;
