import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./components/styles/_index.css";
import { NextThemeProviders } from "./providers/NextThemeProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/storeRedux.js";
import { PersistGate } from "redux-persist/integration/react";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <NextThemeProviders>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </NextThemeProviders>
    </BrowserRouter>
  </React.StrictMode>
);
