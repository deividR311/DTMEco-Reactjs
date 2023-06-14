import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import { store } from './redux/store';
import { AppRouter } from './router/router';
import './styles/App.scss';

const persistor = persistStore(store);

const App = () => {
  return (
    <div className="App">
      <Provider store={ store }>
        <PersistGate persistor={ persistor }>
          <AppRouter />
        </PersistGate>
      </Provider>
    </div>
  )
}

export default App;
