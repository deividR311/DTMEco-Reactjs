import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import costumerReducer from "./costumerReducer";
import CostumerState from "./costumerState";

configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
    requestUserCreateList : [],
    generalCostumerList : [],
    existCostumerMDS : '',
    existCostumer : '',
    createGeneralCostumerSuccess : false,
    createGeneralCostumerFailed : false,
    clientId : '',
    verificationCode : '',
    updateCostumerSuccess : false,
    updateCostumerFailed : false,
    documentType : [],
    uploadFileSuccess : false,
    uploadFileFailed : false,
    allUserRequestList : [],
    deleteClientRequestSuccess : false,
    deleteClientRequestFailed : false,
    requestById : '',
    rejectionReasons : [],
    returnReasons : [],
    saveApproverManageSuccess : false,
    saveApproverManageFailed : false,
    costumerFunctionList: ''
  };

const ReduxProvider = ({ children, reduxStore }) => (
  <Provider store={reduxStore}>{children}</Provider>
);

describe("test CostumerState", () => {
  test("should return defect data", () => {
    const state = costumerReducer(initialState, {});

    expect(state).toEqual(initialState);
  });

  test("should return <CostumerState />", () => {
    const store = mockStore({});

    mount(
      <ReduxProvider reduxStore={store}>
        <CostumerState></CostumerState>
      </ReduxProvider>
    );
  });
});