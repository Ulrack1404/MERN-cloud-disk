import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import { store } from "./reducers";
import { Provider } from "react-redux";
import "./st.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
);
