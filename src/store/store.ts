import { createStore } from "../core/createStore.js";

import { rootReducer } from "./rootReducer.js";

const persistConfig = {
  key: "motion-root",
  whitelist: ["item"],
}

export const store = createStore(rootReducer, persistConfig);
