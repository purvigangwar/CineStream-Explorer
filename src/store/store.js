import { configureStore } from '@reduxjs/toolkit'
import homeSlice from './homeSlice'
export const store = configureStore({

reducer: {
    home : homeSlice,
},
})
// import { createStore, combineReducers } from 'redux';
// import homeReducer from './homeSlice';

// const rootReducer = combineReducers({
//   home: homeReducer,
// });

// const store = createStore(
//   rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// export default store;

