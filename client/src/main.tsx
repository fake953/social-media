import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "./services/state/store.ts";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistor } from "./services/state/store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <App />
    {/* </PersistGate> */}
  </Provider>
);
