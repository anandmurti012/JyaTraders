import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Import the storage type (e.g., localStorage)
import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';

// Combine your reducers
const rootReducer = combineReducers({
  auth: userReducer,
  // Add other reducers here if needed
});

// Configure persistence
const persistConfig = {
  key: 'root',
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);