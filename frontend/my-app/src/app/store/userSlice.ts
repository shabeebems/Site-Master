import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define state type
interface UserState {
  name: string;
  email: string;
  password: string
}

// Initial state with defined type
const initialState: UserState = {
  name: "",
  email: "",
  password: "",
};

// Create slice with type safety
const userSlice = createSlice({
  name: "registerUser",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    clearUser: (state) => {
      state.name = "";
      state.email = "";
      state.password = "";
    }
  },
});

// Export actions and reducer
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
