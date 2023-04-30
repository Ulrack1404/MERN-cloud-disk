import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import { store } from "./reducers";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./st.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    </Provider>
);
