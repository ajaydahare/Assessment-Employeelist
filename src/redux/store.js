import { createStore } from "redux";
import { loadFromLocalStorage } from "./persistStore";
import reducer from "./reduce";



let persistantState = undefined;

if (typeof window !== undefined) {
  persistantState = loadFromLocalStorage();
}

const store = createStore(
  reducer,
  persistantState
);

export default store;
