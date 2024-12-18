import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "@/redux/features/cartSlice/cartSlice";
import compareSliceReducer from "@/redux/features/compareSlice/compareSlice";
export const store = configureStore({
  reducer: { cartSlice: cartSliceReducer, compareSlice: compareSliceReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
