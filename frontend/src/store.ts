import { createStore } from 'redux';
import storage from 'redux-persist/lib/storage';
import authReducer from './reducers/auth.reducer';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor }
