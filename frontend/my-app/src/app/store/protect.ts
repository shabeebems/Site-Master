import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define state type
interface UserState {
  email: string;
}

// Initial state with defined type
const initialState: UserState = {
  email: "",
};

// Create slice with type safety
const protectSlice = createSlice({
  name: "protect",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    clearEmail: (state) => {
      state.email = "";
    }
  },
});

// Export actions and reducer
export const { setEmail, clearEmail } = protectSlice.actions;
export default protectSlice.reducer;
