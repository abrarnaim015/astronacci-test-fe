import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

// import { createStore, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";

// const initialState = {
//   loading: true,
//   userName: "",
//   access_token: "",
//   contents: [],
//   contentDetail: {},
//   category: "general",
//   user: {},
// };

// function reducer(state = initialState, action) {
//   const { type, payload } = action;
//   switch (type) {
//     case "SET_CONTENTS":
//       return { ...state, contents: payload };
//     case "SET_CONTENT_DETAIL":
//       return { ...state, contentDetail: payload };
//     case "SET_LOADING":
//       return { ...state, loading: payload };
//     case "SET_USER":
//       return { ...state, user: payload };
//     case "SET_USERNAME":
//       return { ...state, userName: payload };
//     case "SET_ACCESS_TOKEN":
//       return { ...state, access_token: payload };
//     default:
//       break;
//   }
// }

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

// export default store;
