import { configureStore } from "@reduxjs/toolkit";
import user from "../modules/userSlice";
import file from "../modules/fileSlice";

const store = configureStore({
  reducer: { user, file },
});

export default store;
