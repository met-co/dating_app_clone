import { configureStore } from "@reduxjs/toolkit";
import user from "../modules/userSlice";
import file from "../modules/fileSlice";
import comment from "../modules/commentSlics";

const store = configureStore({
  reducer: { user, file, comment },
});

export default store;
