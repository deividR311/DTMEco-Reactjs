import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import adminReducer from "./adminReducer";
import AdminState from "./adminState";

configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  allUsers: [],
  allRoles: [],
  allUserStates: [],
  createUserSuccess: false,
  createUserFailed: false,
  ErrorMessage: "",
  userId: "",
  assignRolesSuccess: false,
  assignRolesFailed: false,
  editUserSuccess: false,
  editUserFailed: false,
};

const ReduxProvider = ({ children, reduxStore }) => (
  <Provider store={reduxStore}>{children}</Provider>
);

describe("test adminState", () => {
  test("should return defect data", () => {
    const state = adminReducer(initialState, {});

    expect(state).toEqual(initialState);
  });

  test("should return <AdminState />", () => {
    const store = mockStore({});

    mount(
      <ReduxProvider reduxStore={store}>
        <AdminState></AdminState>
      </ReduxProvider>
    );
  });
});
