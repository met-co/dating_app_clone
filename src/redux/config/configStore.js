import { configureStore } from "@reduxjs/toolkit";
import user from "../modules/userSlice";
import file from "../modules/fileSlice";
import comment from "../modules/commentSlice";

const store = configureStore({
  reducer: { user, file, comment },
});

export default store;
