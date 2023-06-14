import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import combinedReducers from './combinedReducers';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'ui']
  };

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store = createStore(
    persistedReducer,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);