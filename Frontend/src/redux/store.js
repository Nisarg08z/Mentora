import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import courseSlice from "./courseSlice"
import reviewSlice from "./reviewSlice"

export const store = configureStore({
    reducer:{
        user:userSlice,
        course:courseSlice,
        review:reviewSlice
    }
})