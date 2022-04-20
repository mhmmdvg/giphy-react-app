import { configureStore } from '@reduxjs/toolkit';
import SearchSlice from './slice';
// import searchReducer from "./reducer";
// import AccountReducer from "./account-slice";
// import accountReducer from "./account-reducer";

export default configureStore({
  reducer: {
    search: SearchSlice,
    // search: searchReducer,
  },
  // devTools: true
});
