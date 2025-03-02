import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define state type
interface UserState {
  email: any;
  role: any;
}

// Initial state with defined type
const initialState: UserState = {
  email: "",
  role: ""
};

// Create slice with type safety
const protectSlice = createSlice({
  name: "protect",
  initialState,
  reducers: {
    setProtect: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    clearProtect: (state) => {
      state.email = "";
      state.role = "";
    }
  },
});

// Export actions and reducer
export const { setProtect, clearProtect } = protectSlice.actions;
export default protectSlice.reducer;
