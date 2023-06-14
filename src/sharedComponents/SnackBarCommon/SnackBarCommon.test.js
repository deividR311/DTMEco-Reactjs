import React from 'react';
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import SnackBarCommon from '.';

configure({ adapter: new Adapter() });

describe('unit test in component <SnackBarCommon/>', () => {
  test('should render without crashing', () => {
    const handleCloseSnack = () => { };
    const successMessage = () => { };
    const errorMessage = () => { };
    const success = true;
    const error = false;
    mount(
      <SnackBarCommon
        success={success}
        error={error}
        handleCloseSnack={handleCloseSnack}
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
    );
  });
});