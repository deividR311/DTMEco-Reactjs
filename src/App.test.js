import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { shallow, configure } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./App";
import { persistStore } from 'redux-persist';
import { PersistGate } from "redux-persist/integration/react";

configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Unit test", () => {
  const store = mockStore({});
  const persistor = persistStore(store);

  it("renders without crashing", () => {
    shallow(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    );
  });
});
