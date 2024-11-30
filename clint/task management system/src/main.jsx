import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Provide the Redux store to the entire application */}
    <Provider store={store}>
      {/* Wrap the application in PersistGate to ensure data persistence */}
      <PersistGate loading={null} persistor={persistor}>
        <App />

        {/* ToastContainer for displaying toast notifications */}
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </PersistGate>
    </Provider>
  </StrictMode>
);
