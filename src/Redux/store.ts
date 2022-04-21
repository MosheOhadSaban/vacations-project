import { createStore } from "redux";
import { reduce } from "./reducer";
// import { AppState } from "./app-state";

// export const store = createStore(reduce, new AppState());
export const store = createStore(reduce);

