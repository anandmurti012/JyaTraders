import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PersistGate } from "redux-persist/lib/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from './redux/store';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={
          extendTheme({
            config: {
              useSystemColorMode: false, // Disable using system color mode (optional)
              initialColorMode: 'light', // Set the initial color mode here (light or dark)
            },
            styles: {
              global: {
                body: {
                  bg: '#fff', // Set the background color to light '#fafafb'
                },
              },
            },
            // ... your other theme configurations ...
          })
        } >
        <App />
      </ChakraProvider>
    </PersistGate>
  </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
