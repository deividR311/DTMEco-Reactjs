import React from 'react';
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import MultilineTextFieldCommon from '.';
import classes from '*.module.css';

configure({ adapter: new Adapter() });

describe('unit test in component <MultilineTextFieldCommon/>', () => {
  test('should render without crashing', () => {
    const rows = 2;
    const defaultValue = "";
    const handleOnChange = () => { };
    const required = false;
    const value = "";
    mount(
      <MultilineTextFieldCommon
        rows={rows}
        defaultValue={defaultValue}
        label={'exampleLabel'}
        name={'exampleInputName'}
        handleChange={handleOnChange}
        classes={classes.classes}
        required={required}
      />
    );
  });
});