/* eslint-disable @typescript-eslint/no-unused-vars */
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { strore } from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={strore}>
    <App />
  </Provider>
);
